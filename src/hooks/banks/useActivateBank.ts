import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateBank = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => bankService.activateBank(id),
		onSuccess: () => {
			toast.success("Banco reactivado.");
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bank] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar el banco");
		},
	});
};
