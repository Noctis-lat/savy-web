import type React from "react";
import { ROUTES } from "@/app/router/routes";
import { CreateAccount } from "@/components/accounts/create-account";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { AccountsFilters } from "./components/accounts-filters";
import { AccountsKpis } from "./components/accounts-kpis";
import { AccountsList } from "./components/accounts-list";

export const Accounts = (): React.ReactElement => {
	const { accountsInfo, total, isLoading } = useQueryAccounts({ info: true });

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!accountsInfo) {
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
			<AccountsList />
		</Screen>
	);
};
