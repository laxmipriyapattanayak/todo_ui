import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Task } from "../myApi";

export enum APIStatus {
  PENDING,
  FULFILLED,
  FAILED,
  IDLE,
}

interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface Istate {
  userPost: IApiResponse<Task[]>;
}

const api = new Api({
  baseUrl:
    "https://todo-app.proudforest-fddd498f.westeurope.azurecontainerapps.io/todo",
});

const initialState: Istate = {
  userPost: { data: [], status: APIStatus.IDLE },
};

export const fetchUserPost = createAsyncThunk(
  "todoSlice/fetchUserPost",
  async (userId: string) => {
    const res = await api.userId.tasksDetail(userId);
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserPost.pending, () => {})
      .addCase(fetchUserPost.rejected, () => {})
      .addCase(fetchUserPost.fulfilled, () => {});
  },
});

todoSlice.actions = { fetchUserPost };
export default todoSlice.reducer;
