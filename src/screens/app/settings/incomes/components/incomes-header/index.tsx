import { Wallet } from "lucide-react";
import type React from "react";

type IncomesHeaderProps = {
	incomeSourcesLength: number;
};

export const IncomesHeader = ({ incomeSourcesLength }: IncomesHeaderProps): React.ReactElement => {
	return (
		<div className="flex flex-row items-center justify-center gap-2">
			<Wallet className="size-6 text-primary" />
			<div className="flex flex-col gap-1">
				<h3 className="text-sm font-medium text-foreground select-none">
					Fuentes de ingreso ({incomeSourcesLength})
				</h3>
				<p className="text-xs text-muted-foreground select-none">
					Administra de dónde viene tu dinero y cuándo lo recibes.
				</p>
			</div>
		</div>
	);
};
