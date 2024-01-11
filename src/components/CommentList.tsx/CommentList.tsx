import { IComment } from "../../types";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.scss";

interface IProps {
  comments: IComment[];
}

const CommentList = ({ comments }: IProps) => {
  if (comments.length === 0) return <></>;

  return (
    <div className={styles.wrapper}>
      {comments.map((cm) => (
        <div className={styles.parent} key={cm.id}>
          <Comment comment={cm} />
          <div className={styles.replies}>
            <CommentList comments={cm.replies} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
