import { Plus } from "lucide-react";
import type React from "react";
import { Link } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { Button } from "@/components/ui/button";
import { useQueryRecurringExpenses } from "@/hooks/recurring-expenses/useQueryRecurringExpenses";
import { PaymentsFilters } from "./components/payments-filters";
import { PaymentsKpis } from "./components/payments-kpis";
import { PaymentsList } from "./components/payments-list";
import { PaymentsSkeleton } from "./components/payments-skeleton";

export const Payments = (): React.ReactElement => {
	const { recurringExpensesInfo, total, isLoading } = useQueryRecurringExpenses();

	if (isLoading) {
		return <PaymentsSkeleton />;
	}

	if (!recurringExpensesInfo) {
		return (
			<Empty
				title="Sin gastos recurrentes para mostrar"
				description="No hay gastos recurrentes para mostrar"
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Gastos recurrentes" },
			]}
			action={
				<Button asChild>
					<Link to={ROUTES.APP.PAYMENTS.NEW}>
						<Plus />
						Nuevo gasto recurrente
					</Link>
				</Button>
			}
		>
			<PaymentsKpis
				info={recurringExpensesInfo}
				total={total}
			/>
			<PaymentsFilters />
			<PaymentsList />
		</Screen>
	);
};
