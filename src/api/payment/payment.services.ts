import { db } from "../../utils/db";
import { PaymentType, Prisma } from "@prisma/client";

// get all payment
const getAllPayment = async (query: { name?: string; type?: PaymentType }) => {
  const { name, type } = query;

  const payments = await db.payment.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
      type: type,
    },
  });
  return payments;
};

// get payment by id
const getPaymentById = async (id: string) => {
  const payment = await db.payment.findUnique({
    where: {
      id: id,
    },
  });
  return payment;
};

// get payment by name
const getPaymentByName = async (name: string) => {
  const payment = await db.payment.findFirst({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return payment;
};

// create payment
const createPayment = async (paymentData: Prisma.PaymentCreateInput) => {
  const payment = await db.payment.create({
    data: paymentData,
  });
  return payment;
};

// update payment
const updatePayment = async (
  id: string,
  paymentData: Prisma.PaymentUpdateInput
) => {
  const payment = await db.payment.update({
    where: {
      id: id,
    },
    data: paymentData,
  });
  return payment;
};

// delete payment
const deletePayment = async (id: string) => {
  const payment = await db.payment.delete({
    where: {
      id: id,
    },
  });
  return payment;
};

export {
  getAllPayment,
  getPaymentById,
  getPaymentByName,
  createPayment,
  updatePayment,
  deletePayment,
};
