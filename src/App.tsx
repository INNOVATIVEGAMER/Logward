import styles from "./App.module.scss";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList.tsx/CommentList";
import { useComments } from "./context/CommentsContext";
import { createCommentTree } from "./helpers/utils";

function App() {
  const { comments } = useComments();
  const { commentTree } = createCommentTree(comments);

  return (
    <div className={styles.wrapper}>
      <CommentForm parentId={null} />
      <CommentList comments={commentTree} />
    </div>
  );
}

export default App;
