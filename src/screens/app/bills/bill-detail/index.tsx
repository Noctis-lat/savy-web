import { FlagOff } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { EditBill } from "@/components/bills/edit-bill";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { RecurringExpenseDetailSkeleton } from "@/components/recurring-expenses/recurring-expense-detail-skeleton";
import { RecurringExpenseHeader } from "@/components/recurring-expenses/recurring-expense-header";
import { RecurringExpenseSchedule } from "@/components/recurring-expenses/recurring-expense-schedule";
import { useQueryService } from "@/hooks/services/useQueryService";
import { BillDetails } from "./components/bill-details";
import { BillManagement } from "./components/bill-management";

export const BillDetail = (): React.ReactElement => {
	const { bill_id } = useParams<{ bill_id: string }>();
	const { service, isLoading } = useQueryService(bill_id);

	if (isLoading) {
		return <RecurringExpenseDetailSkeleton />;
	}

	if (!service) {
		return (
			<Empty
				title="Sin información"
				description="El servicio que solicitaste no pudo ser encontrado."
				icon={FlagOff}
			/>
		);
	}

	return (
		<Screen
			backRoute={ROUTES.APP.BILLS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Servicios", href: ROUTES.APP.BILLS.ROOT },
				{ label: service.name },
			]}
			action={<EditBill recurringExpense={service} />}
		>
			<RecurringExpenseHeader
				recurringExpense={service}
				fallbackIcon="receipt"
			/>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<RecurringExpenseSchedule recurringExpense={service} />
				</div>
				<BillDetails service={service} />
			</div>
			<BillManagement service={service} />
		</Screen>
	);
};
