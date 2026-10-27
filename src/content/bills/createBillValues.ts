import type { CreateBillFormValues } from "@/schemas/bills/createBillSchema";

export const CREATE_BILL_DEFAULT_VALUES: CreateBillFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	billingDays: [],
	billingDate: undefined,
	accountId: "",
	categoryId: undefined,
	url: "",
	color: undefined,
	icon: undefined,
};
