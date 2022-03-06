import { AxiosRequestConfig } from "axios";

export const axios_config: AxiosRequestConfig = {
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
};