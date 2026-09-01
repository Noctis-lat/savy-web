import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOANS_QUERY_KEY, loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateLoanPayload) => loanService.createLoan(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: LOANS_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el prestamo");
		},
	});
};
