import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import {
	type UpdateCategoryFormValues,
	updateCategorySchema,
} from "@/schemas/categories/updateCategorySchema";
import { EditCategoryForm } from "./components/edit-category-form";
import { EditCategorySubmit } from "./components/edit-category-submit";

type EditCategoryProps = {
	category: Category;
};

export const EditCategory = ({ category }: EditCategoryProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: updateCategory, isPending } = useUpdateCategory();

	const editCategoryForm = useForm<UpdateCategoryFormValues>({
		resolver: zodResolver(updateCategorySchema),
		mode: "onChange",
		defaultValues: {
			name: category.name,
			color: category.color ?? undefined,
			icon: category.icon ?? undefined,
		},
	});

	const handleOpenChange = (next: boolean): void => {
		if (isPending && !next) return;
		setOpen(next);
		if (!next) {
			editCategoryForm.reset({
				name: category.name,
				color: category.color ?? undefined,
				icon: category.icon ?? undefined,
			});
		}
	};

	return (
		<FormProvider {...editCategoryForm}>
			<Modal
				icon={PenLine}
				title="Editar categoría"
				description="Modifica la información de tu categoría."
				openModal={open}
				setOpenModal={handleOpenChange}
				closeDisabled={isPending}
				content={<EditCategoryForm />}
				actions={
					<EditCategorySubmit
						categoryId={category.id}
						updateCategory={updateCategory}
						isPending={isPending}
						onSuccess={() => handleOpenChange(false)}
					/>
				}
				showCancel
			>
				<ScaleFadeIn className="absolute -top-3 right-13">
					<Button
						className="rounded-full"
						variant="outline"
						size="icon-sm"
						aria-label="Editar categoría"
						onClick={() => setOpen(true)}
					>
						<PenLine />
					</Button>
				</ScaleFadeIn>
			</Modal>
		</FormProvider>
	);
};
