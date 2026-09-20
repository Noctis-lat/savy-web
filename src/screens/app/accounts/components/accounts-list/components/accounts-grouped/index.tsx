import type React from "react";
import { StaggerContainer } from "@/components/design-system/patterns/animations/stagger-container";
import { AccountsGroup } from "./accounts-group";

type AccountsGroupedProps = {
	groupedAccounts: GroupedAccount[];
};

export const AccountsGrouped = ({ groupedAccounts }: AccountsGroupedProps): React.ReactElement => {
	return (
		<StaggerContainer className="flex flex-col gap-4">
			{groupedAccounts.map((group) => {
				return (
					<AccountsGroup
						group={group}
						key={group.key}
					/>
				);
			})}
		</StaggerContainer>
	);
};
