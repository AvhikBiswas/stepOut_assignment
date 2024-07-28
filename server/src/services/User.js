import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../client/prismaClient.js";

const SECRET = process.env.JWT_SECRET;
console.log("SECRET", SECRET);

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("name ,email ,password", name, email, hashedPassword);
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET, {
    expiresIn: "1h",
  });
  return token;
};
