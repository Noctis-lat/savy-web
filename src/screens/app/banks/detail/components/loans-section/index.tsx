import { Landmark } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ProgressBar } from "@/components/design-system/patterns/data-display/progress-bar";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { formatCurrency } from "@/utils/formatters/formatCurrency";

type Props = {
	loans: BankLoan[];
	accounts: Account[];
	currency: string;
	locale: string;
};

export const LoansSection = ({ loans, accounts, currency, locale }: Props): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Landmark className="size-4 text-primary" />
				<h3 className="text-sm font-semibold text-foreground">Préstamos ({loans.length})</h3>
			</div>
			<div className="flex flex-col gap-4">
				{loans.map((loan) => {
					const loanAccount = accounts.find((account) => account.id === loan.accountId);
					const accountName = loanAccount?.name ?? "Préstamo";
					const paid = loan.principal - loan.remaining;
					return (
						<GlassCard
							key={loan.id}
							className="flex cursor-pointer flex-col gap-4 p-6 transition-colors hover:bg-white/10"
						>
							<button
								type="button"
								onClick={() => navigate(`/app/accounts/${loan.accountId}`)}
								className="text-left"
							>
								<ProgressBar
									label={accountName}
									current={paid}
									total={loan.principal}
									currency={currency}
									locale={locale}
								/>
								<div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
									<span>
										Mensualidad:{" "}
										<span className="font-medium tabular-nums text-foreground">
											{formatCurrency(loan.monthlyPayment, currency, locale)}
										</span>
									</span>
									<span>
										Tasa:{" "}
										<span className="font-medium tabular-nums text-foreground">
											{loan.interestRate}%
										</span>
									</span>
									<span>
										Plazo:{" "}
										<span className="font-medium tabular-nums text-foreground">
											{loan.termMonths} meses
										</span>
									</span>
									<span className="ml-auto">
										Por pagar:{" "}
										<span className="font-medium tabular-nums text-destructive">
											{formatCurrency(loan.remaining, currency, locale)}
										</span>
									</span>
								</div>
							</button>
						</GlassCard>
					);
				})}
			</div>
		</div>
	);
};
