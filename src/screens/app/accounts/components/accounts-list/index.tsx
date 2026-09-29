import { Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { TablePagination } from "@/components/design-system/patterns/navigation/table-pagination";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useAccountsController } from "@/storage/accounts/accountsController";
import { AccountItem } from "./components/account-item";
import { AccountsGrouped } from "./components/accounts-grouped";
import { AccountsListSkeleton } from "./components/accounts-list-skeleton";

export const AccountsList = (): React.ReactElement => {
	const accountsFilters = useAccountsController((state) => state.accountsFilters);
	const setPage = useAccountsController((state) => state.setPage);
	const setPerPage = useAccountsController((state) => state.setPerPage);

	const { accounts, groupedAccounts, isLoading, page, totalPages, perPage } =
		useQueryAccounts(accountsFilters);

	if (isLoading) {
		return <AccountsListSkeleton />;
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

	if (groupedAccounts) {
		return (
			<div className="flex flex-col gap-2">
				<AccountsGrouped groupedAccounts={groupedAccounts} />
				{pagination}
			</div>
		);
	}

	if (accounts && accounts.length > 0) {
		return (
			<div className="flex flex-col gap-2">
				<StaggerContainer>
					<ScaleFadeIn>
						<GlassCard className="overflow-hidden p-0 gap-0">
							{accounts.map((account) => (
								<AccountItem
									key={account.id}
									account={account}
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
		<Empty
			icon={Wallet}
			title="Sin cuentas"
			description="No hay cuentas para mostrar"
		/>
	);
};
