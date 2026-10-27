import { Repeat } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQuerySubscriptions } from "@/hooks/subscriptions/useQuerySubscriptions";
import { useSubscriptionsController } from "@/storage/subscriptions/subscriptionsController";
import { SubscriptionListItem } from "./components/subscription-list-item";
import { SubscriptionsListSkeleton } from "./components/subscriptions-list-skeleton";

export const SubscriptionsList = (): React.ReactElement => {
	const subscriptionsFilters = useSubscriptionsController((state) => state.subscriptionsFilters);
	const setPage = useSubscriptionsController((state) => state.setPage);
	const setPerPage = useSubscriptionsController((state) => state.setPerPage);

	const { subscriptions, isLoading, page, totalPages, perPage } =
		useQuerySubscriptions(subscriptionsFilters);

	if (isLoading) {
		return <SubscriptionsListSkeleton />;
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

	if (subscriptions && subscriptions.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{subscriptions.map((subscription) => (
								<SubscriptionListItem
									key={subscription.id}
									recurringExpense={subscription}
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
					icon={Repeat}
					title="Sin suscripciones"
					description={"No hay suscripciones para mostrar"}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
