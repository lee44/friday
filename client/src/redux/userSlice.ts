import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axios_config } from "../config/axios";
import { ENDPOINTS } from "../config/Endpoints";
import { LoginFormInput } from "../pages/Login";
import { RegisterFormInput } from "../pages/Register";

export const login = createAsyncThunk("login", async (formData: LoginFormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData, axios_config);
	return response.data;
});

export const register = createAsyncThunk("register", async (formData: RegisterFormInput) => {
	const response = await axios.post(ENDPOINTS.REGISTER, formData, axios_config);
	return response.data;
});

const initialState = {
	user: {
		id:"",
        name: "",
	    role: ""
    },
	status: "idle",
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(login.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.user.id = action.payload.id;
			state.user.name = action.payload.name;
			state.user.role = action.payload.role;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
		});
		builder.addCase(register.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.user.id = action.payload.id;
			state.user.name = action.payload.name;
			state.user.role = action.payload.role;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export default userSlice.reducer;