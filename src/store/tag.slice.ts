import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Tag, TagUpdate, Task } from "../myApi";
import { APIStatus, IApiResponse } from "./todo.slice";

interface Istate {
  createTag: IApiResponse<Tag>;
  allTags: IApiResponse<Tag[]>;
  taskByTag: IApiResponse<Task[]>;
  updateTag: IApiResponse<Tag>;
  deleteTag: IApiResponse<Tag>;
}
interface CreateTagArgs {
  tagName: string;
  userId: string;
}

interface UpdateTagArgs {
  userId: string;
  tagId: number;
  tagName: string;
}

const initialState: Istate = {
  allTags: {
    data: [],
    status: APIStatus.IDLE,
  },
  createTag: {
    data: { name: "", id: 0 },
    status: APIStatus.IDLE,
  },
  taskByTag: {
    data: [],
    status: APIStatus.IDLE,
  },
  updateTag: {
    data: { name: "", id: 0 },
    status: APIStatus.IDLE,
  },
  deleteTag: {
    data: { name: "", id: 0 },
    status: APIStatus.IDLE,
  },
};

const api = new Api({
  baseUrl:
    " https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

export const tags = createAsyncThunk(
  "tagSlice/getAllTag",
  async (userId: string) => {
    const res = await api.userId.tagsDetail(userId);
    return res.data;
  }
);
export const getTaskByTag = createAsyncThunk(
  "tagSlice/taskByTag",
  async ({ userId, tagId }: { userId: string; tagId: string }) => {
    const res = await api.userId.tasksDetail3(Number(userId), Number(tagId));
    return res.data;
  }
);

export const createNewTag = createAsyncThunk(
  "tagSlice/createNewTag",
  async ({ userId, tagName }: CreateTagArgs) => {
    const res = await api.userId.tagsCreate(userId, { name: tagName });
    return res.data;
  }
);

export const deleteTag = createAsyncThunk(
  "tagSlice/deleteTag",
  async ({ tagId, userId }: { userId: string; tagId: number }) => {
    await api.userId.tagsDelete(tagId, userId);
  }
);

export const updateTag = createAsyncThunk(
  "tagSlice/updateTag",
  async ({ userId, tagId, tagName }: UpdateTagArgs) => {
    const updatedTag: TagUpdate = { id: tagId, name: tagName };
    const res = await api.userId.tagsUpdate(tagId, userId, updatedTag);
    return res.data;
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //create tag
    builder
      .addCase(createNewTag.pending, (state) => {
        state.createTag.status = APIStatus.PENDING;
      })
      .addCase(createNewTag.rejected, (state) => {
        state.createTag.status = APIStatus.FAILED;
      })
      .addCase(createNewTag.fulfilled, (state, action) => {
        state.createTag.status = APIStatus.FULLFILLED;
        state.createTag.data = action.payload;
      })
      //display tags
      .addCase(tags.pending, (state) => {
        state.allTags.status = APIStatus.PENDING;
      })
      .addCase(tags.rejected, (state) => {
        state.allTags.status = APIStatus.FAILED;
      })
      .addCase(tags.fulfilled, (state, action) => {
        state.allTags.status = APIStatus.FULLFILLED;
        state.allTags.data = action.payload;
      })
      //display posts by tag id
      .addCase(getTaskByTag.pending, (state) => {
        state.taskByTag.status = APIStatus.PENDING;
      })
      .addCase(getTaskByTag.rejected, (state) => {
        state.taskByTag.status = APIStatus.FAILED;
      })
      .addCase(getTaskByTag.fulfilled, (state, action) => {
        state.taskByTag.status = APIStatus.FULLFILLED;
        state.taskByTag.data = action.payload;
      })
      //update tag
      .addCase(updateTag.pending, (state) => {
        state.updateTag.status = APIStatus.PENDING;
      })
      .addCase(updateTag.rejected, (state) => {
        state.updateTag.status = APIStatus.FAILED;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.updateTag.status = APIStatus.FULLFILLED;
        state.updateTag.data = action.payload;
      })
      //delete tag
      .addCase(deleteTag.pending, (state) => {
        state.deleteTag.status = APIStatus.PENDING;
      })
      .addCase(deleteTag.rejected, (state) => {
        state.deleteTag.status = APIStatus.FAILED;
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.deleteTag.status = APIStatus.FULLFILLED;
      });
  },
});

tagSlice.actions = { createNewTag, tags, getTaskByTag, updateTag, deleteTag };
export default tagSlice.reducer;
