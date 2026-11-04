import type React from "react";
import { useNavigate } from "react-router";
import { CreateAccount } from "@/components/accounts/create-account";
import { BankCard } from "@/components/banks/bank-card";
import { getAccountDetailRoute } from "@/content/accounts/accountDetailRoutes";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";

type BankSavingsProps = {
	bank: Bank;
};

export const BankSavings = ({ bank }: BankSavingsProps): React.ReactElement => {
	const navigate = useNavigate();
	const { accounts, isLoading } = useQueryAccounts({ bankId: bank.id, type: "SAVINGS" });

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!accounts || accounts.length === 0) {
		return <div>no accounts</div>;
	}

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm font-semibold text-foreground">
				Cuentas de ahorro ({accounts.length})
			</h3>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
				{accounts.map((account) => {
					return (
						<BankCard
							key={account.id}
							account={account}
							bankName={bank.name}
							bankColor={bank.color}
							onClick={() => navigate(getAccountDetailRoute(account))}
						/>
					);
				})}

				<CreateAccount
					mode="card"
					size="sm"
					type="SAVINGS"
					bankId={bank?.id}
				/>
			</div>
		</div>
	);
};
