import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios_config } from "../config/axios";
import { ENDPOINTS } from "../config/Endpoints";
import useAxios from "../hooks/useAxios";

export const fetchUserProfiles = createAsyncThunk("fetchUserProfiles", async (endpoint : string) => {    
    const customAxios = useAxios()
    const response = await customAxios.get(ENDPOINTS.FETCH_USERS, axios_config);
	return response.data;
	
});

const initialState = {
	user: [],
	status: "idle",
	error: null,
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState: initialState,
	reducers: {
		updateUser:((state,action) => {
			const { id,name, role} = action.payload
			
		})
	},
	extraReducers(builder) {
		builder.addCase(fetchUserProfiles.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchUserProfiles.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.user = action.payload;
		});
		builder.addCase(fetchUserProfiles.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export const {updateUser} = userProfileSlice.actions;
export default userProfileSlice.reducer;