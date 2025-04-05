import { Button, CircularProgress, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../component/Post/Post.component";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import CreateTodo from "../../component/CreateTodo/CreateTodo.component";
import { APIStatus, fetchUserPost } from "../../store/todo.slice";
import "./index.css";

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPost } = useAppSelector((state) => state.todoSlice);
  const createTodoStatus = useAppSelector(
    (state) => state.todoSlice.createTodo.status
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (userId) dispatch(fetchUserPost(userId));
  }, [userId]);

  useEffect(() => {
    if (userId && createTodoStatus === APIStatus.FULFILLED)
      dispatch(fetchUserPost(userId));
  }, [userId, createTodoStatus]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="parent">
      <div>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateTodo onClose={closeModal} />
        </Modal>
      </div>

      {userPost.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className="posts">
          <div className="user_name">
            <h1>User{userId}</h1>
          </div>

          {userPost.data.length > 0 ? (
            <>
              {" "}
              <div className="btn">
                <Button variant="contained" onClick={openModal}>
                  Add new
                </Button>
              </div>
              <div className="posts-wrapper">
                {userPost.data.map((post, index) => (
                  <Post task={post} key={index} />
                ))}
              </div>
            </>
          ) : (
            <p>No Data</p>
          )}
        </div>
      )}
    </div>
  );
};
