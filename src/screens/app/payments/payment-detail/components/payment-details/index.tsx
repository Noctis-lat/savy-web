import type React from "react";
import { RecurringExpenseDetails } from "@/components/recurring-expenses/recurring-expense-details";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryCategory } from "@/hooks/categories/useQueryCategory";

type PaymentDetailsProps = {
	recurringExpense: RecurringExpense;
};

export const PaymentDetails = ({ recurringExpense }: PaymentDetailsProps): React.ReactElement => {
	const { account, isLoading } = useQueryAccount(recurringExpense.accountId);
	const { category } = useQueryCategory(recurringExpense.categoryId ?? "");

	return (
		<RecurringExpenseDetails
			recurringExpense={recurringExpense}
			accountName={account?.name}
			categoryName={category?.name}
			isLoading={isLoading}
		/>
	);
};
