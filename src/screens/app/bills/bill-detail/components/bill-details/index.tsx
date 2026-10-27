import type React from "react";
import { RecurringExpenseDetails } from "@/components/recurring-expenses/recurring-expense-details";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryCategory } from "@/hooks/categories/useQueryCategory";

type BillDetailsProps = {
	service: RecurringExpense;
};

export const BillDetails = ({ service }: BillDetailsProps): React.ReactElement => {
	const { account, isLoading } = useQueryAccount(service.accountId);
	const { category } = useQueryCategory(service.categoryId ?? "");

	return (
		<RecurringExpenseDetails
			recurringExpense={service}
			accountName={account?.name}
			categoryName={category?.name}
			isLoading={isLoading}
		/>
	);
};
