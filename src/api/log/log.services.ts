import { start } from "repl";
import { db } from "../../utils/db";
import e from "express";

// get all log
const getAllLog = async (query: {
  action?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  page: number;
  show: number;
}) => {
  const paginate = +query.show || 10;
  let startDate = new Date("2021-01-01");
  let endDate = new Date();

  if (query.startDate) {
    startDate = new Date(query.startDate);
  }

  if (query.endDate) {
    endDate = new Date(query.endDate);
    endDate.setDate(endDate.getDate() + 1);
  }

  const data = await db.activityLog.findMany({
    take: paginate,
    where: {
      action: {
        contains: query.action || "",
        mode: "insensitive",
      },
      user: {
        profile: {
          name: {
            contains: query.name || "",
            mode: "insensitive",
          },
        },
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      action: true,
      userId: true,
      user: {
        select: {
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
      description: true,
      createdAt: true,
    },
  });
  const count = await db.activityLog.count({
    where: {
      action: {
        contains: query.action || "",
        mode: "insensitive",
      },
      user: {
        profile: {
          name: {
            contains: query.name || "",
            mode: "insensitive",
          },
        },
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  return {
    data,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
};

export { getAllLog };
