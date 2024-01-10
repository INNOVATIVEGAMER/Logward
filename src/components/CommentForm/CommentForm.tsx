import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CommentForm.module.scss";
import { useComments } from "../../context/CommentsContext";
import { IComment } from "../../types";

const CommentForm = () => {
  const { addComment } = useComments();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handlePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name")?.toString();
    const comment = formData.get("comment")?.toString();

    if (!name || !comment) {
      setIsError(true);
      return;
    }

    const commentData: Omit<IComment, "id" | "date"> = {
      name,
      comment,
      parentId: null,
    };

    addComment(commentData);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setIsDirty(true);
      setIsError(false);
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setIsDirty(true);
      setIsError(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Comment</div>
      <form className={styles.inputs} onSubmit={handlePost}>
        <input
          type="text"
          name="name"
          id="name"
          className={styles.input}
          placeholder="Name"
          onChange={handleNameChange}
        />
        <textarea
          name="comment"
          id="comment"
          className={styles.input}
          placeholder="Comment"
          onChange={handleCommentChange}
        ></textarea>

        {isError && (
          <div className={styles.error}>Please enter name and comment</div>
        )}
        <button
          className={styles.btn}
          type="submit"
          disabled={!isDirty || isError}
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
