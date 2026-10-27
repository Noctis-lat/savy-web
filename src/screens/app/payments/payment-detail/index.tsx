import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { EditPayment } from "@/components/payments/edit-payment";
import { RecurringExpenseDetailSkeleton } from "@/components/recurring-expenses/recurring-expense-detail-skeleton";
import { RecurringExpenseHeader } from "@/components/recurring-expenses/recurring-expense-header";
import { RecurringExpenseSchedule } from "@/components/recurring-expenses/recurring-expense-schedule";
import { useQueryRecurringExpense } from "@/hooks/recurring-expenses/useQueryRecurringExpense";
import { PaymentDetails } from "./components/payment-details";
import { PaymentManagement } from "./components/payment-management";

export const PaymentDetail = (): React.ReactElement => {
	const { payment_id } = useParams<{ payment_id: string }>();
	const { recurringExpense, isLoading } = useQueryRecurringExpense(payment_id);

	if (isLoading) {
		return <RecurringExpenseDetailSkeleton />;
	}

	if (!recurringExpense) {
		return (
			<Empty
				title="Sin información"
				description="El gasto recurrente que solicitaste no pudo ser encontrado."
				icon={FlagOff}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.PAYMENTS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Gastos recurrentes", href: ROUTES.APP.PAYMENTS.ROOT },
				{ label: recurringExpense.name },
			]}
			action={<EditPayment recurringExpense={recurringExpense} />}
		>
			<RecurringExpenseHeader
				recurringExpense={recurringExpense}
				fallbackIcon="repeat"
			/>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<RecurringExpenseSchedule recurringExpense={recurringExpense} />
				</div>
				<PaymentDetails recurringExpense={recurringExpense} />
			</div>
			<PaymentManagement recurringExpense={recurringExpense} />
		</Screen>
	);
};
