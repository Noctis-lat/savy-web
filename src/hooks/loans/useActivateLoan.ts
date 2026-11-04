import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { accountKeys, loanKeys } from "@/content/services";
import { loanService } from "@/services/loans";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useActivateLoan = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => loanService.activateLoan(id),
		onSuccess: () => {
			toast.success("Préstamo reactivado.");
			queryClient.invalidateQueries({ queryKey: [loanKeys.loans] });
			queryClient.invalidateQueries({ queryKey: [loanKeys.loan] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.accounts] });
			queryClient.invalidateQueries({ queryKey: [accountKeys.account] });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al reactivar el préstamo");
		},
	});
};
