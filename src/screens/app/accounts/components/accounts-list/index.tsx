import { Wallet } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useAccountsController } from "@/storage/accounts/accountsController";
import { AccountItem } from "./components/account-item";

export const AccountsList = (): React.ReactElement => {
	const { accountsFilters } = useAccountsController();
	const { accounts, isLoading } = useQueryAccounts(accountsFilters);

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!accounts || accounts.length === 0) {
		return (
			<Empty
				icon={Wallet}
				title="Sin cuentas"
				description="No hay cuentas para mostrar"
			/>
		);
	}

	return (
		<StaggerContainer>
			<ScaleFadeIn>
				<GlassCard className="overflow-hidden p-0 gap-0">
					{accounts.map((account) => {
						return (
							<AccountItem
								account={account}
								key={account.id}
							/>
						);
					})}
				</GlassCard>
			</ScaleFadeIn>
		</StaggerContainer>
	);
};
