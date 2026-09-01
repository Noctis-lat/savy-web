import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BANKS_QUERY_KEY, bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateBankPayload) => bankService.createBank(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BANKS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el banco");
		},
	});
};
