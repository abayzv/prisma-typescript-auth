import jwt from "jsonwebtoken";

enum Role {
  ADMIN = 1,
  TEACHER = 2,
  STUDENT = 3,
  PARENT = 4,
}

function permited(...roles: any) {
  return (req: any, res: any, next: any) => {
    const { role } = req.payload;
    const roleUser = roles.map((role: any) => Role[role]);

    if (!roleUser.includes(role)) {
      res.status(403);
      throw new Error(" Forbidden ");
    }

    return next();
  };
}

function notFound(req: any, res: any, next: any) {
  res.status(404);
  const error = new Error(`Url Not Found ${req.originalUrl}`);
  res.json({
    message: error.message,
    // stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
}

// eslint-disable no-unused-vars /
function errorHandler(err: any, req: any, res: any, next: any) {
  // eslint-enable no-unused-vars /
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
}

function isAuthenticated(req: any, res: any, next: any) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error(" Un-Authorized ");
  }

  try {
    const token = authorization.split(" ")[1];
    // @ts-ignore
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as any;
    req.payload = payload;
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error(" Un-Authorized ");
  }

  return next();
}

export { notFound, errorHandler, isAuthenticated, permited };
