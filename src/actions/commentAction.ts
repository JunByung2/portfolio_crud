"use server";

import { convertDocToObj } from "@/libs/helpers";
import connectMongoDB from "@/libs/mongodb";
import Comment from "@/models/comment";
import { revalidatePath } from "next/cache";

//방명록 작성 : Create (POST)

export default async function createComment(comment: string, who: string) {
  try {
    await connectMongoDB();
    const doc = await Comment.create({ comment, who });
    revalidatePath("/");
    return { success: true, comment: convertDocToObj(doc) };
  } catch (error) {
    throw new Error(`방명록 작성에 실패하였습니다 : ${error}`);
  }
}

//방명록 수정 : Update (PUT)

export async function updateComment(id: string, comment: string) {
  try {
    await connectMongoDB();
    const doc = await Comment.findByIdAndUpdate(id, { comment }, { new: true });
    if (!doc) throw new Error("해당 글을 찾을 수 없습니다");
    revalidatePath("/");
    return { success: true, topic: convertDocToObj(doc) };
  } catch (error) {
    throw new Error(`수정에 실패하였습니다: ${error}`);
  }
}

// 모든 토픽 조회 (GET)
export async function getAllComments() {
  try {
    await connectMongoDB();
    const docs = await Comment.find({}).sort({ createdAt: -1 });
    const comments = docs.map((doc) => convertDocToObj(doc));
    return { success: true, comments };
  } catch (error) {
    throw new Error(`글 조회에 실패하였습니다 : ${error}`);
  }
}

//토픽 삭제 : DELETE
export async function deleteComment(id: string) {
  try {
    await connectMongoDB();
    const doc = await Comment.findByIdAndDelete(id);
    if (!doc) throw new Error("해당 글을 찾을 수 없습니다");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    throw new Error(`글 삭제에 실패하였습니다: ${error}`);
  }
}
