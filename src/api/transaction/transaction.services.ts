// @ts-ignore
import core from "../../config/midtrans.js";
import axios from "axios";
import fetch from "node-fetch";
import { db } from "../../utils/db";
import { PaymentMethod } from "@prisma/client";

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
  payment: Array<string>;
  userId: string;
  payment_type: string;
  payment_method: PaymentMethod;
}) => {
  const { payment, userId, payment_type, payment_method } = transactionData;
  // get all payment
  const paymentData = await db.payment.findMany({
    where: {
      id: {
        in: payment,
      },
    },
  });

  //   get total payment amount
  const totalAmount = paymentData.reduce((acc, curr) => acc + curr.amount, 0);

  //   add transaction
  const transaction = await db.bill.create({
    data: {
      userId: userId,
      paymentMethod: payment_method,
    },
  });

  const transactionDetail = await db.billDetail.createMany({
    data: paymentData.map((item) => ({
      billId: transaction.id,
      paymentId: item.id,
    })),
    skipDuplicates: true,
  });

  return {
    payment_type,
    gross_amount: totalAmount,
    order_id: transaction.id,
  };
};

export { charge, getStatus, cancelTransaction, addTransaction };
