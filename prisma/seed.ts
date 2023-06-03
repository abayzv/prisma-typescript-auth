import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // create some permissions

  const create = await prisma.permission.create({
    data: {
      id: 1,
      name: "create",
    },
  });

  const read = await prisma.permission.create({
    data: {
      id: 2,
      name: "read",
    },
  });

  const update = await prisma.permission.create({
    data: {
      id: 3,
      name: "update",
    },
  });

  const delete_ = await prisma.permission.create({
    data: {
      id: 4,
      name: "delete",
    },
  });

  // Create some roles
  const admin = await prisma.role.create({
    data: {
      id: 1,
      name: "admin",
      permission: {
        connect: [
          { id: create.id },
          { id: read.id },
          { id: update.id },
          { id: delete_.id },
        ],
      },
    },
  });

  const teacher = await prisma.role.create({
    data: {
      id: 2,
      name: "teacher",
      permission: {
        connect: [{ id: read.id }, { id: update.id }, { id: delete_.id }],
      },
    },
  });

  const student = await prisma.role.create({
    data: {
      id: 3,
      name: "student",
      permission: {
        connect: [{ id: read.id }],
      },
    },
  });

  const parent = await prisma.role.create({
    data: {
      id: 4,
      name: "parent",
      permission: {
        connect: [{ id: read.id }],
      },
    },
  });

  // create user admin
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: admin.id,
    },
  });

  // create user teacher
  const teacherUser = await prisma.user.create({
    data: {
      email: "bayu@gmail.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: teacher.id,
    },
  });

  // create user student
  const studentUser = await prisma.user.create({
    data: {
      email: "tama@gmail.com",
      password: bcrypt.hashSync("P@ssw0rd", 12),
      roleID: student.id,
    },
  });

  // create staff admin
  const staff1 = await prisma.staff.create({
    data: {
      name: "Rudi Hartono",
      birthDate: new Date("1990-01-01"),
      address: "Jl. Sukaraja No. 1",
      phone: "081234567890",
      gender: "Laki-laki",
      religion: "Islam",
      photo: "",
      userId: adminUser.id,
    },
  });

  // create teacher
  const teacher1 = await prisma.teacher.create({
    data: {
      name: "Bayu Aji",
      birthDate: new Date("1990-01-01"),
      address: "Jl. Sukaraja No. 1",
      phone: "081234567890",
      gender: "Laki-laki",
      religion: "Islam",
      photo: "",
      userId: teacherUser.id,
    },
  });

  // create class
  const class1 = await prisma.class.create({
    data: {
      name: "XII RPL 1",
      teacherId: teacher1.id,
    },
  });

  // create payment
  const spp = await prisma.payment.create({
    data: {
      name: "SPP",
      type: "Semester",
      amount: 1000000,
    },
  });

  // create parent
  const parent1 = await prisma.parent.create({
    data: {
      name: "Tono",
      address: "Jl. Sukaraja No. 1",
      phone: "081234567890",
    },
  });

  // create student
  const student1 = await prisma.student.create({
    data: {
      name: "Tama",
      birthDate: new Date("1990-01-01"),
      address: "Jl. Sukaraja No. 1",
      gender: "Perempuan",
      religion: "Islam",
      photo: "",
      userId: studentUser.id,
      parentId: parent1.id,
      classId: class1.id,
    },
  });

  // create subject
  const subject1 = await prisma.subject.create({
    data: {
      name: "Bahasa Indonesia",
      teacherId: teacher1.id,
    },
  });

  // create score
  const score1 = await prisma.score.create({
    data: {
      studentId: student1.id,
      subjectId: subject1.id,
      score: 90,
    },
  });

  // create bill
  const bill1 = await prisma.bill.create({
    data: {
      studentId: student1.id,
      paymentMethod: "Cash",
    },
  });

  // create bill detail
  const billDetail1 = await prisma.billDetail.create({
    data: {
      billId: bill1.id,
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
