import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducers/userSlice";
import paginationSlice from "./reducers/paginationSlice";

export default configureStore({
    reducer: {
        users: userSlice,
        pagination: paginationSlice
    }
})