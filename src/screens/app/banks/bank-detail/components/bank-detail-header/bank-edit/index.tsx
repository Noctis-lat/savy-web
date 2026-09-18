import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateBankForm } from "@/components/banks/create-bank/components/create-bank-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { type CreateBankFormValues, createBankSchema } from "@/schemas/banks/createBanksSchema";
import { BankEditSubmit } from "./components/bank-edit-submit";

type BankEditProps = {
	bank: Bank;
};

export const BankEdit = ({ bank }: BankEditProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const bankEditForm = useForm<CreateBankFormValues>({
		resolver: zodResolver(createBankSchema),
		mode: "onChange",
		defaultValues: {
			name: bank.name,
			color: bank.color ?? undefined,
		},
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			bankEditForm.reset({
				name: bank.name,
				color: bank.color ?? undefined,
			});
		}
	};

	return (
		<FormProvider {...bankEditForm}>
			<Modal
				icon={Edit3}
				title="Editar banco"
				description="Modifica la información de tu banco."
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateBankForm />}
				actions={
					<BankEditSubmit
						bankId={bank.id}
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
