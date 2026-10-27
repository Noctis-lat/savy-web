import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceKeys } from "@/content/services";
import { serviceService } from "@/services/services";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCancelService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => serviceService.cancelService(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [serviceKeys.services] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al cancelar el servicio");
		},
	});
};
