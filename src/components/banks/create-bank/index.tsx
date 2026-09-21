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

type CreateBankProps = {
	mode?: "button" | "icon";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const CreateBank = ({
	mode = "button",
	size = "default",
}: CreateBankProps): React.ReactElement => {
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
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Agregar banco"
						className="text-primary hover:bg-primary/10"
					>
						<Plus className="size-4" />
					</Button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<Plus className="size-4" />
						Agregar banco
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
