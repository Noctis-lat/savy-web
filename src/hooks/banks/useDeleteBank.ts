import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BANKS_QUERY_KEY, bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => bankService.deleteBank(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: BANKS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el banco");
		},
	});
};
