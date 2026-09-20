import { ChevronRight } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type Props = {
	bank: BankWithStats;
	onClick: () => void;
};

const PRIMARY_FALLBACK = "oklch(0.511 0.096 186.391)";

export const BankRow = ({ bank, onClick }: Props): React.ReactElement => {
	const accountLabel = bank.accountCount === 1 ? "cuenta" : "cuentas";
	const typesLabel = bank.accountTypes.length > 0 ? bank.accountTypes.join(", ") : "Sin cuentas";
	const bankColor = bank.color ?? PRIMARY_FALLBACK;

	const gradientStyle = {
		background: `linear-gradient(135deg, color-mix(in oklch, ${bankColor} 12%, transparent) 0%, color-mix(in oklch, ${bankColor} 5%, transparent) 60%, transparent 100%)`,
	};

	return (
		<button
			type="button"
			onClick={onClick}
			className={merge(
				"flex w-full cursor-pointer items-center gap-3 overflow-hidden border-b border-border/30 px-4 py-3 text-left transition-all last:border-b-0 hover:brightness-115",
				!bank.isActive && "opacity-60",
			)}
			style={gradientStyle}
		>
			<span
				className="size-3 shrink-0 rounded-full"
				style={{ backgroundColor: bankColor }}
			/>

			<div className="flex flex-1 flex-col gap-0.5">
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold text-foreground">{bank.name}</span>
					{!bank.isActive && (
						<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
							Inactivo
						</span>
					)}
				</div>
				<span className="text-xs text-muted-foreground">{typesLabel}</span>
			</div>

			<span className="text-sm tabular-nums text-muted-foreground">
				{bank.accountCount} {accountLabel}
			</span>

			<ChevronRight className="size-4 shrink-0 text-muted-foreground" />
		</button>
	);
};
