import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCardPlus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { CreateAccountForm } from "./components/create-account-form";
import { CreateAccountSubmit } from "./components/create-account-submit";

type CreateAccountProps = {
	mode?: "button" | "icon";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const CreateAccount = ({
	mode = "button",
	size = "default",
}: CreateAccountProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const createAccountForm = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
		defaultValues: CREATE_ACCOUNT_DEFAULT_VALUES,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			createAccountForm.reset(CREATE_ACCOUNT_DEFAULT_VALUES);
		}
	};

	return (
		<FormProvider {...createAccountForm}>
			<Modal
				icon={CreditCardPlus}
				title="Crear cuenta"
				description="Crea una nueva cuenta para llevar tus finanzas"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateAccountForm />}
				actions={<CreateAccountSubmit onSuccess={() => handleOpenChange(false)} />}
				showCancel
			>
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Crear cuenta"
						className="text-primary hover:bg-primary/10"
					>
						<Plus className="size-4" />
					</Button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<CreditCardPlus />
						Crear cuenta
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
