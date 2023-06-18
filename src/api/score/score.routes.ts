import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import {
  createScoreList,
  updateScore,
  deleteScore,
  findScoreById,
} from "./score.services";
import { findUserById } from "../users/users.services";
import { findSubjectByManyId } from "../subject/subject.services";
import { getClassroomsById } from "../classroom/classroom.services";
import { findScoreCategoryById } from "../scoreCategory/scoreCategory.services";

const router = express.Router();

const rules = {
  classId: {
    notEmpty: {
      errorMessage: "Class Id is required",
    },
  },
  subjectId: {
    notEmpty: {
      errorMessage: "Subject Id is required",
    },
    custom: {
      options: (value: any) => {
        // valu of array must be string
        if (!Array.isArray(value)) throw new Error("Subject Id must be array");

        value.forEach((element: any) => {
          if (typeof element !== "string")
            throw new Error("Subject Id must be array of string");
        });

        return true;
      },
    },
  },
  scoreCategoryId: {
    notEmpty: {
      errorMessage: "Score Category Id is required",
    },
  },
};

const updateRules = {
  userId: {
    notEmpty: {
      errorMessage: "User Id is required",
    },
  },
  subjectId: {
    notEmpty: {
      errorMessage: "Subject Id is required",
    },
    custom: {
      options: (value: any) => {
        // valu of array must be string
        if (!Array.isArray(value)) throw new Error("Subject Id must be array");

        value.forEach((element: any) => {
          if (typeof element !== "string")
            throw new Error("Subject Id must be array of string");
        });

        return true;
      },
    },
  },
  scoreCategoryId: {
    notEmpty: {
      errorMessage: "Score Category Id is required",
    },
  },
  score: {
    notEmpty: {
      errorMessage: "Score is required",
    },
    custom: {
      options: (value: any) => {
        // if typeof value !== "number" return false;
        if (typeof value !== "number") return false;

        return true;
      },
    },
  },
};

const deleteRules = {
  userId: {
    notEmpty: {
      errorMessage: "User Id is required",
    },
  },
  subjectId: {
    notEmpty: {
      errorMessage: "Subject Id is required",
    },
    custom: {
      options: (value: any) => {
        // valu of array must be string
        if (!Array.isArray(value)) throw new Error("Subject Id must be array");

        value.forEach((element: any) => {
          if (typeof element !== "string")
            throw new Error("Subject Id must be array of string");
        });

        return true;
      },
    },
  },
  scoreCategoryId: {
    notEmpty: {
      errorMessage: "Score Category Id is required",
    },
  },
};

// create score list
router.post(
  "/generate",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  activityLogger("Generate Score", "Socre Successfully Generated"),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { classId, subjectId, scoreCategoryId } = matchedData(req, {
      locations: ["body"],
    });

    const classroom = await getClassroomsById(classId);
    if (!classroom)
      return res.status(422).json({ message: "Classroom not found" });

    const subject = await findSubjectByManyId(subjectId);
    if (!subject) return res.status(422).json({ message: "Subject not found" });

    const scoreCategory = await findScoreCategoryById(scoreCategoryId);
    if (!scoreCategory)
      return res.status(422).json({ message: "Score Category not found" });

    const dataScore = {
      classId,
      subjectId,
      scoreCategoryId,
    };
    try {
      const scoreList = await createScoreList(dataScore);
      res.json({ message: "Score list created" });
    } catch (error) {
      next(error);
    }
  }
);

// update score
router.put(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(updateRules),
  activityLogger("Update Score", "Score Successfully Updated"),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { userId, subjectId, scoreCategoryId, score } = matchedData(req, {
      locations: ["body"],
    });

    const user = await findUserById(userId);
    if (!user) return res.status(422).json({ message: "User not found" });

    const subject = await findSubjectByManyId(subjectId);
    if (!subject) return res.status(422).json({ message: "Subject not found" });

    const scoreCategory = await findScoreCategoryById(scoreCategoryId);
    if (!scoreCategory)
      return res.status(422).json({ message: "Score Category not found" });

    const dataScore = {
      userId,
      subjectId,
      scoreCategoryId,
      score,
    };

    try {
      const score = await updateScore(dataScore);
      res.json({ message: "Score successfully updated" });
    } catch (error) {
      next(error);
    }
  }
);

// delete score
router.delete(
  "/:id",
  isAuthenticated,
  isPermited,
  activityLogger("Delete Score", "Score Successfully Deleted"),
  async (req: any, res: any, next: any) => {
    const { id } = req.params;

    const score = await findScoreById(id);
    if (!score) return res.status(422).json({ message: "Score not found" });

    try {
      const score = await deleteScore(id);
      res.json({ message: "Score successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
