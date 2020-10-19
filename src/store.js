import { configureStore } from "@reduxjs/toolkit";
import { advisorsReducer } from "./features/Advisors";

const store = configureStore({
  reducer: {
    advisors: advisorsReducer,
  },
});

export { store };
