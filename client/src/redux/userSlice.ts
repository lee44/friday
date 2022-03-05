import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { ENDPOINTS } from "../config/Endpoints";
import { FormInput } from "../pages/Login";

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const login = createAsyncThunk("login", async (formData: FormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData, config);
	return response.data;
});

const initialState = {
	user: {
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
			state.user.name = action.payload.name;
			state.user.role = action.payload.role;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export default userSlice.reducer;