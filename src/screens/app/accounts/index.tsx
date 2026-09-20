import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateAccount } from "@/components/accounts/create-account";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useAccountsController } from "@/storage/accounts/accountsController";
import { AccountsFilters } from "./components/accounts-filters";
import { AccountsKpis } from "./components/accounts-kpis";

export const Accounts = (): React.ReactElement => {
	const { accountsFilters } = useAccountsController();
	const { accounts, accountsInfo, total, isLoading } = useQueryAccounts(accountsFilters);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!accounts) {
		return <Empty />;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.DASHBOARD}
			breadcrumbsConfig={[{ label: "Inicio", href: ROUTES.APP.ROOT }, { label: "Cuentas" }]}
			action={<CreateAccount />}
		>
			<AccountsKpis
				info={accountsInfo}
				total={total}
			/>
			<AccountsFilters />
		</Screen>
	);
};
