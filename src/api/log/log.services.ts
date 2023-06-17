import { db } from "../../utils/db";

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
  const skipData = (+query.page - 1) * paginate || 0;
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
    skip: skipData,
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

  const logData = data.map((log) => {
    return {
      id: log.id,
      action: log.action,
      userId: log.userId,
      userName: log.user?.profile?.name,
      description: log.description,
      createdAt: log.createdAt,
    };
  });

  return {
    data: logData,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
};

export { getAllLog };
