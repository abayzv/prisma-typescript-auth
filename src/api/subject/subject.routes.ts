import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import {
  getAllSubject,
  getSubjectById,
  createSubject,
  findSubjectByName,
  updateSubject,
  deleteSubject,
} from "./subject.services";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    optional: true,
  },
};

const createRules = {
  name: {
    notEmpty: true,
    errorMessage: "Name is required",
  },
};

// Get all subjects
router.get(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { name } = matchedData(req, {
      locations: ["query"],
    });
    const query = {
      name,
      page: req.query.page,
      show: req.query.show,
    };

    try {
      const subjects = await getAllSubject(query);
      res.json(subjects);
    } catch (error) {
      next(error);
    }
  }
);

// Get subject by id
router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    const { id } = req.params;

    try {
      const subject = await getSubjectById(id);
      if (!subject)
        return res.status(404).json({ message: "Subject not found" });

      const teacherList = (teachers: Array<any>) => {
        return teachers.map((teacher) => {
          return {
            id: teacher.id,
            name: teacher.profile.name,
            photo: teacher.profile.photo,
          };
        });
      };

      const scoreList = (scores: Array<any>) => {
        return scores.map((score) => {
          return {
            id: score.user.id,
            score: score.score,
            name: score.user.profile.name,
            photo: score.user.profile.photo,
          };
        });
      };

      const data = {
        id: subject.id,
        name: subject.name,
        teacher: teacherList(subject.user),
        score: scoreList(subject.score),
      };

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

// Create subject
router.post(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(createRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { name } = matchedData(req, {
      locations: ["body"],
    });

    const isExist = await findSubjectByName(name);
    if (isExist)
      return res.status(422).json({ message: "Subject name already exist" });

    const data = {
      name,
    };

    try {
      const subject = await createSubject(data);
      res.json({ message: "Subject created", data: subject });
    } catch (error) {
      next(error);
    }
  }
);

// Update subject
router.put(
  "/:id",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { id } = req.params;
    const { name } = matchedData(req, {
      locations: ["body"],
    });

    const isExist = await findSubjectByName(name);
    if (isExist)
      return res.status(422).json({ message: "Subject name already exist" });

    const data = {
      name,
    };

    try {
      const subject = await getSubjectById(id);
      if (!subject)
        return res.status(404).json({ message: "Subject not found" });

      await updateSubject(id, data);
      res.json({ message: "Subject updated", data: subject });
    } catch (error) {
      next(error);
    }
  }
);

// Delete subject
router.delete(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    const { id } = req.params;

    try {
      const subject = await getSubjectById(id);
      if (!subject)
        return res.status(404).json({ message: "Subject not found" });

      await deleteSubject(id);
      res.json({ message: "Subject deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
