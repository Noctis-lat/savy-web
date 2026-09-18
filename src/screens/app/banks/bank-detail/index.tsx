import { useQueryClient } from "@tanstack/react-query";
import { Landmark } from "lucide-react";
import type React from "react";
import { useParams } from "react-router";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { bankKeys } from "@/content/services";
import { useQueryBank } from "@/hooks/banks/useQueryBank";
import { BankDetailAccounts } from "./components/bank-detail-accounts";
import { BankDetailHeader } from "./components/bank-detail-header";
import { BankDetailHero } from "./components/bank-detail-hero";
import { BankDetailLoans } from "./components/bank-detail-loans";
import { BankDetailSkeleton } from "./components/bank-detail-skeleton";
import { BankDetailTopCategories } from "./components/bank-detail-top-categories";

export const BankDetail = (): React.ReactElement => {
	const { id } = useParams<{ id: string }>();
	const bankId = id ?? "";

	const { bank, isLoading } = useQueryBank(bankId, true);
	const queryClient = useQueryClient();

	if (isLoading) {
		return <BankDetailSkeleton />;
	}

	if (!bank) {
		return (
			<Empty
				title="Banco no disponible"
				description="El banco que estás buscando no está disponible. Por favor, verifica la información o intenta nuevamente más tarde."
				icon={Landmark}
				action={{
					label: "Reintentar",
					onClick: () =>
						queryClient.invalidateQueries({
							queryKey: [bankKeys.bank, bankId, { info: true }],
						}),
				}}
			/>
		);
	}

	return (
		<div className="flex flex-1 flex-col gap-6 p-6">
			<BankDetailHeader bank={bank} />
			<BankDetailHero bank={bank} />
			<BankDetailTopCategories bankId={bankId} />
			<BankDetailAccounts bankId={bankId} />
			<BankDetailLoans bankId={bankId} />
		</div>
	);
};
