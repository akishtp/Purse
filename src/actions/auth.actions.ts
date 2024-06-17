"use server";

import { hash, verify } from "@node-rs/argon2";
import { LoginSchema, SignupSchema } from "@/types";
import { generateIdFromEntropySize } from "lucia";
import { z } from "zod";
import db from "@/server/db";
import { accountTable, userTable } from "@/server/db/schema";
import { lucia, validateRequest } from "@/server/lucia";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const hashedPassword = await hash(values.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(16);
  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        name: values.name,
        hashedPassword,
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
      });

    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    await db.insert(accountTable).values({
      userId: userId,
      name: "CASH",
      balance: 0,
      color: "bg-[#2481de]",
      createdAt: new Date(),
    });

    return {
      success: "Signed up successfully",
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    LoginSchema.parse(values);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.name, values.name),
  });

  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  if (!existingUser.hashedPassword) {
    return {
      error: "User not found",
    };
  }

  const isValidPassword = await verify(
    existingUser.hashedPassword,
    values.password,
    {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    }
  );

  if (!isValidPassword) {
    return {
      error: "Incorrect name or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return {
    success: "Logged in successfully",
  };
};

export const logout = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: "Unauthorized",
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    console.log(error);

    return {
      error: error?.message,
    };
  }
};
