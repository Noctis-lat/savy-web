import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { type UpdateBillFormValues, updateBillSchema } from "@/schemas/bills/updateBillSchema";
import { EditBillForm } from "./components/edit-bill-form";
import { EditBillSubmit } from "./components/edit-bill-submit";

type EditBillProps = {
	recurringExpense: RecurringExpense;
};

export const EditBill = ({ recurringExpense }: EditBillProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateBillFormValues = {
		name: recurringExpense.name,
		amount: recurringExpense.amount,
		frequency: recurringExpense.frequency,
		billingDays: recurringExpense.billingDays,
		accountId: recurringExpense.accountId,
		categoryId: recurringExpense.categoryId,
		url: recurringExpense.url,
		color: recurringExpense.color,
		icon: recurringExpense.icon,
	};

	const editBillForm = useForm<UpdateBillFormValues>({
		resolver: zodResolver(updateBillSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editBillForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editBillForm}>
			<Modal
				icon={Edit3}
				title="Editar servicio"
				description="Modifica la información de tu servicio"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditBillForm />}
				actions={
					<EditBillSubmit
						billId={recurringExpense.id}
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
