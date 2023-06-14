import express from "express";
import { activityLogger, isAuthenticated } from "../../middlewares";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  findUserByEmail,
  createUserByEmailAndPassword,
  findUserById,
} from "../users/users.services";
import { generateTokens } from "../../utils/jwt";
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} from "./auth.services";
import { hashToken } from "../../utils/hashToken";

const router = express.Router();

router.post(
  "/register",
  activityLogger("Register", "New User was registered", false),
  async (req: any, res: any, next: any) => {
    try {
      const { email, password, name, roleId } = req.body;
      if (!email || !password || !name) {
        res.status(400);
        throw new Error("You must provide an email, a password and a name.");
      }

      const existingUser = await findUserByEmail(email);

      if (existingUser) {
        res.status(409);
        throw new Error("Email already in use.");
      }

      const user = await createUserByEmailAndPassword({
        email,
        password,
        name,
        roleID: roleId ? roleId : 4,
      });
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(user, jti);
      await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  activityLogger("Login", "User was logged in", false),
  async (req: any, res: any, next: any) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        throw new Error("You must provide an email and a password.");
      }

      const existingUser = await findUserByEmail(email);

      if (!existingUser) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/refreshToken", async (req: any, res: any, next: any) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("Missing refresh token.");
    }
    const payload = jwt.verify(
      refreshToken,
      //   @ts-ignore
      process.env.JWT_REFRESH_SECRET
    ) as any;
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post("/revokeRefreshTokens", async (req: any, res: any, next: any) => {
  try {
    const { userId } = req.body;

    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ message: `User ID not found` });

    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/logout",
  isAuthenticated,
  activityLogger("Logout", "User was logged out", true),
  async (req: any, res: any, next: any) => {
    const { userId } = req.payload;

    await revokeTokens(userId);
    res.json({ message: "Logout Success" });
  }
);

export default router;
