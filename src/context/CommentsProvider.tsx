import { ICommentData } from "./../types";
import { ReactNode, useState } from "react";
import { CommentContext } from "./CommentsContext";
import { useSort } from "../hooks/useSort";

interface IProps {
  children: ReactNode;
}

const CommentsProvider = ({ children }: IProps) => {
  const [comments, setComments] = useState<ICommentData[]>([]);
  const { sortedItems, toggleSort, isASC } = useSort(comments, "date", true);

  const addComment = (comment: Omit<ICommentData, "id" | "date">) => {
    const id = Date.now();
    setComments((prev) => [...prev, { ...comment, id, date: new Date() }]);
  };

  const updateComment = (commentId: number, updatedComment: ICommentData) => {
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
      value={{
        comments: sortedItems,
        addComment,
        deleteComment,
        updateComment,
        toggleSort,
        isASC,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentsProvider;
