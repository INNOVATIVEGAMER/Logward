import styles from "./App.module.scss";
import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList.tsx/CommentList";
import CommentsProvider from "./context/CommentsProvider";

function App() {
  return (
    <div className={styles.wrapper}>
      <CommentsProvider>
        <CommentForm />
        <CommentList />
      </CommentsProvider>
    </div>
  );
}

export default App;
