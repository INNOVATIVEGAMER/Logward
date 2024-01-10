import { createContext, useContext } from "react";
import { IComment } from "../types";

interface CommentContextData {
  comments: IComment[];
  addComment: (comment: Omit<IComment, "id" | "date">) => void;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, updatedComment: IComment) => void;
}

const initialState: CommentContextData = {
  comments: [],
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
};

export const CommentContext = createContext<CommentContextData>(initialState);
export const useComments = () => useContext(CommentContext);
