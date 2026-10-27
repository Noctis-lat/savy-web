import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { EditPayment } from "@/components/payments/edit-payment";
import { useQueryRecurringExpense } from "@/hooks/recurring-expenses/useQueryRecurringExpense";
import { PaymentDangerZone } from "./components/payment-danger-zone";
import { PaymentDetails } from "./components/payment-details";
import { PaymentHeader } from "./components/payment-header";
import { PaymentSkeleton } from "./components/payment-skeleton";

export const PaymentDetail = (): React.ReactElement => {
	const { payment_id } = useParams<{ payment_id: string }>();
	const { recurringExpense, isLoading } = useQueryRecurringExpense(payment_id);

	if (isLoading) {
		return <PaymentSkeleton />;
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
			<PaymentHeader recurringExpense={recurringExpense} />
			<PaymentDetails recurringExpense={recurringExpense} />
			<PaymentDangerZone recurringExpense={recurringExpense} />
		</Screen>
	);
};
