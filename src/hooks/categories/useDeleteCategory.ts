import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY, categoryService } from "@/services/categories";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => categoryService.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al eliminar la categoria");
		},
	});
};
