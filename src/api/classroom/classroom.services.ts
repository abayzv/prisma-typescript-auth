import { db } from "../../utils/db";

// get all classroom

const getAllClassroom = async (query: {
  name?: string;
  page: number;
  show: number;
}) => {
  const paginate = +query.show || 10;
  const data = await db.class.findMany({
    take: paginate,
    where: {
      name: {
        contains: query.name || "",
        mode: "insensitive",
      },
    },
    include: {
      teacher: {
        select: {
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
      _count: {
        select: {
          student: true,
        },
      },
    },
  });

  const count = data.length;
  const dataClassrooms = data.map((classroom) => {
    return {
      id: classroom.id,
      name: classroom.name,
      teacerId: classroom.teacherId,
      teacherName: classroom.teacher?.profile?.name,
      student: classroom._count?.student,
    };
  });

  return {
    data: dataClassrooms,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
};

// get classrooms details
const getClassroomsById = async (id: string) => {
  const data = await db.class.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      teacherId: true,
      teacher: {
        select: {
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
      student: true,
    },
  });

  return data;
};

// create class room
const createClassroom = async (data: { name: string; teacherId: string }) => {
  const classroom = await db.class.create({
    data: {
      name: data.name,
      teacherId: data.teacherId,
    },
  });

  return classroom;
};

const isHaveClassRoom = async (teacherId: string) => {
  const data = await db.class.findFirst({
    where: {
      teacherId: teacherId,
    },
  });

  return data;
};

const updateClassroom = async (
  id: string,
  data: { name: string; teacherId: string }
) => {
  const classroom = await db.class.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      teacherId: data.teacherId,
    },
  });

  return classroom;
};

const findTeacherById = async (id: string) => {
  const data = await db.user.findFirst({
    where: {
      id: id,
      role: {
        name: "teacher",
      },
    },
  });

  return data;
};

const findClassRoomByName = async (name: string) => {
  const data = await db.class.findFirst({
    where: {
      name: name,
    },
  });

  return data;
};

const deleteClassroom = async (id: string) => {
  const classroom = await db.class.delete({
    where: {
      id: id,
    },
  });
};

export {
  getAllClassroom,
  getClassroomsById,
  createClassroom,
  isHaveClassRoom,
  updateClassroom,
  findTeacherById,
  findClassRoomByName,
  deleteClassroom,
};
