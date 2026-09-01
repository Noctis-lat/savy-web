import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOANS_QUERY_KEY, loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateLoanPayload }) =>
			loanService.updateLoan(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el prestamo");
		},
	});
};
