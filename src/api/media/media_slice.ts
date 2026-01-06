import { createSlice } from '@reduxjs/toolkit';

export type StateType = {
  parent_id: number | any;
  title: string | null | any;
  key: string | number | null | any;
};

const initialState: StateType = {
  parent_id: null,
  title: null,
  key: null,
};

export const mediaSlice = createSlice({
  name: 'media_folder_parent',
  initialState,

  reducers: {
    mediaFolderParentInfo: (state, action) => {
      state.parent_id = action.payload.parent_id;
      state.title = action.payload.title;
      state.key = action.payload.key;
    },
  },
});

export const { mediaFolderParentInfo } = mediaSlice.actions;

export default mediaSlice.reducer;
