import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => loanService.deleteLoan(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el prestamo");
		},
	});
};
