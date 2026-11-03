import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteLoanPermanent = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => loanService.deleteLoanPermanent(id),
		onSuccess: () => {
			toast.success("Préstamo eliminado permanentemente.");
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar permanentemente el préstamo");
		},
	});
};
