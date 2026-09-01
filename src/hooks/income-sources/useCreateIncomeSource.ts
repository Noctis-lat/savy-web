import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INCOME_SOURCES_QUERY_KEY, incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateIncomeSourcePayload) =>
			incomeSourceService.createIncomeSource(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: INCOME_SOURCES_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la fuente de ingreso");
		},
	});
};
