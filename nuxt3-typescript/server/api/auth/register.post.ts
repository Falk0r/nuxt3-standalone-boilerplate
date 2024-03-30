import * as bcrypt from "bcrypt";
import {getUserByEmail, createUser} from "../../data/users.js";

export const SECRET = "dummy";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {email, password} = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "api.error.emailAndPasswordRequired",
    });
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const user = {
      email,
      password: hash,
    };

    const newUser = await createUser(user);
    return newUser;
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "api.error.userAlreadyExists",
    });
  }
});
