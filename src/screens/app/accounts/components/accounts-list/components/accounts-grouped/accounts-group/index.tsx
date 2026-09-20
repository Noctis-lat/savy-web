import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { useAccountsController } from "@/storage/accounts/accountsController";
import { getAccountTypeLabel } from "@/utils/accounts/getAccountTypeLabel";
import { AccountItem } from "../../account-item";

type AccountsGroupProps = {
	group: GroupedAccount;
};

export const AccountsGroup = ({ group }: AccountsGroupProps): React.ReactElement => {
	const { accountsFilters } = useAccountsController();
	const { groupedBy } = accountsFilters;

	const groupTitle =
		groupedBy === "banks" ? group.title : getAccountTypeLabel(group.title as AccountType);

	return (
		<ScaleFadeIn className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h3 className="text-sm font-semibold text-foreground">{groupTitle}</h3>
				<span className="text-xs tabular-nums text-muted-foreground">
					{group.accounts.length} {group.accounts.length === 1 ? "cuenta" : "cuentas"}
				</span>
			</div>
			<GlassCard className="overflow-hidden gap-0 p-0">
				{group.accounts.map((account) => (
					<AccountItem
						key={account.id}
						account={account}
					/>
				))}
			</GlassCard>
		</ScaleFadeIn>
	);
};
