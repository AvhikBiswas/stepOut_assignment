import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../client/prismaClient";

const SECRET = process.env.JWT_SECRET;

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });
  return token;
};
