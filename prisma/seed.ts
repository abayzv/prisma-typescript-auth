import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // create some permissions

  const create = await prisma.permission.create({
    data: {
      name: "Create User",
      action: "POST",
      menu: "user",
    },
  });

  const read = await prisma.permission.create({
    data: {
      name: "View User",
      action: "GET",
      menu: "user",
    },
  });

  const update = await prisma.permission.create({
    data: {
      name: "Update User",
      action: "PUT",
      menu: "user",
    },
  });

  const delete_ = await prisma.permission.create({
    data: {
      name: "Delete User",
      action: "DELETE",
      menu: "user",
    },
  });

  // Create some roles
  const superadmin = await prisma.role.create({
    data: {
      name: "superadmin",
    },
  });

  const admin = await prisma.role.create({
    data: {
      name: "admin",
    },
  });

  const teacher = await prisma.role.create({
    data: {
      name: "teacher",
    },
  });

  const student = await prisma.role.create({
    data: {
      name: "student",
    },
  });

  const parent = await prisma.role.create({
    data: {
      name: "parent",
    },
  });

  // create some role permission
  const adminPermission = await prisma.rolePermission.createMany({
    data: [
      {
        roleId: admin.id,
        permissionId: create.id,
      },
      {
        roleId: admin.id,
        permissionId: read.id,
      },
      {
        roleId: admin.id,
        permissionId: update.id,
      },
      {
        roleId: admin.id,
        permissionId: delete_.id,
      },
    ],
  });

  const teacherPermission = await prisma.rolePermission.createMany({
    data: [
      {
        roleId: teacher.id,
        permissionId: read.id,
      },
    ],
  });

  const studentPermission = await prisma.rolePermission.createMany({
    data: [
      {
        roleId: student.id,
        permissionId: read.id,
      },
    ],
  });

  const parentPermission = await prisma.rolePermission.createMany({
    data: [
      {
        roleId: parent.id,
        permissionId: read.id,
      },
    ],
  });

  // create user superadmin
  const superadminUser = await prisma.user.create({
    data: {
      email: "super@admin.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: superadmin.id,
      profile: {
        create: {
          name: "Super Admin",
        },
      },
    },
  });

  // create user admin
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: admin.id,
      profile: {
        create: {
          name: "Admin",
        },
      },
    },
  });

  // create user teacher
  const teacherUser = await prisma.user.create({
    data: {
      email: "bayu@gmail.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: teacher.id,
      profile: {
        create: {
          name: "Aji Bayu Nugroho",
        },
      },
    },
  });

  // create user student
  const studentUser = await prisma.user.create({
    data: {
      email: "tama@gmail.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: student.id,
      profile: {
        create: {
          name: "Pertamawati",
        },
      },
    },
  });

  // create class
  const class1 = await prisma.class.create({
    data: {
      name: "XII RPL 1",
      teacherId: teacherUser.id,
    },
  });

  // create payment
  const spp = await prisma.payment.create({
    data: {
      name: "SPP",
      type: "semester",
      amount: 1000000,
    },
  });

  // create parent
  const parent1 = await prisma.parent.create({
    data: {
      name: "Tono",
      address: "Jl. Sukaraja No. 1",
      phone: "081234567890",
      userId: studentUser.id,
    },
  });

  // create subject
  const subject1 = await prisma.subject.create({
    data: {
      name: "Bahasa Indonesia",
    },
  });

  // create scoreCategory
  const scoreCategory1 = await prisma.scoreCategory.create({
    data: {
      name: "Ulangan Harian",
    },
  });

  // create score
  const score1 = await prisma.score.create({
    data: {
      subjectId: subject1.id,
      userId: studentUser.id,
      score: 90,
      categoryId: scoreCategory1.id,
    },
  });

  // create payment method
  const qris = await prisma.paymentMethod.create({
    data: {
      name: "qris",
      image:
        "https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png",
    },
  });

  const generateReferenceNumber =
    "INV-" +
    Math.floor(100000 + Math.random() * 900000) +
    "-" +
    new Date().toISOString().slice(11, 16).replace(":", "");

  // create transaction
  const transaction1 = await prisma.transaction.create({
    data: {
      referenceNumber: generateReferenceNumber,
      userId: studentUser.id,
      paymentMethodId: qris.id,
    },
  });

  // create transaction detail
  const transactionDetail1 = await prisma.transactionDetail.create({
    data: {
      transactionId: transaction1.id,
      paymentId: spp.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
