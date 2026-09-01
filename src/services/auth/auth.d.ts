// ====================== ENTITY =========================

type AuthUser = {
	id: string;
	email: string;
};

type AuthTokens = {
	accessToken: string;
	refreshToken: string;
};

type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	user: AuthUser;
};

// ====================== SERVICE =========================

type AuthService = {
	login: (payload: LoginPayload) => Promise<AuthResponse>;
	register: (payload: RegisterPayload) => Promise<AuthResponse>;
	refresh: (refreshToken: string) => Promise<AuthTokens>;
	logout: () => Promise<void>;
	getMe: () => Promise<AuthUser>;
	forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
	resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

type ForgotPasswordPayload = {
	email: string;
};

type ResetPasswordPayload = {
	accessToken: string;
	refreshToken: string;
	newPassword: string;
};