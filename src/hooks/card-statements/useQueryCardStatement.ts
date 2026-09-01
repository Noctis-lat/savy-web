import { useQuery } from "@tanstack/react-query";
import { cardStatementService } from "@/services/card-statements";

export const useQueryCardStatement = (id: string) => {
	return useQuery({
		queryKey: ["card-statements", id] as const,
		queryFn: () => cardStatementService.getCardStatement(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
