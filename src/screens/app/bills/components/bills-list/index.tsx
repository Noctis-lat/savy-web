import { Receipt } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQueryServices } from "@/hooks/services/useQueryServices";
import { useServicesController } from "@/storage/services/servicesController";
import { BillListItem } from "./components/bill-list-item";
import { BillsListSkeleton } from "./components/bills-list-skeleton";

export const BillsList = (): React.ReactElement => {
	const servicesFilters = useServicesController((state) => state.servicesFilters);
	const setPage = useServicesController((state) => state.setPage);
	const setPerPage = useServicesController((state) => state.setPerPage);

	const { services, isLoading, page, totalPages, perPage } = useQueryServices(servicesFilters);

	if (isLoading) {
		return <BillsListSkeleton />;
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

	if (services && services.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{services.map((service) => (
								<BillListItem
									key={service.id}
									recurringExpense={service}
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
					icon={Receipt}
					title="Sin servicios"
					description={"No hay servicios para mostrar"}
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
