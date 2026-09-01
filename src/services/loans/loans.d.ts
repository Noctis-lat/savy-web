// ====================== ENTITY =========================

type Loan = {
	id: string;
	accountId: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining: number;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type LoanService = {
	getLoans: (params?: LoanParams) => Promise<Loan[]>;
	getLoan: (id: string) => Promise<Loan>;
	createLoan: (payload: CreateLoanPayload) => Promise<Loan>;
	updateLoan: (id: string, payload: UpdateLoanPayload) => Promise<Loan>;
	deleteLoan: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type LoanParams = {
	sortBy?: "createdAt" | "remaining" | "principal";
	order?: "asc" | "desc";
};

type CreateLoanPayload = {
	accountId: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining?: number;
};

type UpdateLoanPayload = {
	interestRate?: number;
	termMonths?: number;
	monthlyPayment?: number;
	remaining?: number;
};