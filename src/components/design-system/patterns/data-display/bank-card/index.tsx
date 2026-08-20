import type { LucideIcon } from "lucide-react";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import type React from "react";
import { formatCurrency } from "@/utils/formatters/formatCurrency";
import { merge } from "@/utils/ui/mergeStyles";

type BankCardProps = {
	account: Account;
	bankName: string;
	bankColor: string | null;
	creditCard?: { creditLimit: number };
	onClick?: () => void;
	className?: string;
};

const ACCOUNT_TYPE_ICON: Record<string, LucideIcon> = {
	DEBIT: Wallet,
	CASH: Wallet,
	CREDIT: CreditCard,
	LOAN: Landmark,
};

export const BankCard = ({
	account,
	bankName,
	bankColor,
	creditCard,
	onClick,
	className,
}: BankCardProps): React.ReactElement => {
	const Icon = ACCOUNT_TYPE_ICON[account.type] ?? Wallet;
	const lastFour = account.id.slice(-4);

	const gradientStyle = bankColor
		? { background: `linear-gradient(135deg, ${bankColor}, ${bankColor}88)` }
		: undefined;

	return (
		<button
			type="button"
			onClick={onClick}
			className={merge(
				"relative flex aspect-[16/10] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-3 text-left text-white shadow-lg shadow-black/10 transition-transform duration-200 ease-out hover:scale-[0.97]",
				!bankColor && "bg-primary/80",
				!account.isActive && "opacity-60",
				className,
			)}
			style={gradientStyle}
		>
			{/* Decorative circle */}
			<div
				className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-white/10"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -bottom-8 -left-4 size-16 rounded-full bg-white/5"
				aria-hidden="true"
			/>

			{/* Top row: bank name + large icon */}
			<div className="flex items-start justify-between">
				<span className="truncate text-[0.65rem] font-medium text-white/80">{bankName}</span>
				<Icon className="size-7 shrink-0 text-white/70" />
			</div>

			{/* Middle: account name */}
			<span className="truncate text-xs font-medium text-white/90">{account.name}</span>

			{/* Bottom: balance + secondary */}
			<div className="flex flex-col gap-0.5">
				<span className="text-base font-bold tabular-nums text-white">
					{formatCurrency(account.balance, account.currency)}
				</span>
				<span className="truncate text-[0.65rem] text-white/70">
					{account.type === "CREDIT" && creditCard
						? `Lim. ${formatCurrency(creditCard.creditLimit, account.currency)} • •••• ${lastFour}`
						: `•••• ${lastFour}`}
				</span>
			</div>
		</button>
	);
};
