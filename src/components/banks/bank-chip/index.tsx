import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type BankChipBank = {
	id: string;
	name: string;
	color: string | null;
	logo: string | null;
	accountCount: number;
};

type BankChipProps = {
	bank: BankChipBank;
	onClick?: () => void;
	className?: string;
};

export const BankChip = ({ bank, onClick, className }: BankChipProps): React.ReactElement => {
	const dotStyle = bank.color ? { backgroundColor: bank.color } : undefined;

	return (
		<button
			type="button"
			onClick={onClick}
			className={merge(
				"inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/40 px-3 py-1.5 text-sm backdrop-blur-md transition-colors hover:bg-white/60",
				!onClick && "cursor-default",
				className,
			)}
		>
			{bank.logo ? (
				<img
					src={bank.logo}
					alt=""
					className="size-6 shrink-0 rounded-full object-cover"
				/>
			) : (
				<span
					className="size-3.5 shrink-0 rounded-full"
					style={dotStyle}
					aria-hidden="true"
				/>
			)}

			<span className="truncate font-medium text-foreground">{bank.name}</span>

			<span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs tabular-nums text-primary">
				{bank.accountCount}
			</span>
		</button>
	);
};
