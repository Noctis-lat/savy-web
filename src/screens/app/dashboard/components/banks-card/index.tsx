import { Landmark } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { CreateBank } from "@/components/banks/create-bank";
import { BankChip } from "@/components/design-system/patterns/data-display/bank-chip";
import { SummaryCard } from "@/components/design-system/patterns/data-display/summary-card";
import { Empty } from "@/components/design-system/patterns/feedback/empty";

type BanksCardProps = {
	banks: DashboardBank[];
	currency: string;
	locale: string;
	className?: string;
};

export const BanksCard = ({ banks, className }: BanksCardProps): React.ReactElement => {
	const navigate = useNavigate();
	const isEmpty = banks.length === 0;

	return (
		<SummaryCard
			title="Bancos"
			icon={Landmark}
			actionLabel="Ver todo"
			onAction={() => navigate(ROUTES.APP.BANKS.ROOT)}
			onCreate={() => navigate(ROUTES.APP.BANKS.ROOT)}
			className={className}
		>
			{isEmpty ? (
				<Empty
					title="Sin bancos"
					description="Registra un banco para organizar tus cuentas."
					action={<CreateBank size="sm" />}
				/>
			) : (
				<div className="flex flex-wrap gap-2">
					{banks.map((bank) => (
						<BankChip
							key={bank.id}
							bank={bank}
							onClick={() => navigate(ROUTES.APP.BANKS.ROOT)}
						/>
					))}
				</div>
			)}
		</SummaryCard>
	);
};
