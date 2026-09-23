import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { AccountEdit } from "@/components/accounts/account-edit";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { buildRoute } from "@/utils/routing/buildRoute";
import { AccountHeader } from "./components/account-header";

export const AccountDetail = (): React.ReactElement => {
	const { account_id } = useParams<{ account_id: string }>();

	const { account, isLoading } = useQueryAccount(account_id);
	const { bank } = useQueryBank(account?.bankId);

	const bankRoute = buildRoute(ROUTES.APP.BANKS.DETAIL, { id: account?.bankId as string });

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!account) {
		return <Empty />;
	}

	return (
		<Screen
			backRoute={ROUTES.APP.ACCOUNTS.ROOT}
			breadcrumbsConfig={[
				{ label: "Inicio", href: ROUTES.APP.ROOT },
				{ label: "Cuentas", href: ROUTES.APP.ACCOUNTS.ROOT },
				{ label: bank?.name ?? "Banco", href: bankRoute },
				{ label: account.name },
			]}
			action={<AccountEdit account={account} />}
		>
			<AccountHeader
				account={account}
				bank={bank}
			/>
		</Screen>
	);
};
