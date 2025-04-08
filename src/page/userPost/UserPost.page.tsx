import { Button, CircularProgress, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../component/Post/Post.component";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import CreateTodo from "../../component/CreateTodo/CreateTodo.component";
import { APIStatus, fetchUserPost } from "../../store/todo.slice";
import "./index.css";
import { Task, TaskStatus } from "../../myApi";

export const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPost } = useAppSelector((state) => state.todoSlice);
  const createTodoStatus = useAppSelector(
    (state) => state.todoSlice.createTodo.status
  );
  const updateTodoStatus = useAppSelector(
    (state) => state.todoSlice.updateTodo.status
  );
  const deleteTodoStatus = useAppSelector(
    (state) => state.todoSlice.deleteTodo.status
  );
  const [open, setOpen] = useState<boolean>(false);
  const initialData = {
    description: "",
    title: "",
    date: "",
    status: TaskStatus.PENDING,
    tags: [],
  };

  const [editModalData, setEditModalData] = useState<Task>(initialData);

  useEffect(() => {
    if (userId) dispatch(fetchUserPost(userId));
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (
        createTodoStatus === APIStatus.FULFILLED ||
        updateTodoStatus === APIStatus.FULFILLED
      ) {
        dispatch(fetchUserPost(userId));
      }

      if (updateTodoStatus === APIStatus.FULFILLED) {
        closeModal();
      }
      if (deleteTodoStatus === APIStatus.FULFILLED) {
        dispatch(fetchUserPost(userId));
      }
    }
  }, [userId, createTodoStatus, updateTodoStatus, deleteTodoStatus]);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setEditModalData(initialData);
  };

  const openEditModal = (task: Task) => {
    console.log("open edit modal", task);
    setEditModalData(task);
    openModal();
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
          <CreateTodo onClose={closeModal} data={editModalData} />
        </Modal>
      </div>

      {userPost.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className="posts">
          <div className="user_name">
            <h1>User{userId}</h1>
          </div>
          <div className="btn">
            <Button variant="contained" onClick={openModal}>
              Add new
            </Button>
          </div>

          {userPost.data.length > 0 ? (
            <>
              {" "}
              {/* <Button variant="contained" onClick={openModal}>
                  Add new
                </Button> */}
              <div className="posts-wrapper">
                {userPost.data.map((post, index) => (
                  <Post task={post} key={index} openEditModal={openEditModal} />
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
