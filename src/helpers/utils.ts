import { IComment, ICommentData } from "../types";

type commentTableType = {
  [key in number]: IComment;
};

export const createCommentTree = (commentsArr: ICommentData[]) => {
  const commentTable: commentTableType = {};
  commentsArr.forEach((a) => (commentTable[a.id] = { ...a, replies: [] }));

  const commentTree: IComment[] = [];
  commentsArr.forEach((a) => {
    if (a.parentId !== null)
      commentTable[a.parentId].replies.push(commentTable[a.id]);
    else commentTree.push(commentTable[a.id]);
  });

  return { commentTree };
};
