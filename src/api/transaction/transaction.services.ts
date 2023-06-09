// @ts-ignore
import core from "../../config/midtrans.js";
import axios from "axios";
import fetch from "node-fetch";
import { db } from "../../utils/db";

const charge = async (paymentData: {
  payment_type: string;
  gross_amount: number;
  order_id: string;
  callback_url?: string;
}) => {
  const parameter = {
    payment_type: paymentData.payment_type,
    transaction_details: {
      gross_amount: paymentData.gross_amount,
      order_id: paymentData.order_id,
    },
    gopay: {
      enable_callback: true, // optional
      callback_url: paymentData.callback_url || "", // optional
    },
  };

  const result = await core.charge(parameter);
  return result;
};

const getStatus = async (orderId: string) => {
  const result = await axios.get(
    `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic U0ItTWlkLXNlcnZlci1qWFlzQ0pNWHFUTFRud3FoNnhWeHFwdTA6",
      },
    }
  );
  return result.data;
};

const cancelTransaction = async (orderId: string) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Basic " + btoa(process.env.MIDTRANS_SERVER_KEY + ":"),
    },
  };

  const result = await fetch(
    `https://api.sandbox.midtrans.com/v2/${orderId}/cancel`,
    options
  )
    .then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.log(err));
  return result;
};

const addTransaction = async (transactionData: {
  payment: Array<PaymentDetailItem>;
  userId: string;
  paymentMethodId: number;
}) => {
  const { payment, userId, paymentMethodId } = transactionData;
  // get all payment
  const paymentsId = payment.map((item) => item.id);

  const paymentData = await db.payment.findMany({
    where: {
      id: {
        in: paymentsId,
      },
    },
  });

  //   get total payment amount
  const totalAmount = paymentData.reduce((acc, curr) => acc + curr.amount, 0);

  //   add transaction
  const transaction = await db.transaction.create({
    data: {
      userId: userId,
      paymentMethodId: paymentMethodId,
    },
    select: {
      id: true,
      userId: true,
      paymentMethod: {
        select: {
          name: true,
        },
      },
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const transactionDetail = await db.transactionDetail.createMany({
    data: paymentData.map((item) => ({
      transactionId: transaction.id,
      paymentId: item.id,
      notes: payment.find((payment) => payment.id === item.id)?.notes,
    })),
    skipDuplicates: true,
  });

  return {
    payment_type: transaction.paymentMethod.name,
    gross_amount: totalAmount,
    order_id: transaction.id,
    transaction,
  };
};

export { charge, getStatus, cancelTransaction, addTransaction };
