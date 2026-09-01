import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incomeSourceKeys } from "@/content/services";
import { incomeSourceService } from "@/services/income-sources";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateIncomeSource = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateIncomeSourcePayload }) =>
			incomeSourceService.updateIncomeSource(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: incomeSourceKeys.incomeSources() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la fuente de ingreso");
		},
	});
};
