import {
  Button,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../component/Post/Post.component";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import CreateTodo from "../../component/CreateTodo/CreateTodo.component";
import { APIStatus, DateFilter, fetchUserPost } from "../../store/todo.slice";
import "./index.css";
import { Task, TaskStatus } from "../../myApi";
import CreateTag from "../../component/CreateTag/CreateTag.component";
import { tags } from "../../store/tag.slice";

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
  type ModalType = "CREATE_TODO" | "CREATE_TAG" | null;
  const [modalType, setModalType] = useState<ModalType>(null);

  //const [open, setOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<DateFilter>(DateFilter.All);
  const initialData = {
    description: "",
    title: "",
    date: "",
    status: TaskStatus.PENDING,
    tags: [],
  };

  const [editModalData, setEditModalData] = useState<Task>(initialData);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPost({ userId }));
      dispatch(tags(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (
        createTodoStatus === APIStatus.FULFILLED ||
        updateTodoStatus === APIStatus.FULFILLED ||
        deleteTodoStatus === APIStatus.FULFILLED
      ) {
        dispatch(fetchUserPost({ userId }));
      }

      if (updateTodoStatus === APIStatus.FULFILLED) {
        closeModal();
      }
    }
  }, [userId, createTodoStatus, updateTodoStatus, deleteTodoStatus]);

  const openModal = (type: ModalType) => {
    setModalType(type);
    //setOpen(true);
  };
  const closeModal = () => {
    //setOpen(false);
    setModalType(null);
    setEditModalData(initialData);
  };

  const openEditModal = (task: Task) => {
    console.log("open edit modal", task);
    setEditModalData(task);
    openModal("CREATE_TODO");
  };

  const handleDateFilterChange = (e: any) => {
    setFilter(e.target.value);
    dispatch(fetchUserPost({ userId: userId!, fil: e.target.value }));
  };

  return (
    <div className="parent">
      <div>
        <Modal
          open={modalType === "CREATE_TODO"}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateTodo onClose={closeModal} data={editModalData} />
        </Modal>

        <CreateTag open={modalType === "CREATE_TAG"} onClose={closeModal} />

        {/* <CreateTodo onClose={closeModal} data={editModalData} /> */}
      </div>

      {userPost.status === APIStatus.PENDING ? (
        <CircularProgress />
      ) : (
        <div className="posts">
          <div className="user_name">
            <h1>User{userId}</h1>
          </div>

          <div className="btn">
            <Button variant="contained" onClick={() => openModal("CREATE_TAG")}>
              Create Tag
            </Button>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Age"
              onChange={handleDateFilterChange}
              size="small"
            >
              <MenuItem value={DateFilter.All}>All</MenuItem>
              <MenuItem value={DateFilter.TODAY_TODO}>Today</MenuItem>
              <MenuItem value={DateFilter.TOMORROW_TODO}>Tomorrow</MenuItem>
              <MenuItem value={DateFilter.CURRENT_WEEK_TODO}>
                Current week
              </MenuItem>
              <MenuItem value={DateFilter.NEXT_WEEK_TODO}>Next week</MenuItem>
            </Select>
            <Button
              variant="contained"
              onClick={() => openModal("CREATE_TODO")}
            >
              Add new
            </Button>
          </div>

          {userPost.data.length > 0 ? (
            <>
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
