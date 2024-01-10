import { formatDate } from "../../helpers/dates";
import { IComment } from "../../types";
import styles from "./Comment.module.scss";
import deleteIcon from "../../assets/icons/delete.svg";
import { useComments } from "../../context/CommentsContext";

interface IProps {
  comment: IComment;
}

const Comment = ({ comment: { name, comment, date, id } }: IProps) => {
  const { deleteComment } = useComments();
  const handleDelete = () => deleteComment(id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.header}>
          <div>
            <strong>{name}</strong>
          </div>
          <div>{formatDate(date)}</div>
        </div>
        <div className={styles.comment}>{comment}</div>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>Reply</button>
        <button className={styles.btn}>Edit</button>
      </div>
      <button className={styles.delete} onClick={handleDelete}>
        <img src={deleteIcon} alt="delete" className={styles.icon} />
      </button>
    </div>
  );
};

export default Comment;
