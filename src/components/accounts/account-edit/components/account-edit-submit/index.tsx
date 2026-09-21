import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { accountKeys } from "@/content/services";
import { useUpdateAccount } from "@/hooks/accounts/useUpdateAccount";
import type { UpdateAccountFormValues } from "@/schemas/accounts/updateAccountSchema";

type AccountEditSubmitProps = {
	accountId: string;
	onSuccess?: () => void;
};

export const AccountEditSubmit = ({
	accountId,
	onSuccess,
}: AccountEditSubmitProps): React.ReactElement => {
	const accountEditForm = useFormContext<UpdateAccountFormValues>();
	const { mutate: updateAccount, isPending } = useUpdateAccount();
	const queryClient = useQueryClient();

	const onSubmit = (accountEditData: UpdateAccountFormValues) => {
		updateAccount(
			{ id: accountId, payload: accountEditData },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: [accountKeys.account, accountId] });
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={accountEditForm.handleSubmit(onSubmit)}
			disabled={!accountEditForm.formState.isValid || isPending}
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
