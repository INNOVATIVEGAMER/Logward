import { formatDate } from "../../helpers/dates";
import { IComment } from "../../types";
import styles from "./Comment.module.scss";
import deleteIcon from "../../assets/icons/delete.svg";
import { useComments } from "../../context/CommentsContext";
import { ChangeEvent, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";

interface IProps {
  comment: IComment;
}

const Comment = ({
  comment: { name, comment, date, id, parentId },
}: IProps) => {
  const { deleteComment, updateComment } = useComments();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [updatedCommentText, setUpdatedCommentText] = useState<string>(comment);

  const toggleEdit = () => setIsEditing((prev) => !prev);
  const toggleReply = () => setIsReplying((prev) => !prev);

  const handleDelete = () => deleteComment(id);
  const handleUpdate = () => {
    updateComment(id, {
      id,
      name,
      date,
      parentId,
      comment: updatedCommentText,
    });
    setIsEditing(false);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setUpdatedCommentText(e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.header}>
            <div>
              <strong>{name}</strong>
            </div>
            <div>{formatDate(date)}</div>
          </div>
          {!isEditing && <div className={styles.comment}>{comment}</div>}
          {isEditing && (
            <textarea
              name="comment"
              id="comment"
              className={styles.input}
              placeholder={parentId !== null ? "Reply" : "Comment"}
              defaultValue={comment}
              onChange={handleCommentChange}
            ></textarea>
          )}
        </div>
        <div className={styles.btns}>
          {parentId === null && (
            <button className={styles.btn} onClick={toggleReply}>
              {isReplying ? "Cancel Reply" : "Reply"}
            </button>
          )}
          <button className={styles.btn} onClick={toggleEdit}>
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
          {isEditing && (
            <button
              className={styles.btn}
              onClick={handleUpdate}
              disabled={updatedCommentText === comment}
            >
              Update
            </button>
          )}
        </div>
        <button className={styles.delete} onClick={handleDelete}>
          <img src={deleteIcon} alt="delete" className={styles.icon} />
        </button>
      </div>
      {isReplying && (
        <div className={styles.replyForm}>
          <CommentForm parentId={id} toggleReply={toggleReply} />
        </div>
      )}
    </div>
  );
};

export default Comment;
