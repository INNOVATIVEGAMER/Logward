import { useComments } from "../../context/CommentsContext";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.scss";

const CommentList = () => {
  const { comments } = useComments();
  return (
    <div className={styles.wrapper}>
      {comments.map((cm) => (
        <div key={cm.id}>
          <Comment comment={cm} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
