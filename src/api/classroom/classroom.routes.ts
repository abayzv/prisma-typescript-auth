import express, { query } from "express";
import {
  getAllClassroom,
  getClassroomsById,
  createClassroom,
  isHaveClassRoom,
  updateClassroom,
  findTeacherById,
  deleteClassroom,
  findClassRoomByName,
  assignStudent,
} from "./classroom.services";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import { checkSchema, validationResult, matchedData } from "express-validator";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    optional: true,
  },
};

const createRules = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  teacherId: {
    notEmpty: {
      errorMessage: "Teacher ID is required",
    },
  },
};

const updateRules = {
  name: {
    optional: true,
    notEmpty: {
      errorMessage: "Name can't be empty",
    },
  },
  teacherId: {
    optional: true,
    notEmpty: {
      errorMessage: "Teacher Id can't be empty",
    },
  },
};

// Get all classrooms

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
      const classrooms = await getAllClassroom(query);
      res.json(classrooms);
    } catch (error) {
      next(error);
    }
  }
);

// Get classroom details
router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const classroom = await getClassroomsById(req.params.id);

      if (!classroom)
        return res.status(404).json({ message: "Classroom not found" });

      const mapCategoryScore = (data: Array<any>) => {
        // group data by item.category.name in data
        const groupByCategory = data.reduce((acc: any, item: any) => {
          const key = item.category.name;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push({
            id: item.id,
            score: item.score,
            subject: item.subject.name,
          });
          return acc;
        }, {});

        return groupByCategory;
      };

      const studentList = (data: Array<any>) => {
        return data.map((student) => {
          return {
            id: student.id,
            name: student.profile.name,
            photo: student.profile.photo,
            score: mapCategoryScore(student.score),
          };
        });
      };

      const classroomData = {
        id: classroom.id,
        name: classroom.name,
        teacherId: classroom.teacherId,
        teacherName: classroom.teacher?.profile?.name,
        student: studentList(classroom.student),
      };

      res.json({ data: classroomData });
    } catch (error) {
      next(error);
    }
  }
);

// Create classroom
router.post(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(createRules),
  activityLogger("Create classroom", "Success Create Classroom"),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const match = matchedData(req, {
      locations: ["body"],
    });

    const isExist = await findClassRoomByName(match.name);
    if (isExist)
      return res
        .status(422)
        .json({ message: "Classroom name is already exist" });

    const classRoomData = {
      name: match.name,
      teacherId: match.teacherId,
    };

    const isHaveClass = await isHaveClassRoom(match.teacherId);
    if (isHaveClass)
      return res.status(422).json({
        message: "Teacher already have a classroom",
      });

    try {
      const classroom = await createClassroom(classRoomData);
      res.json({
        message: "Classroom created successfully",
        data: classroom,
      });
    } catch (error) {
      next(error);
    }
  }
);

// update classroom
router.put(
  "/:id",
  isAuthenticated,
  isPermited,
  checkSchema(updateRules),
  activityLogger("Update classroom", "Success Update Classroom"),
  async (req: any, res: any, next: any) => {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const match = matchedData(req, {
      locations: ["body"],
    });
    const classRoomData = {
      name: match.name,
      teacherId: match.teacherId,
    };

    if (match.teacherId) {
      const teacher = await findTeacherById(match.teacherId);
      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });

      const isHaveClass = await isHaveClassRoom(match.teacherId);
      if (isHaveClass)
        return res.status(422).json({
          message: "Teacher already have a classroom",
          data: isHaveClass,
        });
    }

    try {
      const classroom = await updateClassroom(id, classRoomData);
      res.json({
        message: "Classroom updated successfully",
        data: classroom,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete classroom
router.delete(
  "/:id",
  isAuthenticated,
  isPermited,
  activityLogger("Delete classroom", "Success Delete Classroom"),
  async (req: any, res: any, next: any) => {
    const id = req.params.id;

    const classroom = await getClassroomsById(id);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });

    try {
      await deleteClassroom(id);
      res.json({
        message: "Classroom deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

// Assign student to classroom
router.post(
  "/:id/assign",
  isAuthenticated,
  isPermited,
  activityLogger("Assign student to classroom", "Success Assign Student"),
  async (req: any, res: any, next: any) => {
    const id = req.params.id;
    const { studentId } = req.body;

    const classroom = await getClassroomsById(id);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found" });

    try {
      const assign = await assignStudent(id, studentId);
      res.json({
        message: "Student assigned successfully",
        data: assign,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
