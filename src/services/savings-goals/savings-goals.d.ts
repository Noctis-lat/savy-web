// ====================== ENTITY =========================

type SavingsGoal = {
	id: string;
	profileId: string;
	accountId: string;
	name: string;
	targetAmount: number;
	deadline: string | null;
	color: string | null;
	icon: string | null;
	currentAmount: number;
	isCompleted: boolean;
	createdAt: string;
	updatedAt: string;
};

type SavingsGoalsInfo = {
	totalSavingsGoals: number;
	totalSaved: number;
}

// ====================== SERVICE =========================

type SavingsGoalService = {
	getSavingsGoals: (params?: SavingsGoalParams) => Promise<SavingsGoalsResponse>;
	getSavingsGoal: (id: string) => Promise<SavingsGoal>;
	getSavingsGoalByAccountId: (accountId: string) => Promise<SavingsGoal>;
	createSavingsGoal: (payload: CreateSavingsGoalPayload) => Promise<SavingsGoal>;
	updateSavingsGoal: (id: string, payload: UpdateSavingsGoalPayload) => Promise<SavingsGoal>;
	deleteSavingsGoal: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type SavingsGoalParams = {
	isCompleted?: boolean;
	sortBy?: "deadline" | "targetAmount" | "currentAmount";
	order?: "asc" | "desc";
	search?: string;
	page?: number;
	perPage?: number;
};

type SavingsGoalsResponse = {
	savingsGoals: SavingsGoal[];
	total: number;
	info: SavingsGoalsInfo;
	totalPages: number;
	page: number;
	perPage: number;
}

type CreateSavingsGoalPayload = {
	accountId: string;
	name: string;
	targetAmount: number;
	deadline?: string;
	color?: string;
};

type UpdateSavingsGoalPayload = {
	accountId?: string;
	name?: string;
	targetAmount?: number;
	deadline?: string;
	color?: string;
};