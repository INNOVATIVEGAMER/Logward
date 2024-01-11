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
    const prevData = getFromSessionStorage(SSKeys.COMMENTS_DATA);
    if (!prevData) return;

    const prevComments = JSON.parse(prevData) as ICommentData[];
    setComments(prevComments);
  }, []);

  const addComment = (comment: Omit<ICommentData, "id" | "date">) => {
    const id = Date.now();
    const updatedComments = [...comments, { ...comment, id, date: new Date() }];
    setComments(updatedComments);
    storeToSessionStorage(updatedComments, SSKeys.COMMENTS_DATA);
  };

  const updateComment = (commentId: number, updatedComment: ICommentData) => {
    const commentIndex = comments.findIndex((cm) => cm.id === commentId);
    if (commentIndex < 0) return;

    const updatedComments = structuredClone(comments);
    updatedComments[commentIndex] = updatedComment;
    setComments(updatedComments);
    storeToSessionStorage(updatedComments, SSKeys.COMMENTS_DATA);
  };

  const deleteComment = (commentId: number) => {
    const filteredComments = comments.filter(
      (cm) => cm.id !== commentId && cm.parentId !== commentId
    );

    setComments(filteredComments);
    storeToSessionStorage(filteredComments, SSKeys.COMMENTS_DATA);
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
