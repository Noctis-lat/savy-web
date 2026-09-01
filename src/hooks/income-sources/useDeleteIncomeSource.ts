import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INCOME_SOURCES_QUERY_KEY, incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => incomeSourceService.deleteIncomeSource(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: INCOME_SOURCES_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la fuente de ingreso");
		},
	});
};
