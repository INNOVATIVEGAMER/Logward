import styles from "./App.module.scss";
import Comment from "./components/Comment/Comment";
import CommentForm from "./components/CommentForm/CommentForm";

const comment: Comment = {
  id: 1,
  name: "Prasad",
  comment: "Test",
  date: new Date(),
  parentId: null,
};

function App() {
  return (
    <div className={styles.wrapper}>
      <CommentForm />
      <Comment comment={comment} />
    </div>
  );
}

export default App;
