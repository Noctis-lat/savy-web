type Bank = {
	id: string;
	profileId: string;
	name: string;
	color: string | null;
	logo: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BankInfo = {
	netWorth: number;
	liquidity: number;
	debt: number;
	balanceBreakdown: {
		assets: number;
		liabilities: number;
	};
};

type BankWithInfo = Bank & {
	info: BankInfo;
};

type CreateBankPayload = {
	name: string;
	color?: string;
	logo?: string;
};

type UpdateBankPayload = {
	name?: string;
	color?: string;
	logo?: string;
};

type PeriodType = "day" | "week" | "month" | "other_month" | "quarter" | "semester" | "year";

type IncomeVsExpenses = {
	income: number;
	expenses: number;
	period: string;
	periodLabel: string;
};

type BankCreditCard = {
	id: string;
	accountId: string;
	accountName: string;
	balance: number;
	creditLimit: number;
	cutDay: number;
	paymentDay: number;
	interestRate: number;
	noInterestMonths: number;
	createdAt: string;
	updatedAt: string;
};

type BankLoan = {
	id: string;
	accountId: string;
	accountName: string;
	principal: number;
	interestRate: number;
	termMonths: number;
	startDate: string;
	monthlyPayment: number;
	remaining: number;
	progress: number;
	createdAt: string;
	updatedAt: string;
};

