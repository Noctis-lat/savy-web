import { CreditCard } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQueryCreditCards } from "@/hooks/credit-cards/useQueryCreditCards";
import { useCreditCardsController } from "@/storage/credit-cards/creditCardsController";
import { CreditCardListItem } from "./components/credit-card-list-item";
import { CreditsListSkeleton } from "./components/credits-list-skeleton";

export const CreditsList = (): React.ReactElement => {
	const creditCardsFilters = useCreditCardsController((state) => state.creditCardsFilters);
	const setPage = useCreditCardsController((state) => state.setPage);
	const setPerPage = useCreditCardsController((state) => state.setPerPage);

	const { creditCards, isLoading, page, totalPages, perPage } =
		useQueryCreditCards(creditCardsFilters);

	if (isLoading) {
		return <CreditsListSkeleton />;
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

	if (creditCards && creditCards.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{creditCards.map((creditCard) => (
								<CreditCardListItem
									key={creditCard.id}
									creditCard={creditCard}
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
					icon={CreditCard}
					title="Sin tarjetas de crédito"
					description="No hay tarjetas de crédito para mostrar"
				/>
			</GlassCard>
		</ScaleFadeIn>
	);
};
