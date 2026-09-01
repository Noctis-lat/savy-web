// ====================== ENTITY =========================

type CreditCard = {
	id: string;
	accountId: string;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths: number;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type CreditCardService = {
	getCreditCards: (params?: CreditCardParams) => Promise<CreditCard[]>;
	getCreditCard: (id: string) => Promise<CreditCard>;
	createCreditCard: (payload: CreateCreditCardPayload) => Promise<CreditCard>;
	updateCreditCard: (id: string, payload: UpdateCreditCardPayload) => Promise<CreditCard>;
	deleteCreditCard: (id: string) => Promise<void>;
};

// ====================== METHOD TYPES =========================

type CreditCardParams = {
	sortBy?: "createdAt" | "creditLimit";
	order?: "asc" | "desc";
};

type CreateCreditCardPayload = {
	accountId: string;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths?: number;
};

type UpdateCreditCardPayload = {
	creditLimit?: number;
	cutDay?: number;
	paymentDay?: number;
	interestRate?: number;
	noInterestMonths?: number;
};