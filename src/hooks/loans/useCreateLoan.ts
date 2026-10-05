import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountKeys, bankKeys, dashboardKeys, loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateLoanPayload) => loanService.createLoan(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankCreditCards] });
			queryClient.invalidateQueries({ queryKey: [bankKeys.bankLoans] });
			queryClient.invalidateQueries({ queryKey: [dashboardKeys.dashboardSummary] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear el prestamo");
		},
	});
};
