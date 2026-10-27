import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateRecurringExpenseFormValues,
	updateRecurringExpenseSchema,
} from "@/schemas/recurring-expenses/updateRecurringExpenseSchema";
import { EditPaymentForm } from "./components/edit-payment-form";
import { EditPaymentSubmit } from "./components/edit-payment-submit";

type EditPaymentProps = {
	recurringExpense: RecurringExpense;
};

export const EditPayment = ({ recurringExpense }: EditPaymentProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateRecurringExpenseFormValues = {
		name: recurringExpense.name,
		amount: recurringExpense.amount,
		frequency: recurringExpense.frequency,
		billingDays: recurringExpense.billingDays,
		billingDate:
			recurringExpense.frequency === "YEARLY" && recurringExpense.billingDays[0]
				? `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(recurringExpense.billingDays[0]).padStart(2, "0")}`
				: undefined,
		accountId: recurringExpense.accountId,
		categoryId: recurringExpense.categoryId,
		url: recurringExpense.url,
		color: recurringExpense.color,
		icon: recurringExpense.icon,
	};

	const editPaymentForm = useForm<UpdateRecurringExpenseFormValues>({
		resolver: zodResolver(updateRecurringExpenseSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editPaymentForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editPaymentForm}>
			<Modal
				icon={Edit3}
				title="Editar gasto recurrente"
				description="Modifica la información de tu gasto recurrente"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditPaymentForm />}
				actions={
					<EditPaymentSubmit
						recurringExpenseId={recurringExpense.id}
						onSuccess={() => handleOpenChange(false)}
					/>
				}
				showCancel
			>
				<Button
					variant="outline"
					onClick={() => setOpen(true)}
				>
					<Edit3 className="size-4" />
					Editar
				</Button>
			</Modal>
		</FormProvider>
	);
};
