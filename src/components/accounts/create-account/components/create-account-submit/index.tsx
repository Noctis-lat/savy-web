import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import type { CreateAccountFormValues } from "@/schemas/accounts/createAccountSchema";

type CreateAccountSubmitProps = {
	onSuccess?: () => void;
};

export const CreateAccountSubmit = ({
	onSuccess,
}: CreateAccountSubmitProps): React.ReactElement => {
	const createAccountForm = useFormContext<CreateAccountFormValues>();
	const { mutate: createAccount, isPending } = useCreateAccount();

	const onSubmit = (accountData: CreateAccountFormValues) => {
		createAccount(accountData, {
			onSuccess: () => {
				createAccountForm.reset();
				onSuccess?.();
			},
		});
	};

	return (
		<Button
			type="button"
			onClick={createAccountForm.handleSubmit(onSubmit)}
			disabled={!createAccountForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cuenta
				</>
			)}
		</Button>
	);
};
