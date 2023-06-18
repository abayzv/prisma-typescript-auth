import { db } from "../../utils/db";

const findScoreCategoryById = async (id: string) => {
  const data = await db.scoreCategory.findUnique({
    where: {
      id: id,
    },
  });

  return data;
};

const findScoreCategoryByName = async (name: string) => {
  const data = await db.scoreCategory.findFirst({
    where: {
      name: name,
    },
  });

  return data;
};

const getScoreCategoryList = async (query: {
  name?: string;
  page: string;
  show: string;
}) => {
  const paginate = +query.show || 10;
  const skipData = (+query.page - 1) * paginate || 0;

  const data = await db.scoreCategory.findMany({
    take: paginate,
    skip: skipData,
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
  });

  const count = await db.scoreCategory.count({
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
  });

  const dataScoreCategory = data.map((scoreCategory) => {
    return {
      id: scoreCategory.id,
      name: scoreCategory.name,
      createdAt: scoreCategory.createdAt,
    };
  });

  return {
    data: dataScoreCategory,
    totalPage: Math.ceil(count / paginate).toString() || "1",
    page: query.page || "1",
  };
};

const createScoreCategory = async (name: string) => {
  const data = await db.scoreCategory.create({
    data: {
      name: name,
    },
  });

  return data;
};

const updateCategory = async (id: string, name: string) => {
  const data = await db.scoreCategory.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return data;
};

const deleteScoreCategory = async (id: string) => {
  //   delete all score of score category
  await db.score.deleteMany({
    where: {
      categoryId: id,
    },
  });

  const data = await db.scoreCategory.delete({
    where: {
      id: id,
    },
  });

  return data;
};

export {
  findScoreCategoryById,
  findScoreCategoryByName,
  getScoreCategoryList,
  deleteScoreCategory,
  updateCategory,
  createScoreCategory,
};
