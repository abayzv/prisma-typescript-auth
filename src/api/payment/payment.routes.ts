import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { isPermited, isAuthenticated, activityLogger } from "../../middlewares";
import {
  getAllPayment,
  getPaymentById,
  getPaymentByName,
  createPayment,
  updatePayment,
  deletePayment,
} from "./payment.services";

const router = express.Router();

// Validation Rules
const rules = {
  name: {
    optional: true,
  },
  type: {
    optional: true,
    isIn: {
      options: [["semester", "monthly", "registration"]],
      errorMessage: "Type must be semester, monthly or registration",
    },
  },
};

const createRules = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
  },
  type: {
    notEmpty: {
      errorMessage: "Type is required",
    },
    isIn: {
      options: [["semester", "monthly", "registration"]],
      errorMessage: "Type must be semester, monthly or registration",
    },
  },
  amount: {
    notEmpty: {
      errorMessage: "Amount is required",
    },
    custom: {
      options: (value: any) => {
        if (typeof value !== "number")
          throw new Error("Amount must be a number");
        return true;
      },
    },
  },
};

const updateRules = {
  name: {
    optional: true,
    isLength: {
      options: { min: 3, max: 255 },
      errorMessage: "Name must be at least 3 characters long",
    },
  },
  type: {
    optional: true,
    isIn: {
      options: [["semester", "monthly", "registration"]],
      errorMessage: "Type must be semester, monthly or registration",
    },
  },
  amount: {
    optional: true,
    custom: {
      options: (value: any) => {
        if (typeof value !== "number")
          throw new Error("Amount must be a number");
        return true;
      },
    },
  },
};

// get all payment
router.get(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) return res.status(422).json(error.array());

      const { name, type } = matchedData(req, { locations: ["query"] });
      const query = {
        name,
        type,
        page: req.query.page,
        show: req.query.show,
      };

      const payments = await getAllPayment(query);
      res.json(payments);
    } catch (err) {
      next(err);
    }
  }
);

// show payment
router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const payment = await getPaymentById(id);

      if (!payment)
        return res.status(404).json({ message: "Payment not found" });

      res.json({ data: payment });
    } catch (err) {
      next(err);
    }
  }
);

// create payment
router.post(
  "/",
  isAuthenticated,
  activityLogger("Create Payment", "Successfully create payment"),
  isPermited,
  checkSchema(createRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const payment = matchedData(req);
    const paymentData = {
      name: payment.name,
      type: payment.type,
      amount: payment.amount,
    };

    const isExist = await getPaymentByName(payment.name);
    if (isExist)
      return res.status(409).json({ message: "Payment already exist" });

    try {
      const result = await createPayment(paymentData);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

// update payment
router.put(
  "/:id",
  isAuthenticated,
  activityLogger("Update Payment", "Successfully update payment"),
  isPermited,
  checkSchema(updateRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { id } = req.params;
    const payment = matchedData(req);
    const paymentData = {
      name: payment.name,
      type: payment.type,
      amount: payment.amount,
    };

    const isExist = await getPaymentById(id);
    if (!isExist) return res.status(404).json({ message: "Payment not found" });

    const isExistName = await getPaymentByName(payment.name);
    if (isExistName)
      return res.status(409).json({
        message: `Payment for name ${isExistName.name} is already exist`,
      });

    try {
      const result = await updatePayment(id, paymentData);
      res.json({ message: "Update payment success", data: result });
    } catch (err) {
      next(err);
    }
  }
);

// delete payment
router.delete(
  "/:id",
  isAuthenticated,
  activityLogger("Delete Payment", "Successfully delete payment"),
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const payment = await getPaymentById(id);

      if (!payment)
        return res.status(404).json({ message: "Payment not found" });

      const result = await deletePayment(id);
      res.json({ message: "Delete payment success" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
