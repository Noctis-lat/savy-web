import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { CreateTransaction } from "@/components/transactions/create-transaction";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryAccountTransactions } from "@/hooks/accounts/useQueryAccountTransactions";
import { useCreditCardTransactionsController } from "@/storage/credit-cards/creditCardTransactionsController";

type CreditTransactionsHeaderProps = {
	creditCard: CreditCard;
};

export const CreditTransactionsHeader = ({
	creditCard,
}: CreditTransactionsHeaderProps): React.ReactElement => {
	const creditCardTransactionsFilters = useCreditCardTransactionsController(
		(state) => state.creditCardTransactionsFilters,
	);
	// Same query and params as the list: React Query dedupes it into one request.
	const { total, isLoading } = useQueryAccountTransactions(
		creditCard.accountId,
		creditCardTransactionsFilters,
	);

	return (
		<div className="flex items-start justify-between gap-4">
			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex items-center gap-2">
					<ArrowUpDown className="size-4 shrink-0 text-primary" />
					<h3 className="flex items-center gap-1 text-sm font-semibold text-foreground">
						Transacciones
						{isLoading ? (
							<Skeleton className="h-3 w-6" />
						) : (
							<span className="text-xs font-light text-muted-foreground tabular-nums">
								({total ?? 0})
							</span>
						)}
					</h3>
				</div>
				<p className="truncate text-xs text-muted-foreground">Cargos y pagos de esta tarjeta</p>
			</div>

			<CreateTransaction
				mode="button"
				size="sm"
				accountId={creditCard.accountId}
				className="shrink-0"
			/>
		</div>
	);
};
