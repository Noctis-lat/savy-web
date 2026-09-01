import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "@/content/services";
import { accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateAccountPayload }) =>
			accountService.updateAccount(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: accountKeys.accounts() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la cuenta");
		},
	});
};
