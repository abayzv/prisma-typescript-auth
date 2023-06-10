import express from "express";
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

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *    - bearerAuth: []
 *  schemas:
 *   Register:
 *    type: object
 *    required:
 *      - email
 *      - password
 *      - name
 *      - roleId
 *    properties:
 *      email:
 *        type: string
 *        description: Email for the user, needs to be unique.
 *      password:
 *        type: string
 *        description: Password for the user.
 *      name:
 *        type: string
 *        description: Name for the user.
 *      roleId:
 *        type: number
 *        description: Role ID for the user.
 *    example:
 *      email: string
 *      password: string
 *      name: string
 *      roleId: 0
 *   Login:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *        description: Email for the user, needs to be unique.
 *      password:
 *        type: string
 *        description: Password for the user.
 *    example:
 *      email: string
 *      password: string
 *   RefreshToken:
 *    type: object
 *    required:
 *      - refreshToken
 *    properties:
 *      refreshToken:
 *        type: string
 *        description: Refresh token for the user.
 *    example:
 *      refreshToken: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       409:
 *         description: Email already in use
 *
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       403:
 *         description: Invalid login credentials.
 *
 /auth/refreshToken:
 *   post:
 *     summary: Refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshToken'
 *       401:
 *         description: Unauthorized
 *
 */

router.post("/register", async (req: any, res: any, next: any) => {
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
});

router.post("/login", async (req: any, res: any, next: any) => {
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

    const validPassword = await bcrypt.compare(password, existingUser.password);
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
});

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

export default router;
