import { Dot } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Badge } from "@/components/ui/badge";
import { PRIMARY_FALLBACK } from "@/content/app/common";
import { getAccountTypeLabel } from "@/utils/accounts/getAccountTypeLabel";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type AccountHeaderProps = {
	account: Account;
	bank: Bank | undefined;
};

export const AccountHeader = ({ account, bank }: AccountHeaderProps): React.ReactElement => {
	const balanceIsNegative = account.balance < 0;
	return (
		<ScaleFadeIn>
			<GlassCard className="p-6">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-row items-center gap-4">
						<span
							className="size-3 shrink-0 rounded-full"
							style={{ backgroundColor: account.color ?? PRIMARY_FALLBACK }}
						/>

						<div className="flex flex-col gap-1">
							<h1 className="text-lg font-semibold text-foreground">{account.name}</h1>
							<div className="flex items-center">
								{bank && (
									<>
										<p className="text-xs text-muted-foreground">{bank.name}</p>
										<Dot className="text-muted-foreground" />
									</>
								)}
								<p className="text-xs text-muted-foreground">{getAccountTypeLabel(account.type)}</p>
							</div>
						</div>

						{!account.isActive && (
							<Badge
								className="px-3 text-xs"
								variant={"outline"}
							>
								Inactiva
							</Badge>
						)}
					</div>

					<div className="flex flex-col gap-0.5 pr-6">
						<span className="text-xs text-muted-foreground">Balance de la cuenta</span>
						<span
							className={merge(
								"text-xl font-bold tabular-nums ",
								balanceIsNegative ? "text-destructive" : "text-foreground",
							)}
						>
							{formatCurrency(account.balance)}
						</span>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
