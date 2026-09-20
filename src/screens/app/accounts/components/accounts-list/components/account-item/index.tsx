import { ChevronRight, Dot } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { getAccountTypeLabel } from "@/utils/accounts/getAccountTypeLabel";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { buildRoute } from "@/utils/routing/buildRoute";
import { merge } from "@/utils/ui/mergeStyles";

type AccountItemProps = {
	account: Account;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const AccountItem = ({ account }: AccountItemProps): React.ReactElement => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(buildRoute(ROUTES.APP.ACCOUNTS.DETAIL, { account_id: account.id }));
	};

	const { bank, isLoading } = useQueryBank(account.bankId);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={merge(
				"flex w-full cursor-pointer items-center gap-3 border-b border-border/30 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-white/20",
				!account.isActive && "opacity-60",
			)}
		>
			<span
				className="size-3 shrink-0 rounded-full"
				style={{ backgroundColor: account.color ?? PRIMARY_FALLBACK }}
			/>

			<div className="flex flex-1 flex-col gap-0.5">
				<div className="flex flex-row items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{account.name}</span>
					{!account.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}
				</div>
				{isLoading ? (
					<Skeleton />
				) : (
					<div className="flex flex-row items-center gap-1 text-muted-foreground">
						{bank && (
							<>
								<span className="text-xs tabular-nums text-muted-foreground">{bank.name}</span>
								<Dot />
							</>
						)}
						<span className="text-xs tabular-nums text-muted-foreground">
							{getAccountTypeLabel(account.type)}
						</span>
					</div>
				)}
			</div>

			<span className="text-sm tabular-nums text-muted-foreground">
				{formatCurrency(account.balance)}
			</span>
			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
