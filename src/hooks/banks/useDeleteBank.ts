import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => bankService.deleteBank(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bankKeys.banks() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el banco");
		},
	});
};
