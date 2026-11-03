// ====================== ENUMS =========================

/** Computed by the API. Use this as the source of truth for display, not interestAmount. */
type StatementStatus = "pending" | "overdue" | "partial" | "paid";

/** Statement movements can be installments, which the general TransactionType does not model. */
type StatementTransactionType = "INCOME" | "EXPENSE" | "TRANSFER" | "PAYMENT" | "INSTALLMENT";

type InstallmentPlanType = "MSI" | "MSCI";

type InstallmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED" | "PAID_OFF";

type CommissionType = "ANNUAL_FEE" | "LATE_PAYMENT" | "CASH_ADVANCE";

// ====================== ENTITY =========================

type CardStatement = {
	id: string;
	creditCardId: string;
	periodStart: string;
	periodEnd: string;
	/** Calculated by the API from the card's payment due days. */
	paymentDueDate?: string;
	balance: number;
	minPayment: number;
	noInterestPayment: number;
	interestAmount: number;
	paidAmount?: number;
	remainingBalance?: number;
	isPaid: boolean;
	isGenerated?: boolean;
	/** Computed by the API. Source of truth for display. */
	status: StatementStatus;
	createdAt: string;
	updatedAt?: string;
};

/**
 * Installment money fields are DECIMAL STRINGS IN PESOS on the wire (e.g. "1000.00"), not cents.
 * Kept faithful to the API; convert with decimalStringToCents before formatCurrency.
 */
type InstallmentPurchase = {
	id: string;
	description: string | null;
	/** Decimal string in pesos. */
	amount: string;
	date: string;
};

type InstallmentDetail = {
	number: number;
	totalInstallments: number;
	billedInstallments: number;
	paidInstallments: number;
	remainingInstallments: number;
	/** Decimal string in pesos. */
	monthlyAmount: string;
	/** Decimal string in pesos. */
	principalAmount: string;
	/** Decimal string in pesos. */
	interestAmount: string;
	/** Decimal string in pesos. */
	remainingAmount: string;
	type: InstallmentPlanType;
	status: InstallmentStatus;
	purchase: InstallmentPurchase;
};

type StatementTransaction = {
	id: string;
	accountId: string;
	destinationAccountId?: string | null;
	categoryId?: string | null;
	type: StatementTransactionType;
	/** Cents, like every other transaction amount. */
	amount: number;
	description?: string | null;
	note?: string | null;
	date: string;
	statementId?: string | null;
	/** Null for regular movements. */
	commissionType?: CommissionType | null;
	installmentPlanId?: string | null;
	installmentNumber?: number | null;
	installment: InstallmentDetail | null;
	createdAt: string;
	updatedAt: string;
};

// ====================== SERVICE =========================

type CardStatementService = {
	getCardStatements: (params?: CardStatementParams) => Promise<CardStatement[]>;
	getCardStatement: (id: string) => Promise<CardStatement>;
	getCardStatementTransactions: (id: string) => Promise<StatementTransaction[]>;
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
	paidAmount?: number;
	isPaid?: boolean;
};
