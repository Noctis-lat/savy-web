import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY, categoryService } from "@/services/categories";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateCategoryPayload) => categoryService.createCategory(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al crear la categoria");
		},
	});
};
