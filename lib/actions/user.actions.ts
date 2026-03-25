"use server";

import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

const getPrimaryEmailAddress = (clerkUser: any) => {
  return (
    clerkUser.emailAddresses?.find(
      (email: any) => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ||
    clerkUser.emailAddresses?.[0]?.emailAddress ||
    ""
  );
};

const generateUniqueUsername = async (
  clerkUser: any,
  email: string,
  clerkId: string
) => {
  const rawUsername =
    clerkUser.username ||
    email.split("@")[0] ||
    `${clerkUser.firstName || "user"}${clerkUser.lastName || ""}` ||
    `user_${clerkId.slice(-8)}`;

  const sanitizedUsername = rawUsername.toLowerCase().replace(/[^a-z0-9]/g, "");
  const baseUsername =
    sanitizedUsername || `user${clerkId.slice(-8).toLowerCase()}`;

  const existingUser = await User.findOne({ username: baseUsername });

  if (!existingUser) return baseUsername;

  return `${baseUsername}_${clerkId.slice(-6).toLowerCase()}`;
};

const syncUserFromClerk = async (clerkId: string) => {
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email = getPrimaryEmailAddress(clerkUser);

  if (!email) {
    throw new Error("Unable to sync user without an email address");
  }

  const username = await generateUniqueUsername(clerkUser, email, clerkId);

  return User.findOneAndUpdate(
    { clerkId },
    {
      clerkId,
      email,
      username,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      photo: clerkUser.imageUrl || "",
    },
    { new: true, upsert: true }
  );
};

const buildSafeUsername = (user: {
  username?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  clerkId: string;
}) => {
  const rawUsername =
    user.username ||
    user.email.split("@")[0] ||
    `${user.firstName || "user"}${user.lastName || ""}` ||
    `user_${user.clerkId.slice(-8)}`;

  const sanitizedUsername = rawUsername.toLowerCase().replace(/[^a-z0-9]/g, "");

  return sanitizedUsername || `user${user.clerkId.slice(-8).toLowerCase()}`;
};

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create({
      ...user,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      username: buildSafeUsername(user),
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await syncUserFromClerk(userId);
    }

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
