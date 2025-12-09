"use client";

import { deleteComment, updateComment } from "@/actions/commentAction";
import { Comment } from "@/types/comment";
import { useState } from "react";
import { useSession } from "next-auth/react";
interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: session } = useSession();

  return (
    <>
      {comments.map((comment) => {
        const isOwner = session?.user?.name === comment.who;

        return (
          <div
            key={comment._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h3 className="text-xl font-bold">{comment.who}</h3>

              {/* 수정 모드 */}
              {editId === comment._id ? (
                <form
                  action={async () => {
                    const res = await updateComment(comment._id, editValue);
                    if (res.success) {
                      alert("수정 완료!");
                      setEditId(null);
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border p-1"
                  />
                  <button type="submit" className="text-green-600 font-bold">
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="text-gray-600"
                  >
                    취소
                  </button>
                </form>
              ) : (
                <h3 className="text-2xl font-bold">{comment.comment}</h3>
              )}

              <p>Updated: {new Date(comment.createdAt).toLocaleString()}</p>
            </div>

            {isOwner && editId !== comment._id && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditId(comment._id);
                    setEditValue(comment.comment);
                  }}
                  className="border p-1"
                >
                  수정
                </button>

                {/* 삭제 */}
                <form
                  action={async () => {
                    const ok = confirm("정말 삭제하시겠습니까?");
                    if (!ok) return;

                    const res = await deleteComment(comment._id);
                    if (res.success) alert("삭제 완료!");
                  }}
                >
                  <button type="submit" className="border p-1">
                    삭제
                  </button>
                </form>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
