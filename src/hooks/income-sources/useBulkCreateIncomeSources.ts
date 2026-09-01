import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useBulkCreateIncomeSources = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: { sources: CreateIncomeSourcePayload[] }) =>
			incomeSourceService.bulkCreateIncomeSources(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: incomeSourceKeys.incomeSources() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear las fuentes de ingreso");
		},
	});
};
