import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Task, TaskUpdate } from "../myApi";

export enum APIStatus {
  PENDING,
  FULLFILLED,
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
  ALL = "ALL",
}

export interface IApiResponse<T> {
  data: T;
  error?: string;
  status: APIStatus;
}

interface IState {
  userPosts: IApiResponse<Task[]>;
  createTodo: IApiResponse<Task>;
  updateTodo: IApiResponse<Task>;
  deleteTodo: IApiResponse<null>;
  notifications: IApiResponse<Task[]>;
}

interface CreateTodoArgs {
  userId: string;
  todo: Task;
}

const api = new Api({
  baseUrl:
    "https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

const initialState: IState = {
  userPosts: { data: [], status: APIStatus.IDLE },
  createTodo: {
    data: {
      title: "",
      tags: [],
      date: "",
    },
    status: APIStatus.IDLE,
  },
  updateTodo: {
    data: { title: "", tags: [], date: "" },
    status: APIStatus.IDLE,
  },
  deleteTodo: { data: null, status: APIStatus.IDLE },
  notifications: { data: [], status: APIStatus.IDLE },
};

export const fetchUserPosts = createAsyncThunk(
  "todoSlice/fetchUserPosts",
  async ({ userId, fil }: { userId: string; fil?: DateFilter }) => {
    console.log(userId, fil);
    if (fil && fil !== DateFilter.ALL) {
      const res = await api.userId.tasksDetail(userId, {
        filter: fil,
      });
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
export const fetchNotifications = createAsyncThunk(
  "todoSlice/fetchNotifications",
  async (userId: number) => {
    const res = await api.userId.notificationDetail(userId);
    //console.log(res.data);
    return res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //fetch user posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.userPosts.status = APIStatus.PENDING;
      })
      .addCase(fetchUserPosts.rejected, (state) => {
        state.userPosts.status = APIStatus.FAILED;
        state.userPosts.error = "Some Error Occured";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts.status = APIStatus.FULLFILLED;
        state.userPosts.data = action.payload;
      })
      //create todo
      .addCase(createNewTodo.pending, (state) => {
        state.createTodo.status = APIStatus.PENDING;
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.createTodo.status = APIStatus.FAILED;
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.createTodo.status = APIStatus.FULLFILLED;
        state.createTodo.data = action.payload;
      })
      //update
      .addCase(updateTodo.pending, (state) => {
        state.updateTodo.status = APIStatus.PENDING;
      })
      .addCase(updateTodo.rejected, (state) => {
        state.updateTodo.status = APIStatus.FAILED;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.updateTodo.status = APIStatus.FULLFILLED;
        state.updateTodo.data = action.payload;
      })
      //delete
      .addCase(deleteTodo.pending, (state) => {
        state.deleteTodo.status = APIStatus.PENDING;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.deleteTodo.status = APIStatus.FAILED;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.deleteTodo.status = APIStatus.FULLFILLED;
      })
      //fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.notifications.status = APIStatus.PENDING;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.notifications.status = APIStatus.FAILED;
        state.notifications.error = "Some Error Occured";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications.status = APIStatus.FULLFILLED;
        state.notifications.data = action.payload;
      });
  },
});

todoSlice.actions = {
  fetchUserPosts,
  createNewTodo,
  updateTodo,
  fetchNotifications,
};

export default todoSlice.reducer;
