import { useParams } from "react-router-dom";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { APIStatus, fetchUserPost } from "../../store/todo.slice";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export const UserPost = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { userPost } = useAppSelector((state) => state.todoSlice);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = () => {
    if (userId) dispatch(fetchUserPost(userId));
  };

  return (
    <>
      post{userId}
      {userPost.status === APIStatus.PENDING && <CircularProgress />}
    </>
  );
};
