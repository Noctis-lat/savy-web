import { Plus, RefreshCw } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { CreateAccount } from "@/components/accounts/create-account";
import { BankCard } from "@/components/design-system/patterns/data-display/bank-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { useQueryBankAccounts } from "@/hooks/banks/useQueryBankAccounts";
import { useQueryBankCreditCards } from "@/hooks/banks/useQueryBankCreditCards";

type BankDetailAccountsProps = {
	bankId: string;
};

export const BankDetailAccounts = ({ bankId }: BankDetailAccountsProps): React.ReactElement => {
	const navigate = useNavigate();

	const { bank } = useQueryBank(bankId, false);
	const accountsQuery = useQueryBankAccounts(bankId);
	const creditCardsQuery = useQueryBankCreditCards(bankId);

	const accounts = accountsQuery.data ?? [];
	const creditCards = creditCardsQuery.data ?? [];

	const isLoading = accountsQuery.isLoading || creditCardsQuery.isLoading;
	const isError = accountsQuery.isError || creditCardsQuery.isError;

	if (isLoading) {
		return (
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				<Skeleton className="aspect-[16/10] rounded-xl" />
				<Skeleton className="aspect-[16/10] rounded-xl" />
				<Skeleton className="aspect-[16/10] rounded-xl" />
				<Skeleton className="aspect-[16/10] rounded-xl" />
			</div>
		);
	}

	if (isError) {
		return (
			<GlassCard className="p-6">
				<Empty
					icon={RefreshCw}
					title="No pudimos cargar las cuentas"
					description="Revisa tu conexión e inténtalo de nuevo."
					action={{
						label: "Reintentar",
						onClick: () => {
							void accountsQuery.refetch();
							void creditCardsQuery.refetch();
						},
					}}
				/>
			</GlassCard>
		);
	}

	// Exclude LOAN accounts — they are shown in the LoansSection
	const nonLoanAccounts = accounts.filter((account) => account.type !== "LOAN");

	if (nonLoanAccounts.length === 0) {
		return (
			<GlassCard className="p-6">
				<Empty
					icon={Plus}
					title="Sin cuentas"
					description="Este banco no tiene cuentas registradas."
					action={
						<CreateAccount
							size="sm"
							bankId={bank?.id}
						/>
					}
				/>
			</GlassCard>
		);
	}

	const bankName = bank?.name ?? "";
	const bankColor = bank?.color ?? null;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-sm font-semibold text-foreground">Cuentas ({nonLoanAccounts.length})</h3>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{nonLoanAccounts.map((account) => {
					const matchingCard = creditCards.find((card) => card.accountId === account.id);
					return (
						<BankCard
							key={account.id}
							account={account}
							bankName={bankName}
							bankColor={bankColor}
							creditCard={matchingCard}
							onClick={() => navigate(`/app/accounts/${account.id}`)}
						/>
					);
				})}

				<CreateAccount
					mode="card"
					size="sm"
					bankId={bank?.id}
				/>
			</div>
		</div>
	);
};
