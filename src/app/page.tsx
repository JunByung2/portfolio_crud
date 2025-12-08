import Image from "next/image";
import mainImage from "../image/2.webp";
import apple from "../image/apple.png";

import { auth } from "@/auth";
import CommentList from "@/components/commentList";
import { getAllComments } from "@/actions/commentAction";
import AddComment from "@/components/AddComment";

export default async function Home() {
  const session = await auth();
  const username = session?.user?.name || "방문자";
  const { comments } = await getAllComments();

  return (
    <div>
      <div className="mt-25 flex justify-center">
        <h1 className="font-bold  text-[#ffffff] text-5xl">
          Welcome, This Is Where My Story Begins
        </h1>
      </div>
      <div className="flex justify-center mt-5">
        <div>
          <Image
            src={mainImage}
            alt="mainimage"
            width={130}
            height={150}
            className="mt-15"
          />
          <div className="transform translate-x-40 -translate-y-30">
            <Image
              src={apple}
              alt="mainimage"
              width={50}
              height={70}
              className="mt-15"
            />
          </div>
          <h2 className="text-center font-semibold text-xl mt-5">
            {username}님 반갑습니다. 한 줄 쓰면 주인장이 춤춥니다.
          </h2>
          <CommentList comments={comments} />
          <AddComment />
        </div>
      </div>
    </div>
  );
}
