import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateTransactionFormValues,
	updateTransactionSchema,
} from "@/schemas/transactions/updateTransactionSchema";
import { EditTransactionForm } from "./components/edit-transaction-form";
import { EditTransactionSubmit } from "./components/edit-transaction-submit";

type EditTransactionProps = {
	transaction: Transaction;
	mode?: "button" | "icon";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const EditTransaction = ({
	transaction,
	mode = "button",
	size = "default",
}: EditTransactionProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateTransactionFormValues = {
		accountId: transaction.accountId,
		type: transaction.type,
		amount: transaction.amount,
		destinationAccountId: transaction.destinationAccountId ?? undefined,
		categoryId: transaction.categoryId ?? undefined,
		description: transaction.description ?? undefined,
		note: transaction.note ?? undefined,
		date: transaction.date ?? undefined,
	};

	const editTransactionForm = useForm<UpdateTransactionFormValues>({
		resolver: zodResolver(updateTransactionSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editTransactionForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editTransactionForm}>
			<Modal
				icon={Pencil}
				title="Editar transacción"
				description="Modifica los datos de la transacción"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditTransactionForm />}
				actions={
					<EditTransactionSubmit
						transactionId={transaction.id}
						onSuccess={() => handleOpenChange(false)}
					/>
				}
				showCancel
			>
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Editar transacción"
						className="text-primary hover:bg-primary/10"
					>
						<Pencil className="size-4" />
					</Button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<Pencil className="size-4" />
						Editar transacción
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
