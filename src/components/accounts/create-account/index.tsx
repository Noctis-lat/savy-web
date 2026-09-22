import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCardPlus, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { CreateAccountForm } from "./components/create-account-form";
import { CreateAccountSubmit } from "./components/create-account-submit";

type CreateAccountProps = {
	mode?: "button" | "icon" | "card";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
	bankId?: string;
};

export const CreateAccount = ({
	mode = "button",
	size = "default",
	bankId,
}: CreateAccountProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const CREATE_ACCOUNT_DEFAULT_VALUES: CreateAccountFormValues = {
		name: "",
		type: "DEBIT",
		bankId: bankId || undefined,
		balance: 0,
		currency: "MXN",
		color: undefined,
		icon: undefined,
	};

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
				) : mode === "card" ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex aspect-16/10 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary hover:bg-emerald-50/30"
					>
						<CreditCardPlus className="size-6" />
						<span className="text-sm">Agregar cuenta</span>
					</button>
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
