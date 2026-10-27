import { CalendarClock } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQueryRecurringExpenses } from "@/hooks/recurring-expenses/useQueryRecurringExpenses";
import { useRecurringExpensesController } from "@/storage/recurring-expenses/recurringExpensesController";
import { PaymentListItem } from "./components/payment-list-item";
import { PaymentsListSkeleton } from "./components/payments-list-skeleton";

export const PaymentsList = (): React.ReactElement => {
	const recurringExpensesFilters = useRecurringExpensesController(
		(state) => state.recurringExpensesFilters,
	);
	const setPage = useRecurringExpensesController((state) => state.setPage);
	const setPerPage = useRecurringExpensesController((state) => state.setPerPage);

	const { recurringExpenses, isLoading, page, totalPages, perPage } =
		useQueryRecurringExpenses(recurringExpensesFilters);

	if (isLoading) {
		return <PaymentsListSkeleton />;
	}

	const handlePageChange = (nextPage: number): void => {
		setPage(nextPage);
	};

	const handlePageSizeChange = (size: number): void => {
		setPerPage(size);
	};

	const pagination = totalPages !== undefined && totalPages >= 1 && (
		<TablePagination
			page={page ?? 1}
			totalPages={totalPages}
			onPageChange={handlePageChange}
			pageSize={perPage}
			pageSizeOptions={[10, 20, 50]}
			onPageSizeChange={handlePageSizeChange}
		/>
	);

	if (recurringExpenses && recurringExpenses.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{recurringExpenses.map((recurringExpense) => (
								<PaymentListItem
									key={recurringExpense.id}
									recurringExpense={recurringExpense}
								/>
							))}
						</GlassCard>
					</ScaleFadeIn>
				</StaggerContainer>
				{pagination}
			</div>
		);
	}

	return (
		<ScaleFadeIn className="flex flex-col flex-1 gap-4">
			<GlassCard>
				<Empty
					icon={CalendarClock}
					title="Sin gastos recurrentes"
					description={"No hay gastos recurrentes para mostrar"}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
