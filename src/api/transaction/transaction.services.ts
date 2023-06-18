// @ts-ignore
import core from "../../config/midtrans";
import axios from "axios";
import fetch from "node-fetch";
import { db } from "../../utils/db";

const getAllTransaction = async (query: {
  referenceId?: string;
  startDate?: Date;
  endDate?: Date;
  page: number;
  show: number;
}) => {
  const paginate = +query.show || 10;
  const skipData = (+query.page - 1) * paginate || 0;
  let startDate = new Date("2021-01-01");
  let endDate = new Date();

  if (query.startDate) {
    startDate = new Date(query.startDate);
  }

  if (query.endDate) {
    endDate = new Date(query.endDate);
    endDate.setDate(endDate.getDate() + 1);
  }

  const transactions = await db.transaction.findMany({
    skip: skipData,
    take: paginate,
    where: {
      referenceNumber: {
        contains: query.referenceId || "",
        mode: "insensitive",
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      referenceNumber: true,
      items: {
        select: {
          payment: {
            select: {
              name: true,
              type: true,
              amount: true,
            },
          },
        },
      },
      user: {
        select: {
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
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

  const count = await db.transaction.count({
    where: {
      referenceNumber: {
        contains: query.referenceId || "",
        mode: "insensitive",
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const newTransactions = transactions.map((transaction) => {
    let total = 0;
    transaction.items.map((item) => {
      total += item.payment.amount;
    });

    return {
      id: transaction.id,
      referenceNumber: transaction.referenceNumber,
      user: transaction.user.profile?.name,
      total,
      paymentMethod: transaction.paymentMethod?.name,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  });

  return {
    data: newTransactions,
    totalPage: Math.ceil(count / paginate).toString(),
    page: query.page || "1",
  };
};

const getTransactionById = async (id: string) => {
  const transaction = await db.transaction.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      referenceNumber: true,
      items: {
        select: {
          notes: true,
          payment: {
            select: {
              name: true,
              type: true,
              amount: true,
            },
          },
        },
      },
      user: {
        select: {
          profile: {
            select: {
              name: true,
            },
          },
        },
      },
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

  return transaction;
};

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
        Authorization: "Basic " + btoa(process.env.MIDTRANS_SERVER_KEY + ":"),
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
    .catch((err) => err);
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

  const generateReferenceNumber =
    "INV-" +
    Math.floor(100000 + Math.random() * 900000) +
    "-" +
    new Date().toISOString().slice(11, 16).replace(":", "");

  //   add transaction
  const transaction = await db.transaction.create({
    data: {
      referenceNumber: generateReferenceNumber,
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

const getQrCode = async (orderId: string) => {
  // convert this url https://api.sandbox.midtrans.com/v2/qris/${orderId}/qr-code, to base64
  const result = await axios
    .get(`https://api.sandbox.midtrans.com/v2/qris/${orderId}/qr-code`, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      let image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      return `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${image}`;
    });

  return result;
};

const findTransactionById = async (transactionId: string) => {
  const transaction = await db.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });

  return transaction;
};

const deleteTransaction = async (transactionId: string) => {
  const transaction = await db.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  return transaction;
};

export {
  getAllTransaction,
  charge,
  getStatus,
  cancelTransaction,
  addTransaction,
  getQrCode,
  deleteTransaction,
  findTransactionById,
  getTransactionById,
};
