import type React from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { AccountEdit } from "@/components/accounts/account-edit";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { Screen } from "@/components/design-system/primitives/screen";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { useDeleteAccountPermanent } from "@/hooks/accounts/useDeleteAccountPermanent";
import { useQueryAccount } from "@/hooks/accounts/useQueryAccount";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { buildRoute } from "@/utils/routing/buildRoute";
import { AccountCategories } from "./components/account-categories";
import { AccountExpenses } from "./components/account-expenses";
import { AccountHeader } from "./components/account-header";
import { AccountSkeleton } from "./components/account-skeleton";
import { AccountTransactions } from "./components/account-transactions";

export const AccountDetail = (): React.ReactElement => {
	const { account_id } = useParams<{ account_id: string }>();
	const navigate = useNavigate();

	const { account, isLoading } = useQueryAccount(account_id);
	const { bank } = useQueryBank(account?.bankId);
	const { mutate: deleteAccount, isPending: isDeactivating } = useDeleteAccount();
	const { mutate: deleteAccountPermanent, isPending: isDeleting } = useDeleteAccountPermanent();

	const bankRoute = buildRoute(ROUTES.APP.BANKS.DETAIL, { id: account?.bankId as string });

	if (isLoading) {
		return <AccountSkeleton />;
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
			<div className="flex flex-col sm:flex-row gap-4">
				<AccountExpenses account={account} />
				<AccountCategories account={account} />
			</div>
			<AccountTransactions account={account} />
			<DangerZone
				entityName={account.name}
				entityLabel="la cuenta"
				isActive={account.isActive}
				onDeactivate={() => deleteAccount(account.id)}
				onPermanentDelete={() =>
					deleteAccountPermanent(account.id, {
						onSuccess: () => navigate(ROUTES.APP.ACCOUNTS.ROOT),
					})
				}
				isDeactivating={isDeactivating}
				isDeleting={isDeleting}
			/>
		</Screen>
	);
};
