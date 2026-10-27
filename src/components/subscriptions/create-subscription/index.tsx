import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Repeat } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_SUBSCRIPTION_DEFAULT_VALUES } from "@/content/subscriptions/createSubscriptionValues";
import {
	type CreateSubscriptionFormValues,
	createSubscriptionSchema,
} from "@/schemas/subscriptions/createSubscriptionSchema";
import { CreateSubscriptionForm } from "./components/create-subscription-form";
import { CreateSubscriptionSubmit } from "./components/create-subscription-submit";

type CreateSubscriptionProps = {
	mode?: "button" | "icon" | "card";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
};

export const CreateSubscription = ({
	mode = "button",
	size = "default",
}: CreateSubscriptionProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const createSubscriptionDefaultValues: CreateSubscriptionFormValues = {
		...CREATE_SUBSCRIPTION_DEFAULT_VALUES,
	};

	const createSubscriptionForm = useForm<CreateSubscriptionFormValues>({
		resolver: zodResolver(createSubscriptionSchema),
		mode: "onChange",
		defaultValues: createSubscriptionDefaultValues,
	});

	const closeModal = (): void => {
		setOpen(false);
		setIsSaving(false);
		createSubscriptionForm.reset(createSubscriptionDefaultValues);
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
		<FormProvider {...createSubscriptionForm}>
			<Modal
				icon={Repeat}
				title="Nueva suscripción"
				description="Registra una nueva suscripción"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateSubscriptionForm />}
				actions={
					<CreateSubscriptionSubmit
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
						aria-label="Nueva suscripción"
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
						<Repeat className="size-6" />
						<span className="text-sm">Agregar suscripción</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<Plus />
						Nueva suscripción
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
