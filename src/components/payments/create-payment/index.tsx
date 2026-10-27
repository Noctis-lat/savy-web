import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_RECURRING_EXPENSE_DEFAULT_VALUES } from "@/content/recurring-expenses/createRecurringExpenseValues";
import {
	type CreateRecurringExpenseFormValues,
	createRecurringExpenseSchema,
} from "@/schemas/recurring-expenses/createRecurringExpenseSchema";
import { CreatePaymentForm } from "./components/create-payment-form";
import { CreatePaymentSubmit } from "./components/create-payment-submit";

type CreatePaymentProps = {
	mode?: "button" | "icon" | "card";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const CreatePayment = ({
	mode = "button",
	size = "default",
}: CreatePaymentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const createPaymentDefaultValues: CreateRecurringExpenseFormValues = {
		...CREATE_RECURRING_EXPENSE_DEFAULT_VALUES,
	};

	const createPaymentForm = useForm<CreateRecurringExpenseFormValues>({
		resolver: zodResolver(createRecurringExpenseSchema),
		mode: "onChange",
		defaultValues: createPaymentDefaultValues,
	});

	const closeModal = (): void => {
		setOpen(false);
		setIsSaving(false);
		createPaymentForm.reset(createPaymentDefaultValues);
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
		<FormProvider {...createPaymentForm}>
			<Modal
				icon={CalendarClock}
				title="Nuevo gasto recurrente"
				description="Registra un nuevo gasto que se repite periódicamente"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreatePaymentForm />}
				actions={
					<CreatePaymentSubmit
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
						aria-label="Nuevo gasto recurrente"
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
						<CalendarClock className="size-6" />
						<span className="text-sm">Agregar gasto recurrente</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<Plus />
						Nuevo gasto recurrente
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
