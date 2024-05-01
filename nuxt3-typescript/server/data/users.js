import prisma from './prisma';

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: String(email),
    },
  });
  return user;
}

export async function createUser(data) {
  const user = await prisma.user.create({
    data,
  });
  return user;
}
