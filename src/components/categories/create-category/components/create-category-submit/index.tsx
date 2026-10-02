import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import type { CreateCategoryFormValues } from "@/schemas/categories/createCategorySchema";

type CreateCategorySubmitProps = {
	onCreated?: (category: Category) => void;
	onCancel?: () => void;
	isEmbedded?: boolean;
};

export const CreateCategorySubmit = ({
	onCreated,
	onCancel,
	isEmbedded = false,
}: CreateCategorySubmitProps): React.ReactElement => {
	const createCategoryForm = useFormContext<CreateCategoryFormValues>();
	const { mutate: createCategory, isPending } = useCreateCategory();

	const onSubmit = (categoryData: CreateCategoryFormValues) => {
		createCategory(categoryData, {
			onSuccess: (createdCategory) => {
				createCategoryForm.reset();
				onCreated?.(createdCategory);
			},
		});
	};

	if (isEmbedded) {
		return (
			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={isPending}
				>
					Cancelar
				</Button>
				<Button
					type="button"
					onClick={createCategoryForm.handleSubmit(onSubmit)}
					disabled={!createCategoryForm.formState.isValid || isPending}
				>
					{isPending ? (
						<>
							<Spinner size={16} />
							Guardando...
						</>
					) : (
						<>
							<Save className="size-4" />
							Guardar categoría
						</>
					)}
				</Button>
			</div>
		);
	}

	return (
		<Button
			type="button"
			onClick={createCategoryForm.handleSubmit(onSubmit)}
			disabled={!createCategoryForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar categoría
				</>
			)}
		</Button>
	);
};
