import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, TaskRequest } from "../myApi";

export enum APIStatus {
  PENDING,
  FULFILLED,
  FAILED,
  IDLE,
}
interface CreateTodoArgs {
  userId: string;
  todo: {
    title: string;
    description: string;
    status: string;
    date: string;
    time: string;
  };
}

interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface Istate {
  createTodo: IApiResponse<TaskRequest>;
}

const api = new Api({
  baseUrl:
    " https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

const initialState: Istate = {
  createTodo: { data: { title: "", date: "" }, status: APIStatus.IDLE },
};

export const createNewTodo = createAsyncThunk(
  "createTodoSlice/createNewTodo",
  async ({ userId, todo }: CreateTodoArgs, { rejectWithValue }) => {
    try {
      const res = await api.userId.tasksCreate(userId, todo);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTodoSlice = createSlice({
  name: "createTodo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createNewTodo.pending, () => {})
      .addCase(createNewTodo.rejected, () => {})
      .addCase(createNewTodo.fulfilled, () => {});
  },
});

createTodoSlice.actions = { createNewTodo };
export default createTodoSlice.reducer;
