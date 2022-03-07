import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axios_config } from "../config/axios";
import { ENDPOINTS } from "../config/Endpoints";
import { LoginFormInput } from "../pages/Login";

export const login = createAsyncThunk("login", async (formData: LoginFormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData, axios_config);
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
// Redux slice that will store user id, name, and role to be used througout the app
const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		updateUser:((state,action) => {
			const { id,name, role} = action.payload
			state.user.id = id
			state.user.name = name
			state.user.role = role
		})
	},
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
	},
});

export const {updateUser} = userSlice.actions;
export default userSlice.reducer;