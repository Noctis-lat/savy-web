import { zodResolver } from "@hookform/resolvers/zod";
import { Landmark, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_BANK_DEFAULT_VALUES } from "@/content/banks/createBankValues";
import { type CreateBankFormValues, createBankSchema } from "@/schemas/banks/createBanksSchema";
import { CreateBankForm } from "./components/create-bank-form";
import { CreateBankSubmit } from "./components/create-bank-submit";

export const CreateBank = (): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const createBankForm = useForm<CreateBankFormValues>({
		resolver: zodResolver(createBankSchema),
		mode: "onChange",
		defaultValues: CREATE_BANK_DEFAULT_VALUES,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			createBankForm.reset(CREATE_BANK_DEFAULT_VALUES);
		}
	};

	return (
		<FormProvider {...createBankForm}>
			<Modal
				icon={Landmark}
				title="Agregar banco"
				description="Agrega un nuevo banco a tu lista de bancos."
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateBankForm />}
				actions={<CreateBankSubmit onSuccess={() => handleOpenChange(false)} />}
				showCancel
			>
				<Button onClick={() => setOpen(true)}>
					<Plus className="size-4" />
					Agregar banco
				</Button>
			</Modal>
		</FormProvider>
	);
};
