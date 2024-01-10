import { IComment } from "./../types";
import { ReactNode, useState } from "react";
import { CommentContext } from "./CommentsContext";

interface IProps {
  children: ReactNode;
}

const CommentsProvider = ({ children }: IProps) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const addComment = (comment: Omit<IComment, "id" | "date">) => {
    const id = Date.now();
    setComments((prev) => [...prev, { ...comment, id, date: new Date() }]);
  };

  const updateComment = (commentId: number, updatedComment: IComment) => {
    const commentIndex = comments.findIndex((cm) => cm.id === commentId);
    if (commentIndex < 0) return;

    const updatedComments = structuredClone(comments);
    updatedComments[commentIndex] = updatedComment;
    setComments(updatedComments);
  };

  const deleteComment = (commentId: number) => {
    const filteredComments = comments.filter(
      (cm) => cm.id !== commentId && cm.parentId !== commentId
    );

    setComments(filteredComments);
  };

  return (
    <CommentContext.Provider
      value={{ comments, addComment, deleteComment, updateComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentsProvider;
