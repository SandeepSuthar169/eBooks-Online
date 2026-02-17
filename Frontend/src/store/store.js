import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../store/auth-slice/index.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store;