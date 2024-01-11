export interface ICommentData {
  id: number;
  name: string;
  comment: string;
  date: Date;
  parentId: number | null;
  level: number;
}

export interface IComment {
  id: number;
  name: string;
  comment: string;
  date: Date;
  parentId: number | null;
  replies: IComment[];
  level: number;
}

export enum SSKeys {
  COMMENTS_DATA = "COMMENTS_DATA",
  TREE_LEVEL = "TREE_LEVEL",
}
