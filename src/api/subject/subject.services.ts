import { db } from "../../utils/db";

// get all subject
const getAllSubject = async (query: {
  name?: string;
  page: number;
  show: number;
}) => {
  const paginate = +query.show || 10;
  const skipData = (+query.page - 1) * paginate || 0;

  const data = await db.subject.findMany({
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
      user: {
        select: {
          profile: {
            select: {
              name: true,
              photo: true,
            },
          },
        },
      },
    },
  });

  const count = await db.subject.count({
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
  });

  const teacherList = (teachers: Array<any>) => {
    return teachers.map((teacher) => {
      return {
        name: teacher.profile.name,
        photo: teacher.profile.photo,
      };
    });
  };

  const dataSubjects = data.map((subject) => {
    return {
      id: subject.id,
      name: subject.name,
      teacher: teacherList(subject.user),
    };
  });

  return {
    data: dataSubjects,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
};

// find subject by id
const findSubjectById = async (id: string) => {
  const data = await db.subject.findUnique({
    where: {
      id,
    },
  });
};

const findSubjectByName = async (name: string) => {
  const data = await db.subject.findFirst({
    where: {
      name,
    },
  });

  return data;
};

// get subject by id
const getSubjectById = async (id: string) => {
  const data = await db.subject.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      user: {
        select: {
          id: true,
          profile: {
            select: {
              name: true,
              photo: true,
            },
          },
        },
      },
      score: {
        select: {
          score: true,
          user: {
            select: {
              id: true,
              profile: {
                select: {
                  name: true,
                  photo: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
};

// create subject
const createSubject = async (data: { name: string }) => {
  const subject = await db.subject.create({
    data: {
      name: data.name,
    },
  });

  return subject;
};

// update subject
const updateSubject = async (id: string, data: { name: string }) => {
  const subject = await db.subject.update({
    where: {
      id,
    },
    data: {
      name: data.name,
    },
  });
};

// delete subject
const deleteSubject = async (id: string) => {
  const subject = await db.subject.delete({
    where: {
      id,
    },
  });

  return subject;
};

export {
  getAllSubject,
  findSubjectById,
  getSubjectById,
  createSubject,
  findSubjectByName,
  deleteSubject,
  updateSubject,
};
