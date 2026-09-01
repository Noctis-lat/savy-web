import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNTS_QUERY_KEY, accountService } from "@/services/accounts";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateAccountPayload }) =>
			accountService.updateAccount(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la cuenta");
		},
	});
};
