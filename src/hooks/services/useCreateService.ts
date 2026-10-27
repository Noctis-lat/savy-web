import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceKeys } from "@/content/services";
import { serviceService } from "@/services/services";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateServicePayload) => serviceService.createService(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [serviceKeys.services] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el servicio");
		},
	});
};
