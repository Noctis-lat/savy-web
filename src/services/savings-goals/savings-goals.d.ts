// ====================== ENTITY =========================

type SavingsGoal = {
	id: string;
	profileId: string;
	accountId: string;
	name: string;
	targetAmount: number;
	deadline: string | null;
	color: string | null;
	currentAmount: number;
	isCompleted: boolean;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type SavingsGoalService = {
	getSavingsGoals: (params?: SavingsGoalParams) => Promise<SavingsGoal[]>;
	getSavingsGoal: (id: string) => Promise<SavingsGoal>;
	createSavingsGoal: (payload: CreateSavingsGoalPayload) => Promise<SavingsGoal>;
	updateSavingsGoal: (id: string, payload: UpdateSavingsGoalPayload) => Promise<SavingsGoal>;
	deleteSavingsGoal: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type SavingsGoalParams = {
	isCompleted?: boolean;
	sortBy?: "deadline" | "targetAmount" | "currentAmount";
	order?: "asc" | "desc";
};

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