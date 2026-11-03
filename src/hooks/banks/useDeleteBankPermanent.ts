import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bankKeys } from "@/content/services";
import { bankService } from "@/services/banks";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteBankPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => bankService.deleteBankPermanent(id),
		onSuccess: () => {
			toast.success("Banco eliminado permanentemente.");
			queryClient.invalidateQueries({ queryKey: [bankKeys.banks] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente el banco");
		},
	});
};
