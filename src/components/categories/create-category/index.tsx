import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type CreateCategoryFormValues,
	createCategorySchema,
} from "@/schemas/categories/createCategorySchema";
import { CreateCategoryForm } from "./components/create-category-form";
import { CreateCategorySubmit } from "./components/create-category-submit";

type CreateCategoryProps = {
	mode?: "button" | "icon" | "card" | "embedded";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
	categoryType?: CategoryType;
	onCreated?: (category: Category) => void;
	onCancel?: () => void;
};

export const CreateCategory = ({
	mode = "button",
	size = "default",
	categoryType,
	onCreated,
	onCancel,
}: CreateCategoryProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const CREATE_CATEGORY_DEFAULT_VALUES: CreateCategoryFormValues = {
		name: "",
		type: categoryType ?? "EXPENSE",
		color: undefined,
		icon: undefined,
	};

	const createCategoryForm = useForm<CreateCategoryFormValues>({
		resolver: zodResolver(createCategorySchema),
		mode: "onChange",
		defaultValues: CREATE_CATEGORY_DEFAULT_VALUES,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			createCategoryForm.reset(CREATE_CATEGORY_DEFAULT_VALUES);
		}
	};

	const handleCreated = (category: Category) => {
		onCreated?.(category);
		if (mode !== "embedded") {
			handleOpenChange(false);
		}
	};

	const handleCancel = () => {
		createCategoryForm.reset(CREATE_CATEGORY_DEFAULT_VALUES);
		onCancel?.();
	};

	if (mode === "embedded") {
		return (
			<FormProvider {...createCategoryForm}>
				<div className="flex flex-col gap-4 rounded-lg border border-border/50 p-4 bg-muted/20">
					<CreateCategoryForm lockedType={categoryType} />
					<CreateCategorySubmit
						isEmbedded
						onCreated={handleCreated}
						onCancel={handleCancel}
					/>
				</div>
			</FormProvider>
		);
	}

	return (
		<FormProvider {...createCategoryForm}>
			<Modal
				icon={FolderPlus}
				title="Crear categoría"
				description="Crea una nueva categoría para organizar tus transacciones"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateCategoryForm lockedType={categoryType} />}
				actions={<CreateCategorySubmit onCreated={handleCreated} />}
				showCancel
			>
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Crear categoría"
						className="text-primary hover:bg-primary/10"
					>
						<Plus className="size-4" />
					</Button>
				) : mode === "card" ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex aspect-16/10 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary hover:bg-emerald-50/30"
					>
						<FolderPlus className="size-6" />
						<span className="text-sm">Agregar categoría</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<FolderPlus />
						Crear categoría
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
