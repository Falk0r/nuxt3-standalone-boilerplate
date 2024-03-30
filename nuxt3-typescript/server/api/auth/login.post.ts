import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import credentialValidation from "../../validation/validation";
import {getUserByEmail} from "../../data/users";
import {createError} from "h3";

const refreshTokens: Record<number, Record<string, any>> = {};
export const SECRET = "dummy";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {email, password} = body;

  await credentialValidation(email, password);

  const user = await getUserByEmail(email);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "api.error.userNotFound",
    });
  }
  const isMatch = await bcrypt.compare(password, user?.password);

  if (isMatch) {
    const refreshToken =
      Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1;
    const accessToken = jwt.sign({email}, SECRET, {expiresIn: 3600});
    refreshTokens[refreshToken] = {
      accessToken,
      user,
    };

    return {
      token: {
        accessToken,
        refreshToken,
      },
    };
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: "api.error.wrongPassword",
    });
  }
});
