import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "@/content/services";
import { categoryService } from "@/services/categories";
import { apiErrorToast } from "@/utils/errors/apiErrorToast";

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: UpdateCategoryPayload }) =>
			categoryService.updateCategory(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: categoryKeys.categories() });
		},
		onError: (error: unknown) => {
			apiErrorToast(error, "Error al actualizar la categoria");
		},
	});
};
