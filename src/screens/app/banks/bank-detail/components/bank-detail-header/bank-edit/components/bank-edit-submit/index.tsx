import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateBank } from "@/hooks/banks/useUpdateBank";
import type { CreateBankFormValues } from "@/schemas/banks/createBanksSchema";

type BankEditSubmitProps = {
	bankId: string;
	onSuccess?: () => void;
};

export const BankEditSubmit = ({ bankId, onSuccess }: BankEditSubmitProps): React.ReactElement => {
	const bankEditForm = useFormContext<CreateBankFormValues>();
	const { mutate: updateBank, isPending } = useUpdateBank();

	const onSubmit = (bankEditData: CreateBankFormValues) => {
		updateBank(
			{ id: bankId, payload: bankEditData },
			{
				onSuccess: () => {
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
