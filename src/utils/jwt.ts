import jwt from "jsonwebtoken";

interface User {
  id: string;
}

function generateAccessToken(user: User) {
  // @ts-ignore
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5m",
  });
}

function generateRefreshToken(user: User, jti: string) {
  return jwt.sign(
    {
      userId: user.id,
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
