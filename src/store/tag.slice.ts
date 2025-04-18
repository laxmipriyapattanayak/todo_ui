import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Tag } from "../myApi";
import { APIStatus, IApiResponse } from "./todo.slice";

interface Istate {
  createTag: IApiResponse<Tag>;
}
interface CreateTagArgs {
  tagName: string;
  userId: string;
}

const initialState: Istate = {
  createTag: {
    data: { name: "", id: 0 },
    status: APIStatus.IDLE,
  },
};

const api = new Api({
  baseUrl:
    " https://todo-app.whitewater-d0b6f62a.westeurope.azurecontainerapps.io/todo",
});

export const createNewTag = createAsyncThunk(
  "tagSlice/createNewTag",
  async ({ userId, tagName }: CreateTagArgs) => {
    const res = await api.userId.tagsCreate(userId, { name: tagName });
    return res.data;
  }
);

export const tagSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createNewTag.pending, (state) => {
        state.createTag.status = APIStatus.PENDING;
      })
      .addCase(createNewTag.rejected, (state) => {
        state.createTag.status = APIStatus.FAILED;
      })
      .addCase(createNewTag.fulfilled, (state, action) => {
        state.createTag.status = APIStatus.FULFILLED;
        state.createTag.data = action.payload;
      });
  },
});

tagSlice.actions = { createNewTag };
export default tagSlice.reducer;
