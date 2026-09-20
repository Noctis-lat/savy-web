import { ChevronRight, Dot } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
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
	const accountColor = account.color ?? PRIMARY_FALLBACK;

	const handleClick = () => {
		navigate(buildRoute(ROUTES.APP.ACCOUNTS.DETAIL, { account_id: account.id }));
	};

	const { bank, isLoading } = useQueryBank(account.bankId);

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${accountColor} 12%, transparent) 0%, color-mix(in oklch, ${accountColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className={merge(
				"relative flex w-full cursor-pointer items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0 hover:brightness-115",
				!account.isActive && "opacity-60",
			)}
			style={gradientStyle}
		>
			<div
				className="flex size-10 items-center justify-center shrink-0 rounded-full shadow-sm"
				style={{ backgroundColor: accountColor }}
			>
				<DynamicIcon
					name={(account.icon ?? "wallet") as IconName}
					className="text-white"
					size={20}
				/>
			</div>

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

			<span className="text-sm font-medium tabular-nums text-foreground">
				{formatCurrency(account.balance)}
			</span>
			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
