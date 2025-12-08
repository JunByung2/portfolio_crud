import { Comment } from "@/types/comment";

export function convertDocToObj(doc: Comment) {
  return {
    _id: doc._id.toString(),
    comment: doc.comment,
    who: doc.who,
    createdAt: doc.createdAt || "",
    updatedAt: doc.updatedAt || "",
  };
}
