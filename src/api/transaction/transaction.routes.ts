import express from "express";
import {
  check,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { isAuthenticated, isPermited, activityLogger } from "../../middlewares";
import {
  getAllTransaction,
  charge,
  getStatus,
  cancelTransaction,
  addTransaction,
  getQrCode,
  deleteTransaction,
  findTransactionById,
  getTransactionById,
} from "./transaction.services";
import fs from "fs";
// @ts-ignore
import base64img from "base64-img";

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

const queryRules = {
  referenceId: {
    optional: true,
  },
  startDate: {
    optional: true,
    isDate: {
      errorMessage: "Start Date must be a valid date",
    },
  },
  endDate: {
    optional: true,
    isDate: {
      errorMessage: "End Date must be a valid date",
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
    custom: {
      options: (value: Array<PaymentDetailItem>) => {
        // must be have id and notes ar optional
        const isValid = value.every(
          (item) => item.id && typeof item.id === "string"
        );
        if (!isValid) throw new Error("Payment must be have id");
        return true;
      },
    },
  },
  userId: {
    notEmpty: {
      errorMessage: "User ID is required",
    },
  },
  paymentMethodId: {
    notEmpty: {
      errorMessage: "Payment Method Id is required",
    },
    custom: {
      options: (value: number) => {
        // value must be integer
        if (!Number.isInteger(value)) {
          throw new Error("Payment Method Id must be an integer");
        }
        return true;
      },
    },
  },
};

// get all transactions
router.get(
  "/",
  isAuthenticated,
  isPermited,
  checkSchema(queryRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json(errors.array());

    const { referenceId, startDate, endDate } = matchedData(req, {
      locations: ["query"],
    });
    const query = {
      referenceId,
      startDate,
      endDate,
      page: req.query.page,
      show: req.query.show,
    };

    try {
      const result = await getAllTransaction(query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// get transaction by id
router.get(
  "/:id",
  isAuthenticated,
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const result = await getTransactionById(id);

      if (!result)
        return res.status(404).json({ message: "Transaction not found" });

      const transactions = {
        id: result.id,
        referenceId: result.referenceNumber,
        paymentMethod: result.paymentMethod.name,
        status: result.status,
        user: {
          name: result.user?.profile?.name,
        },
        items: result.items.map((item: any) => ({
          name: item.payment.name,
          type: item.payment.type,
          amount: item.payment.amount,
          notes: item.notes,
        })),
        createdAt: result.createdAt,
      };

      res.json({ data: transactions });
    } catch (error) {
      next(error);
    }
  }
);

// Charge
router.post(
  "/charge",
  isAuthenticated,
  isPermited,
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
  activityLogger("Cancel Transaction", "Successfully cancel transaction"),
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

// Get Status
router.get(
  "/:orderId/status",
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { orderId } = req.params;
      // get url path

      const result = await getStatus(orderId);

      const url =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/v1/transactions/" +
        result.transaction_id +
        "/qrcode";

      res.json({ data: { ...result, qrCode: url } });
    } catch (error) {
      next(error);
    }
  }
);

// Add Transaction
router.post(
  "/add",
  isAuthenticated,
  activityLogger("Create Transaction", "Successfully create transaction"),
  isPermited,
  checkSchema(addTransactionRules),
  async (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const transaction = matchedData(req);
    const transactionData = {
      payment: transaction.payment,
      userId: transaction.userId,
      paymentMethodId: transaction.paymentMethodId,
    };

    try {
      const result = await addTransaction(transactionData);
      const pay = await charge(result);
      res.json({
        message: "Transaction Success",
        data: {
          ...result.transaction,
          details: pay,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get QR Code
router.get("/:orderId/qrcode", async (req: any, res: any, next: any) => {
  try {
    const { orderId } = req.params;
    const result = await getQrCode(orderId);

    const img = await base64img.imgSync(result, "src/assets/images", orderId);

    if (!img) return res.status(404).json({ message: "Image not found" });

    const images = fs.readFileSync(img);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": images.length,
    });
    res.end(images);
  } catch {
    const error = new Error("QR Code not found");
    next(error);
  }
});

// Delete Transaction
router.delete(
  "/:id",
  isAuthenticated,
  activityLogger("Delete Transaction", "Successfully delete transaction"),
  isPermited,
  async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;

      const isExist = await findTransactionById(id);
      if (!isExist)
        return res.status(400).json({ message: "Transaction not found" });

      const result = await deleteTransaction(id);
      res.json({ message: "Transaction deleted" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
