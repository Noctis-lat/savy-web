import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateIncomeSourcePayload) =>
			incomeSourceService.createIncomeSource(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [incomeSourceKeys.incomeSources] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la fuente de ingreso");
		},
	});
};
