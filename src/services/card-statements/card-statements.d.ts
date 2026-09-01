// ====================== ENTITY =========================

type CardStatement = {
	id: string;
	creditCardId: string;
	periodStart: string;
	periodEnd: string;
	balance: number;
	minPayment: number;
	noInterestPayment: number;
	interestAmount: number;
	isPaid: boolean;
	createdAt: string;
};

// ====================== SERVICE =========================

type CardStatementService = {
	getCardStatements: (params?: CardStatementParams) => Promise<CardStatement[]>;
	getCardStatement: (id: string) => Promise<CardStatement>;
	createCardStatement: (payload: CreateCardStatementPayload) => Promise<CardStatement>;
	updateCardStatement: (id: string, payload: UpdateCardStatementPayload) => Promise<CardStatement>;
	deleteCardStatement: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type CardStatementParams = {
	creditCardId?: string;
	isPaid?: boolean;
	sortBy?: "periodEnd" | "balance" | "createdAt";
	order?: "asc" | "desc";
};

type CreateCardStatementPayload = {
	creditCardId: string;
	periodStart: string;
	periodEnd: string;
	balance: number;
	minPayment: number;
	noInterestPayment: number;
	interestAmount?: number;
};

type UpdateCardStatementPayload = {
	balance?: number;
	minPayment?: number;
	noInterestPayment?: number;
	interestAmount?: number;
	isPaid?: boolean;
};