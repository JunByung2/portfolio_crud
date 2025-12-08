"use client";

import { Comment } from "@/types/comment";
import Link from "next/link";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h3 className="texe-2xl font-bold">{comment.who}</h3>
            <h3 className="text-2xl font-bold">{comment.comment}</h3>
            <p>Updated: {new Date(comment.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button id={comment._id} />
            <Link href={`/editComment/${comment._id}`}>수정</Link>
          </div>
        </div>
      ))}
    </>
  );
}
