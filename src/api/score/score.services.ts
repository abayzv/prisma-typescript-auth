import { db } from "../../utils/db";
import { Prisma } from "@prisma/client";

// generate score for student
const createScoreList = async (data: {
  subjectId: Array<string>;
  scoreCategoryId: string;
  classId: string;
}) => {
  // get all student in class
  const students = await db.class.findUnique({
    where: {
      id: data.classId,
    },
    select: {
      student: {
        select: {
          id: true,
        },
      },
    },
  });

  const scoreList: Array<any> = [];

  // create score for each student
  students?.student.forEach((student) => {
    data.subjectId.forEach((subject) => {
      scoreList.push({
        score: 0,
        categoryId: data.scoreCategoryId,
        subjectId: subject,
        userId: student.id,
      });
    });
  });

  const scoreData = await db.score.createMany({
    data: scoreList,
    skipDuplicates: true,
  });
};

export { createScoreList };
