import type { CreateSubscriptionFormValues } from "@/schemas/subscriptions/createSubscriptionSchema";

export const CREATE_SUBSCRIPTION_DEFAULT_VALUES: CreateSubscriptionFormValues = {
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
