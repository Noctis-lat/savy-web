import type React from "react";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";

export const AccountDetail = (): React.ReactElement => {
	const { account_id } = useParams<{ account_id: string }>();

	const { account, isLoading } = useQueryAccount(account_id);

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
				{ label: account.name },
			]}
		>
			<div></div>
		</Screen>
	);
};
