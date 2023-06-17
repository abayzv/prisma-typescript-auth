import { db } from "../../utils/db";

const getTeacherList = async () => {
  const data = await db.user.findMany({
    where: {
      role: {
        name: "teacher",
      },
    },
    select: {
      id: true,
      profile: {
        select: {
          name: true,
        },
      },
      teacherClass: true,
    },
  });

  const teacher = data.map((teacher) => {
    return {
      id: teacher.id,
      name: teacher.profile?.name,
      haveClass: teacher.teacherClass ? true : false,
    };
  });

  return teacher;
};

const getClassroomList = async () => {
  const data = await db.class.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return data;
};

const getPermissionList = async () => {
  const data = await db.permission.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return data;
};

const getRoleList = async () => {
  const data = await db.role.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return data;
};

export { getTeacherList, getClassroomList, getPermissionList, getRoleList };
