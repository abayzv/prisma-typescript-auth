import jwt from "jsonwebtoken";
import { db } from "./utils/db";

async function isPermited(req: any, res: any, next: any) {
  const { role } = req.payload;
  const path = req.originalUrl.split("/")[3];

  if (role === 99) return next();

  const isPermited = await db.role.findMany({
    where: {
      id: role,
      permission: {
        some: {
          permission: {
            action: req.method,
            menu: path,
          },
        },
      },
    },
  });

  if (!isPermited.length) {
    res.status(403);
    const error = new Error("You are not permited to access this route");
    res.json({
      message: error.message,
    });
  } else {
    return next();
  }
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

export { notFound, errorHandler, isAuthenticated, isPermited };
