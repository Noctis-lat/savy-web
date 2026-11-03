import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeactivateIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => incomeSourceService.deactivateIncomeSource(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [incomeSourceKeys.incomeSources] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al desactivar la fuente de ingreso");
		},
	});
};
