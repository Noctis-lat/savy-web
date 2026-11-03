import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateCreditCardFormValues,
	updateCreditCardSchema,
} from "@/schemas/credit-cards/updateCreditCardSchema";
import { EditCreditCardForm } from "./components/edit-credit-card-form";
import { EditCreditCardSubmit } from "./components/edit-credit-card-submit";

type EditCreditCardProps = {
	creditCard: CreditCard;
	mode?: "button" | "icon";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
	className?: string;
};

export const EditCreditCard = ({
	creditCard,
	mode = "button",
	size = "default",
	className,
}: EditCreditCardProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateCreditCardFormValues = {
		name: creditCard.name,
		creditLimit: creditCard.creditLimit,
		cutDay: creditCard.cutDay,
		paymentDay: creditCard.paymentDay ?? undefined,
		interestRate: creditCard.interestRate * 100,
		color: creditCard.color ?? undefined,
		icon: creditCard.icon ?? undefined,
		paymentAccountId: creditCard.paymentAccountId ?? undefined,
		accountId: creditCard.accountId,
	};

	const editCreditCardForm = useForm<UpdateCreditCardFormValues>({
		resolver: zodResolver(updateCreditCardSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editCreditCardForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editCreditCardForm}>
			<Modal
				icon={Pencil}
				title="Editar tarjeta"
				description={creditCard.name}
				iconVariant="default"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditCreditCardForm />}
				actions={
					<EditCreditCardSubmit
						creditCardId={creditCard.id}
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
						aria-label="Editar tarjeta"
						className={className ?? "text-primary hover:bg-primary/10"}
					>
						<Pencil className="size-4" />
					</Button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
						variant="outline"
						className={className}
					>
						<Pencil className="size-4" />
						Editar tarjeta
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
