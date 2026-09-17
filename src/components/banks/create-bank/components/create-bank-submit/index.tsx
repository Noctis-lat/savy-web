import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateBank } from "@/hooks/banks/useCreateBank";
import type { CreateBankFormValues } from "@/schemas/banks/createBanksSchema";

type CreateBankSubmitProps = {
	onSuccess?: () => void;
};

export const CreateBankSubmit = ({ onSuccess }: CreateBankSubmitProps): React.ReactElement => {
	const createBankForm = useFormContext<CreateBankFormValues>();
	const { mutate: createBank, isPending } = useCreateBank();

	const onSubmit = (createBankData: CreateBankFormValues) => {
		createBank(createBankData, {
			onSuccess: () => {
				createBankForm.reset();
				onSuccess?.();
			},
		});
	};

	return (
		<Button
			type="button"
			onClick={createBankForm.handleSubmit(onSubmit)}
			disabled={!createBankForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar banco
				</>
			)}
		</Button>
	);
};
