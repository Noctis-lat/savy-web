import type { CreateSubscriptionFormValues } from "@/schemas/subscriptions/createSubscriptionSchema";

export const CREATE_SUBSCRIPTION_DEFAULT_VALUES: CreateSubscriptionFormValues = {
	name: "",
	amount: 0,
	frequency: "MONTHLY",
	billingDay: 1,
	billingDay2: undefined,
	accountId: "",
	categoryId: undefined,
	url: "",
	color: undefined,
	icon: undefined,
};
