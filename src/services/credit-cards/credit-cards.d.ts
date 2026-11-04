//* ====================== ENTITY =========================

type CreditCard = {
	id: string;
	accountId: string;
	/** Default DEBIT/CASH account used to pay this card; the API sends null when unset. */
	paymentAccountId: string | null;
	/** The full payment account object, or null if no default payment account is set. */
	paymentAccount: Account | null;
	name: string;
	color: string | null;
	icon: string | null;
	creditLimit: number;
	cutDay: number;
	paymentDueDays?: number;
	overLimitTolerance?: number;
	interestRate: number;
	availableCredit: number;
	currentBalance: number;
	nextPaymentDueDate: string | null;
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
	getCreditCardByAccountId: (accountId: string) => Promise<CreditCard>;
	createCreditCard: (payload: CreateCreditCardPayload) => Promise<CreditCard>;
	updateCreditCard: (id: string, payload: UpdateCreditCardPayload) => Promise<CreditCard>;
	deleteCreditCard: (id: string) => Promise<void>;
	deleteCreditCardPermanent: (id: string) => Promise<void>;
	activateCreditCard: (id: string) => Promise<CreditCard>;
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
	paymentAccountId?: string;
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
	/** Send null to clear the default payment account. */
	paymentAccountId?: string | null;
};