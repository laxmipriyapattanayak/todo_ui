import { Navigate, useParams } from "react-router-dom";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { APIStatus, fetchUserPost } from "../../store/todo.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";

export const UserPost = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPost } = useAppSelector((state) => state.todoSlice);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = () => {
    if (userId) dispatch(fetchUserPost(userId));
  };

  const createTodoClick = () => {
    navigate(`/user/${userId}/createTodo`);
  };

  return (
    <>
      post{userId}
      {userPost.status === APIStatus.PENDING && <CircularProgress />}
      <Button variant="contained" size="medium" onClick={createTodoClick}>
        Create New Todo
      </Button>
    </>
  );
};
