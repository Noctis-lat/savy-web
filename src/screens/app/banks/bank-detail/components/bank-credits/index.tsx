import { CreditCardX } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { CreateAccount } from "@/components/accounts/create-account";
import { BankCard } from "@/components/banks/bank-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { getAccountDetailRoute } from "@/content/accounts/accountDetailRoutes";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";

type BankCreditsProps = {
	bank: Bank;
};

export const BankCredits = ({ bank }: BankCreditsProps): React.ReactElement => {
	const navigate = useNavigate();
	const { accounts, isLoading } = useQueryAccounts({ bankId: bank.id, type: "CREDIT" });

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (!accounts || accounts.length === 0) {
		return (
			<GlassCard>
				<Empty
					title="No hay cuentas de crédito"
					description="No se han encontrado cuentas de crédito asociadas a este banco."
					icon={CreditCardX}
					action={
						<CreateAccount
							size="sm"
							type="CREDIT"
							bankId={bank?.id}
						/>
					}
				/>
			</GlassCard>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm font-semibold text-foreground">Cuentas debito ({accounts.length})</h3>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
				{accounts.map((account) => {
					return (
						<BankCard
							key={account.id}
							account={account}
							bankName={bank.name}
							bankColor={bank.color}
							isCreditCard={true}
							onClick={() => navigate(getAccountDetailRoute(account))}
						/>
					);
				})}

				<CreateAccount
					mode="card"
					size="sm"
					type="CREDIT"
					bankId={bank?.id}
				/>
			</div>
		</div>
	);
};
