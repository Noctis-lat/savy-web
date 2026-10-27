import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "@/content/services";
import { serviceService } from "@/services/services";

type useQueryServicesReturn = {
	services: RecurringExpense[] | undefined;
	servicesInfo: RecurringByTypeInfo | undefined;
	page: number | undefined;
	perPage: number | undefined;
	total: number | undefined;
	totalPages: number | undefined;
	isLoading: boolean;
};

export const useQueryServices = (params?: ServiceParams): useQueryServicesReturn => {
	const servicesQuery = useQuery({
		queryKey: [serviceKeys.services, params],
		queryFn: () => serviceService.getServices(params),
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});

	return {
		services: servicesQuery.data?.data,
		servicesInfo: servicesQuery.data?.info,
		page: servicesQuery.data?.page,
		perPage: servicesQuery.data?.perPage,
		total: servicesQuery.data?.total,
		totalPages: servicesQuery.data?.totalPages,
		isLoading: servicesQuery.isLoading,
	};
};
