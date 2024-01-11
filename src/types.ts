export interface ICommentData {
  id: number;
  name: string;
  comment: string;
  date: Date;
  parentId: number | null;
}

export interface IComment {
  id: number;
  name: string;
  comment: string;
  date: Date;
  parentId: number | null;
  replies: IComment[];
}

export enum SSKeys {
  COMMENTS_DATA = "COMMENTS_DATA",
}
