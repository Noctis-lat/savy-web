// ====================== ENUMS =========================

type IncomeSourceFrequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

// ====================== ENTITY =========================

type IncomeSource = {
	id: string;
	profileId: string;
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
	destinationAccountId: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BulkCreateResponse = {
	creationState: "success" | "partial" | "failed";
	total: number;
	successful: IncomeSource[];
	failed: { input: CreateIncomeSourcePayload; errors: string[] }[];
};

// ====================== SERVICE =========================

type IncomeSourceService = {
	getIncomeSources: (params?: IncomeSourceParams) => Promise<IncomeSource[]>;
	createIncomeSource: (payload: CreateIncomeSourcePayload) => Promise<IncomeSource>;
	bulkCreateIncomeSources: (payload: { sources: CreateIncomeSourcePayload[] }) => Promise<BulkCreateResponse>;
	updateIncomeSource: (id: string, payload: UpdateIncomeSourcePayload) => Promise<IncomeSource>;
	deleteIncomeSource: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type IncomeSourceParams = {
	isActive?: boolean;
	sortBy?: "name" | "amount" | "createdAt";
	order?: "asc" | "desc";
};

type CreateIncomeSourcePayload = {
	name: string;
	amount: number;
	frequency: IncomeSourceFrequency;
	paydays: number[];
	destinationAccountId: string;
};

type UpdateIncomeSourcePayload = Partial<CreateIncomeSourcePayload>;