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
