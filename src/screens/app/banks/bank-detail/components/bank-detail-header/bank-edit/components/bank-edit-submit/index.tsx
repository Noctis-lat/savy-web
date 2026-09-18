import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { bankKeys } from "@/content/services";
import { useUpdateBank } from "@/hooks/banks/useUpdateBank";
import type { CreateBankFormValues } from "@/schemas/banks/createBanksSchema";

type BankEditSubmitProps = {
	bankId: string;
	onSuccess?: () => void;
};

export const BankEditSubmit = ({ bankId, onSuccess }: BankEditSubmitProps): React.ReactElement => {
	const bankEditForm = useFormContext<CreateBankFormValues>();
	const { mutate: updateBank, isPending } = useUpdateBank();
	const queryClient = useQueryClient();

	const onSubmit = (bankEditData: CreateBankFormValues) => {
		updateBank(
			{ id: bankId, payload: bankEditData },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: [bankKeys.bank, bankId] });
					queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={bankEditForm.handleSubmit(onSubmit)}
			disabled={!bankEditForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cambios
				</>
			)}
		</Button>
	);
};
