import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateBankPayload) => bankService.createBank(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bankKeys.banks() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el banco");
		},
	});
};
