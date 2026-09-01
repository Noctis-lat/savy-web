import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOANS_QUERY_KEY, loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => loanService.deleteLoan(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar el prestamo");
		},
	});
};
