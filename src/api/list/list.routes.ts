import express from "express";
import {
  getTeacherList,
  getClassroomList,
  getPermissionList,
  getRoleList,
  getSubjectList,
  getScoreCategoryList,
} from "./list.services";

const router = express.Router();

// Get all teachers
router.get("/teachers", async (req: any, res: any, next: any) => {
  try {
    const teachers = await getTeacherList();

    const data = teachers.map((teacher: any) => {
      return {
        value: teacher.id,
        label: teacher.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// Get all classrooms
router.get("/classrooms", async (req: any, res: any, next: any) => {
  try {
    const classrooms = await getClassroomList();

    const data = classrooms.map((classroom: any) => {
      return {
        value: classroom.id,
        label: classroom.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// Get all permissions
router.get("/permissions", async (req: any, res: any, next: any) => {
  try {
    const permissions = await getPermissionList();

    const data = permissions.map((permission: any) => {
      return {
        value: permission.id,
        label: permission.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// Get all roles
router.get("/roles", async (req: any, res: any, next: any) => {
  try {
    const roles = await getRoleList();

    const data = roles.map((role: any) => {
      return {
        value: role.id,
        label: role.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// Get all subjects
router.get("/subjects", async (req: any, res: any, next: any) => {
  try {
    const subjects = await getSubjectList();

    const data = subjects.map((subject: any) => {
      return {
        value: subject.id,
        label: subject.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

// Get all score categories
router.get("/score-categories", async (req: any, res: any, next: any) => {
  try {
    const scoreCategories = await getScoreCategoryList();

    const data = scoreCategories.map((scoreCategory: any) => {
      return {
        value: scoreCategory.id,
        label: scoreCategory.name,
      };
    });

    res.json({ data });
  } catch (error) {
    next(error);
  }
});

export default router;
