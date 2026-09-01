import axios from "axios";
import { httpClient, unwrap } from "../http-client";

const API_BASE_URL =
	import.meta.env.VITE_SCOPE === "dev"
		? import.meta.env.VITE_DEV_API_BASE_URL
		: import.meta.env.VITE_PROD_API_BASE_URL;

export const authService: AuthService = {
	login: async (credentials: LoginPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${API_BASE_URL}/auth/login`,
			credentials,
		);
		return unwrap<AuthResponse>(response);
	},

	register: async (userData: RegisterPayload): Promise<AuthResponse> => {
		const response = await axios.post<APIResponse<AuthResponse>>(
			`${API_BASE_URL}/auth/register`,
			userData,
		);
		return unwrap<AuthResponse>(response);
	},

	refresh: async (refreshToken: string): Promise<AuthTokens> => {
		const response = await axios.post<APIResponse<AuthTokens>>(`${API_BASE_URL}/auth/refresh`, {
			refreshToken,
		});
		return unwrap<AuthTokens>(response);
	},

	logout: async (): Promise<void> => {
		await httpClient.post<APIResponse<null>>("/auth/logout");
	},

	getMe: async (): Promise<AuthUser> => {
		const response = await httpClient.get<APIResponse<AuthUser>>("/auth/me");
		return unwrap<AuthUser>(response);
	},

	forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
		await axios.post<APIResponse<null>>(`${API_BASE_URL}/auth/forgot-password`, payload);
	},

	resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
		await axios.post<APIResponse<null>>(`${API_BASE_URL}/auth/reset-password`, payload);
	},
};
