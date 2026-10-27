import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Receipt } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_BILL_DEFAULT_VALUES } from "@/content/bills/createBillValues";
import { type CreateBillFormValues, createBillSchema } from "@/schemas/bills/createBillSchema";
import { CreateBillForm } from "./components/create-bill-form";
import { CreateBillSubmit } from "./components/create-bill-submit";

type CreateBillProps = {
	mode?: "button" | "icon" | "card";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const CreateBill = ({
	mode = "button",
	size = "default",
}: CreateBillProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const createBillDefaultValues: CreateBillFormValues = {
		...CREATE_BILL_DEFAULT_VALUES,
	};

	const createBillForm = useForm<CreateBillFormValues>({
		resolver: zodResolver(createBillSchema),
		mode: "onChange",
		defaultValues: createBillDefaultValues,
	});

	const closeModal = (): void => {
		setOpen(false);
		setIsSaving(false);
		createBillForm.reset(createBillDefaultValues);
	};

	const handleOpenChange = (next: boolean): void => {
		if (next) {
			setOpen(true);
			return;
		}
		if (isSaving) return;
		closeModal();
	};

	return (
		<FormProvider {...createBillForm}>
			<Modal
				icon={Receipt}
				title="Nuevo servicio"
				description="Registra un nuevo servicio recurrente"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateBillForm />}
				actions={
					<CreateBillSubmit
						onSuccess={closeModal}
						onPendingChange={setIsSaving}
					/>
				}
				showCancel
				closeDisabled={isSaving}
			>
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Nuevo servicio"
						className="text-primary hover:bg-primary/10"
					>
						<Plus className="size-4" />
					</Button>
				) : mode === "card" ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex aspect-16/10 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary hover:bg-primary/5"
					>
						<Receipt className="size-6" />
						<span className="text-sm">Agregar servicio</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<Plus />
						Nuevo servicio
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
