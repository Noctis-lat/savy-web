import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BANKS_QUERY_KEY, bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateBankPayload }) =>
			bankService.updateBank(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BANKS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el banco");
		},
	});
};
