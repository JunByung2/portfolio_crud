"use client";

import createComment from "@/actions/commentAction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddComment() {
  const [who, setWho] = useState("");
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setWho(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createComment(comment, who);
      router.push("/");
    } catch (error) {
      console.error("저장 중 오류", error);
      alert("생성 중 오류 발생");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="hidden" value={who} />
      <input
        className="border border-slate-500 px-8 py-2"
        placeholder="내용을 입력하세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        type="submit"
        className="bg-[#FDD200] text-black py-3 font-bold px-4 w-fit rounded-md"
      >
        올리기
      </button>
    </form>
  );
}
