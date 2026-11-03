import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => incomeSourceService.activateIncomeSource(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [incomeSourceKeys.incomeSources] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar la fuente de ingreso");
		},
	});
};
