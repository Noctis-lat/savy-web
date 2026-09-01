import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateBankPayload }) =>
			bankService.updateBank(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bankKeys.banks() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el banco");
		},
	});
};
