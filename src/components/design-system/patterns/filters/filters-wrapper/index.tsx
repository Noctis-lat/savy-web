import type React from "react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ClearFilters } from "./clear-filters";
import { ExpandedFilters } from "./expanded-filters";
import { FilterButton } from "./filter-button";
import { MobileFilters } from "./mobile-filters";

type HeadlessRenderArgs = {
	trigger: React.ReactElement | null;
	clear: React.ReactElement | null;
	panel: (content: React.ReactElement) => React.ReactElement;
};

type FiltersWrapperBaseProps = {
	activeFilterCount: number;
	hasActiveFilters: boolean;
	clearFilters: () => void;
	direction?: "left" | "right";
	mobileTitle?: string;
	mobileDescription?: string;
};

type FiltersWrapperStandardProps = FiltersWrapperBaseProps & {
	variant?: "inline" | "panel";
	children: React.ReactElement;
};

type FiltersWrapperHeadlessProps = FiltersWrapperBaseProps & {
	variant: "headless";
	children: (args: HeadlessRenderArgs) => React.ReactElement;
};

type FiltersWrapperProps = FiltersWrapperStandardProps | FiltersWrapperHeadlessProps;

export const FiltersWrapper = ({
	activeFilterCount,
	hasActiveFilters,
	children,
	clearFilters,
	direction = "right",
	variant = "inline",
	mobileTitle = "Filtros",
	mobileDescription = "Ajusta tus filtros para encontrar lo que buscas",
}: FiltersWrapperProps): React.ReactElement => {
	const isMobile = useIsMobile();
	const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

	const triggerElement = (
		<FilterButton
			isOpen={filtersOpen}
			activeFilterCount={activeFilterCount}
			onClick={() => setFiltersOpen((prev) => !prev)}
		/>
	);

	const clearElement = hasActiveFilters ? <ClearFilters clearFilters={clearFilters} /> : null;

	if (variant === "headless") {
		const headlessChildren = children as (args: HeadlessRenderArgs) => React.ReactElement;

		const panelRender = (content: React.ReactElement): React.ReactElement => {
			if (isMobile) {
				return (
					<MobileFilters
						isOpen={filtersOpen}
						onOpenChange={setFiltersOpen}
						activeFilterCount={activeFilterCount}
						hasActiveFilters={hasActiveFilters}
						clearFilters={clearFilters}
						title={mobileTitle}
						description={mobileDescription}
					>
						{content}
					</MobileFilters>
				);
			}

			return (
				<ExpandedFilters
					isOpen={filtersOpen}
					hasActiveFilters={hasActiveFilters}
					direction={direction}
					variant="panel"
					clearFilters={clearFilters}
				>
					{content}
				</ExpandedFilters>
			);
		};

		return headlessChildren({
			trigger: isMobile ? null : triggerElement,
			clear: isMobile ? null : clearElement,
			panel: panelRender,
		});
	}

	const standardChildren = children as React.ReactElement;

	if (isMobile) {
		return (
			<MobileFilters
				isOpen={filtersOpen}
				onOpenChange={setFiltersOpen}
				activeFilterCount={activeFilterCount}
				hasActiveFilters={hasActiveFilters}
				clearFilters={clearFilters}
				title={mobileTitle}
				description={mobileDescription}
			>
				{standardChildren}
			</MobileFilters>
		);
	}

	if (variant === "panel") {
		return (
			<div className="flex flex-col w-full">
				<div className="flex items-center gap-1">
					{triggerElement}
					{clearElement}
				</div>

				<ExpandedFilters
					isOpen={filtersOpen}
					hasActiveFilters={hasActiveFilters}
					direction={direction}
					variant="panel"
					clearFilters={clearFilters}
				>
					{standardChildren}
				</ExpandedFilters>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-1 shrink-0">
			{direction === "left" ? (
				<>
					<ExpandedFilters
						isOpen={filtersOpen}
						hasActiveFilters={hasActiveFilters}
						direction={direction}
						variant="inline"
						clearFilters={clearFilters}
					>
						{standardChildren}
					</ExpandedFilters>

					{triggerElement}
				</>
			) : (
				<>
					{triggerElement}

					<ExpandedFilters
						isOpen={filtersOpen}
						hasActiveFilters={hasActiveFilters}
						direction={direction}
						variant="inline"
						clearFilters={clearFilters}
					>
						{standardChildren}
					</ExpandedFilters>
				</>
			)}
		</div>
	);
};
