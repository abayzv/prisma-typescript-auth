import jwt from "jsonwebtoken";

interface User {
  id: string;
  roleID: number;
}

function generateAccessToken(user: User) {
  const data = { userId: user.id, role: user.roleID };
  // @ts-ignore
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "24h",
  });
}

function generateRefreshToken(user: User, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
      roleID: user.roleID,
      jti,
    },
    // @ts-ignore
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "4h",
    }
  );
}

function generateTokens(user: User, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export { generateAccessToken, generateRefreshToken, generateTokens };
