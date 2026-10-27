import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceKeys } from "@/content/services";
import { serviceService } from "@/services/services";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateServicePayload }) =>
			serviceService.updateService(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [serviceKeys.services] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el servicio");
		},
	});
};
