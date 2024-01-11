import { ChangeEvent, useState } from "react";
import styles from "./App.module.scss";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList.tsx/CommentList";
import { useComments } from "./context/CommentsContext";
import { createCommentTree } from "./helpers/utils";

function App() {
  const { comments, changeTreeLevel, treeLevel } = useComments();
  const { commentTree } = createCommentTree(comments);
  const [levelVal, setLevelVal] = useState<number | "">(treeLevel);

  const handleChangeTreeLevel = (e: ChangeEvent<HTMLInputElement>) => {
    const level = Number(e.target.value);

    if (!level) {
      setLevelVal("");
      return;
    }

    changeTreeLevel(level);
    setLevelVal(level);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.treeLevel}>
        <div className={styles.formGrp}>
          <label htmlFor="treeLevel">Set Comment Tree Level:</label>
          <input
            type="number"
            name="treeLevel"
            id="treeLevel"
            value={levelVal}
            onChange={handleChangeTreeLevel}
          />
        </div>
        <div className={styles.helperText}>
          Tree level specifies how deep the comment replies can go relative to
          base comment
        </div>
      </div>
      <CommentForm parentId={null} prevLevel={0} />
      <CommentList comments={commentTree} />
    </div>
  );
}

export default App;
