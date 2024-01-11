import { useComments } from "../../context/CommentsContext";
import { IComment } from "../../types";
import Comment from "../Comment/Comment";
import styles from "./CommentList.module.scss";
import upArrow from "../../assets/icons/upArrow.svg";
import { useMemo } from "react";

interface IProps {
  comments: IComment[];
}

const CommentList = ({ comments }: IProps) => {
  const { toggleSort, isASC } = useComments();

  const isTopMostLevel = useMemo(
    () => comments.every((cm) => cm.parentId === null),
    [comments]
  );

  if (comments.length === 0) return <></>;

  return (
    <div className={styles.wrapper}>
      {isTopMostLevel && (
        <button className={styles.sort} onClick={toggleSort}>
          <div className={styles.text}>Sort By: Date and Time</div>{" "}
          <img
            src={upArrow}
            alt="arrow"
            className={`${styles.arrow} ${isASC ? styles.down : styles.up}`}
          />
        </button>
      )}
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
