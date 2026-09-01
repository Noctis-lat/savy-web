import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateLoanPayload) => loanService.createLoan(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el prestamo");
		},
	});
};
