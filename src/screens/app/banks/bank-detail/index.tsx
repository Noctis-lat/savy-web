import { useQueryClient } from "@tanstack/react-query";
import { Landmark } from "lucide-react";
import type React from "react";
import { useNavigate, useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { bankKeys } from "@/content/services";
import { PERMANENT_DELETE_CONSEQUENCES } from "@/content/ui/permanentDeleteConsequences";
import { useActivateBank } from "@/hooks/banks/useActivateBank";
import { useDeleteBank } from "@/hooks/banks/useDeleteBank";
import { useDeleteBankPermanent } from "@/hooks/banks/useDeleteBankPermanent";
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
	const navigate = useNavigate();

	const { bank, isLoading } = useQueryBank(bankId, true);
	const queryClient = useQueryClient();
	const { mutate: deleteBank, isPending: isDeactivating } = useDeleteBank();
	const { mutate: activateBank, isPending: isReactivating } = useActivateBank();
	const { mutate: deleteBankPermanent, isPending: isDeleting } = useDeleteBankPermanent();

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
		<div className="flex flex-1 flex-col gap-6 sm:p-6">
			<BankDetailHeader bank={bank} />
			<BankDetailHero bank={bank} />
			<BankDetailTopCategories bankId={bankId} />
			<BankDetailAccounts bankId={bankId} />
			<BankDetailLoans bankId={bankId} />
			<DangerZone
				entityName={bank.name}
				entityLabel="el banco"
				isActive={bank.isActive}
				onDeactivate={() => deleteBank(bankId)}
				onReactivate={() => activateBank(bankId)}
				onPermanentDelete={() =>
					deleteBankPermanent(bankId, { onSuccess: () => navigate(ROUTES.APP.BANKS.ROOT) })
				}
				isDeactivating={isDeactivating}
				isReactivating={isReactivating}
				isDeleting={isDeleting}
				permanentDeleteDescription={PERMANENT_DELETE_CONSEQUENCES.bank}
			/>
		</div>
	);
};
