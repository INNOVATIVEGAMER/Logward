import { createContext, useContext } from "react";
import { ICommentData } from "../types";

interface CommentContextData {
  comments: ICommentData[];
  addComment: (comment: Omit<ICommentData, "id" | "date">) => void;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, updatedComment: ICommentData) => void;
  toggleSort: () => void;
  isASC: boolean;
}

const initialState: CommentContextData = {
  comments: [],
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
  toggleSort: () => {},
  isASC: true,
};

export const CommentContext = createContext<CommentContextData>(initialState);
export const useComments = () => useContext(CommentContext);
