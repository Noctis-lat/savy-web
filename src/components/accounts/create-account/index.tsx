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
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const createAccountDefaultValues: CreateAccountFormValues = {
		...CREATE_ACCOUNT_DEFAULT_VALUES,
		bankId: bankId || undefined,
	};

	const createAccountForm = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
		defaultValues: createAccountDefaultValues,
	});

	const closeModal = (): void => {
		setOpen(false);
		setIsSaving(false);
		createAccountForm.reset(createAccountDefaultValues);
	};

	// User close requests are ignored while saving; success closes through `closeModal` directly
	// because `isSaving` may still be true in the same tick the chain completes.
	const handleOpenChange = (next: boolean): void => {
		if (next) {
			setOpen(true);
			return;
		}
		if (isSaving) return;
		closeModal();
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
				actions={
					<CreateAccountSubmit
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
