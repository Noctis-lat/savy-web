// ====================== SHARED TYPES =========================

type BankWithInfo = Bank & {
	info: BankInfo;
};

type TopCategory = {
	categoryId: string;
	categoryName: string;
	amount: number;
	percentage: number;
};