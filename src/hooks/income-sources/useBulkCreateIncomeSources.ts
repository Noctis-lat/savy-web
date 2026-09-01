import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INCOME_SOURCES_QUERY_KEY, incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useBulkCreateIncomeSources = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: { sources: CreateIncomeSourcePayload[] }) =>
			incomeSourceService.bulkCreateIncomeSources(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: INCOME_SOURCES_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear las fuentes de ingreso");
		},
	});
};
