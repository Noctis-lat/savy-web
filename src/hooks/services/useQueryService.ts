import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "@/content/services";
import { serviceService } from "@/services/services";

export const useQueryService = (
	id: string | undefined,
): {
	service: RecurringExpense | undefined;
	isLoading: boolean;
} => {
	const serviceQuery = useQuery({
		queryKey: [serviceKeys.service, id],
		queryFn: () => serviceService.getService(id as string),
		enabled: id !== undefined,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		service: serviceQuery.data,
		isLoading: serviceQuery.isLoading,
	};
};
