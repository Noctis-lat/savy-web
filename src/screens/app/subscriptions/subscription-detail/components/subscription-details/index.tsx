import type React from "react";
import { RecurringExpenseDetails } from "@/components/recurring-expenses/recurring-expense-details";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryCategory } from "@/hooks/categories/useQueryCategory";

type SubscriptionDetailsProps = {
	subscription: RecurringExpense;
};

export const SubscriptionDetails = ({
	subscription,
}: SubscriptionDetailsProps): React.ReactElement => {
	const { account, isLoading } = useQueryAccount(subscription.accountId);
	const { category } = useQueryCategory(subscription.categoryId ?? "");

	return (
		<RecurringExpenseDetails
			recurringExpense={subscription}
			accountName={account?.name}
			categoryName={category?.name}
			isLoading={isLoading}
		/>
	);
};
