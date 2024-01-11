import { ICommentData, SSKeys } from "./../types";
import { ReactNode, useEffect, useState } from "react";
import { CommentContext } from "./CommentsContext";
import { useSort } from "../hooks/useSort";
import { getFromSessionStorage, storeToSessionStorage } from "../helpers/utils";

interface IProps {
  children: ReactNode;
}

const CommentsProvider = ({ children }: IProps) => {
  const [comments, setComments] = useState<ICommentData[]>([]);
  const { sortedItems, toggleSort, isASC } = useSort(comments, "date", true);

  useEffect(() => {
    if (comments.length === 0) {
      const prevData = getFromSessionStorage(SSKeys.COMMENTS_DATA);
      if (!prevData) return;

      const prevComments = JSON.parse(prevData) as ICommentData[];
      setComments(prevComments);
      return;
    }

    storeToSessionStorage(comments, SSKeys.COMMENTS_DATA);
  }, [comments]);

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
