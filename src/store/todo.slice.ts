import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Task, TaskUpdate } from "../myApi";

export enum APIStatus {
  PENDING,
  FULFILLED,
  FAILED,
  IDLE,
}
export enum DateFilter {
  TODAY_TODO = "TODAY_TODO",
  TOMORROW_TODO = "TOMORROW_TODO",
  CURRENT_WEEK_TODO = "CURRENT_WEEK_TODO",
  LAST_WEEK_TODO = "LAST_WEEK_TODO",
  NEXT_WEEK_TODO = "NEXT_WEEK_TODO",
  LAST_MONTH = "LAST_MONTH",
  CURRENT_MONTH = "CURRENT_MONTH",
  NEXT_MONTH = "NEXT_MONTH",
  All = "All",
}

export interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface Istate {
  userPost: IApiResponse<Task[]>;
  createTodo: IApiResponse<Task>;
  updateTodo: IApiResponse<Task>;
  deleteTodo: IApiResponse<null>;
}

interface CreateTodoArgs {
  userId: string;
  todo: Task;
}

const api = new Api({
  baseUrl:
    " https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

const initialState: Istate = {
  userPost: { data: [], status: APIStatus.IDLE },
  createTodo: {
    data: { title: "", tags: [], date: "" },
    status: APIStatus.IDLE,
  },
  updateTodo: {
    data: { title: "", tags: [], date: "" },
    status: APIStatus.IDLE,
  },
  deleteTodo: { data: null, status: APIStatus.IDLE },
};

export const fetchUserPost = createAsyncThunk(
  "todoSlice/fetchUserPost",
  async ({ userId, fil }: { userId: string; fil?: DateFilter }) => {
    if (fil && fil !== DateFilter.All) {
      const res = await api.userId.tasksDetail(userId, { filter: fil });
      return res.data;
    } else {
      const res = await api.userId.tasksDetail(userId);
      return res.data;
    }
  }
);

export const createNewTodo = createAsyncThunk(
  "todoSlice/createNewTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    const res = await api.userId.tasksCreate(userId, todo);
    return res.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todoSlice/updateTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    const updatedData: TaskUpdate = { ...todo, taskId: todo.taskId! };
    const res = await api.userId.tasksUpdate(todo.taskId!, userId, updatedData);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todoSlice/deleteTodo",
  async ({ userId, todo }: CreateTodoArgs) => {
    await api.userId.tasksDelete(todo.taskId!, userId);
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //fetch user Todo
      .addCase(fetchUserPost.pending, (state) => {
        state.userPost.status = APIStatus.PENDING;
      })
      .addCase(fetchUserPost.rejected, (state) => {
        state.userPost.status = APIStatus.FAILED;
        state.userPost.error = "some error has occured";
      })
      .addCase(fetchUserPost.fulfilled, (state, action) => {
        state.userPost.status = APIStatus.FULFILLED;
        state.userPost.data = action.payload;
      })
      //create Todo
      .addCase(createNewTodo.pending, (state) => {
        state.createTodo.status = APIStatus.PENDING;
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.createTodo.status = APIStatus.FAILED;
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.createTodo.status = APIStatus.FULFILLED;
        state.createTodo.data = action.payload;
      })
      //update Todo
      .addCase(updateTodo.pending, (state) => {
        state.updateTodo.status = APIStatus.PENDING;
      })
      .addCase(updateTodo.rejected, (state) => {
        state.updateTodo.status = APIStatus.FAILED;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodo.status = APIStatus.FULFILLED;
        state.updateTodo.data = action.payload;
      })
      //delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodo.status = APIStatus.PENDING;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.deleteTodo.status = APIStatus.FAILED;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.deleteTodo.status = APIStatus.FULFILLED;
      });
  },
});

todoSlice.actions = { fetchUserPost, createNewTodo, updateTodo, deleteTodo };
export default todoSlice.reducer;
