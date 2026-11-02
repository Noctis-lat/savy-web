//* ====================== ENTITY =========================

type CreditCard = {
	id: string;
	accountId: string;
	name: string;
	color: string | null;
	icon: string | null;
	creditLimit: number;
	cutDay: number;
	paymentDueDays: number;
	/** @deprecated Use `paymentDueDays` or `currentCyclePaymentDueDate` instead. */
	paymentDay?: number;
	overLimitTolerance?: number;
	interestRate: number;
	availableCredit: number;
	currentBalance: number;
	nextPaymentDueDate?: string | null;
	currentCycleCutDate: string;
	currentCyclePaymentDueDate: string;
	createdAt: string;
	updatedAt: string;
};

type CreditCardInfo = {
	totalAvailableCredit: number;
	totalNoInterestPayment: number;
	totalMinPayment: number;
	totalDebt: number;
	total: number;
};

//* ====================== SERVICE =========================

type CreditCardService = {
	getCreditCards: (params?: CreditCardParams) => Promise<GetCreditCardsResponse>;
	getCreditCard: (id: string) => Promise<CreditCard>;
	createCreditCard: (payload: CreateCreditCardPayload) => Promise<CreditCard>;
	updateCreditCard: (id: string, payload: UpdateCreditCardPayload) => Promise<CreditCard>;
	deleteCreditCard: (id: string) => Promise<void>;
};

//* ====================== GET CREDIT CARDS =========================

type CreditCardParams = {
	search?: string;
	isActive?: boolean;
	bankId?: string;
	hasUnpaidStatement?: boolean;
	sortBy?: "createdAt" | "creditLimit";
	order?: "asc" | "desc";
	page?: number;
	perPage?: number;
};

type GetCreditCardsResponse = {
	data: CreditCard[];
	info: CreditCardInfo;
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

//* ====================== CREATE CREDIT CARD =========================

type CreateCreditCardPayload = {
	accountId: string;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
};

//* ====================== UPDATE CREDIT CARD =========================

type UpdateCreditCardPayload = {
	creditLimit?: number;
	cutDay?: number;
	paymentDay?: number;
	interestRate?: number;
	name?: string;
	color?: string;
	icon?: string;
};