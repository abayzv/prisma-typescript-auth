import express from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { isAuthenticated, isPermited } from "../../middlewares";
import {
  charge,
  getStatus,
  cancelTransaction,
  addTransaction,
} from "./transaction.services";

const router = express.Router();

// Validation Rules
const rules = {
  payment_type: {
    notEmpty: {
      errorMessage: "Payment Type is required",
    },
    isIn: {
      options: [["gopay", "bank_transfer", "qris"]],
      errorMessage: "Payment Type must be gopay, qris or bank_transfer",
    },
  },
  gross_amount: {
    notEmpty: {
      errorMessage: "Gross Amount is required",
    },
    isNumeric: {
      errorMessage: "Gross Amount must be a number",
    },
  },
  order_id: {
    notEmpty: {
      errorMessage: "Order ID is required",
    },
  },
  callback_url: {
    optional: true,
    isURL: {
      errorMessage: "Callback URL must be a valid URL",
    },
  },
};

const addTransactionRules = {
  payment: {
    isArray: {
      errorMessage: "Payment must be an array",
    },
    notEmpty: {
      errorMessage: "Payment is required",
    },
  },
  userId: {
    notEmpty: {
      errorMessage: "User ID is required",
    },
  },
  payment_type: {
    notEmpty: {
      errorMessage: "Payment Type is required",
    },
    isIn: {
      options: [["gopay", "bank_transfer", "qris"]],
      errorMessage: "Payment Type must be gopay, qris or bank_transfer",
    },
  },
  payment_method: {
    notEmpty: {
      errorMessage: "Payment Method is required",
    },
    isIn: {
      options: [["Cash", "Transfer"]],
      errorMessage: "Payment Method must be Cash or Transfer",
    },
  },
};

// Charge
router.post(
  "/charge",
  isAuthenticated,
  checkSchema(rules),
  async (req: any, res: any, next: any) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const payment = matchedData(req);
      const paymentData = {
        payment_type: payment.payment_type,
        gross_amount: payment.gross_amount,
        order_id: payment.order_id,
        callback_url: payment.callback_url,
      };

      const result = await charge(paymentData);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }
);

// Cancel Transaction
router.post(
  "/:orderId/cancel",
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { orderId } = req.params;
      const result = await cancelTransaction(orderId);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:orderId/status",
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { orderId } = req.params;
      const result = await getStatus(orderId);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add",
  isAuthenticated,
  checkSchema(addTransactionRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const transaction = matchedData(req);
    const transactionData = {
      payment: transaction.payment,
      userId: transaction.userId,
      payment_type: transaction.payment_type,
      payment_method: transaction.payment_method,
    };

    try {
      const result = await addTransaction(transactionData);
      const pay = await charge(result);
      res.json({
        message: "Transaction Success",
        data: pay,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
