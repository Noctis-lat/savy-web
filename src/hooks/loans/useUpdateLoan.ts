import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateLoanPayload }) =>
			loanService.updateLoan(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar el prestamo");
		},
	});
};
