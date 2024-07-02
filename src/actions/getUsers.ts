import { db } from "../db";

export default async function getUser() {
  const users = await db.user.findMany({
    select: {
      id: true,
      userName: true,
      post: {
        where: {
          onlyMe: false,
        },
      },
    },
  });

  return users;
}
