import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axios_config } from "../config/axios";
import { ENDPOINTS } from "../config/Endpoints";
import { FormInput } from "../pages/Login";

export const login = createAsyncThunk("login", async (formData: FormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData, axios_config);
	return response.data;
});

const initialState = {
	user: {
        name: "",
        email: "",
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
			state.user.email = action.payload.email;
			state.user.role = action.payload.role;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export default userSlice.reducer;