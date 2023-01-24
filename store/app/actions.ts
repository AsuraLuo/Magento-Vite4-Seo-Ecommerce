import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStoreConfig = createAsyncThunk(
  "app/fetchStoreConfig",
  async () => {
    const site = {
      locale: "en_US",
    };
    return site;
  }
);
