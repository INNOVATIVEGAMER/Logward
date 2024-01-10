export interface IComment {
  id: number;
  name: string;
  comment: string;
  date: Date;
  parentId: number | null;
}