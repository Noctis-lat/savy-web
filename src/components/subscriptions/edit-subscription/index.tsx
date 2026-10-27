import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateSubscriptionFormValues,
	updateSubscriptionSchema,
} from "@/schemas/subscriptions/updateSubscriptionSchema";
import { EditSubscriptionForm } from "./components/edit-subscription-form";
import { EditSubscriptionSubmit } from "./components/edit-subscription-submit";

type EditSubscriptionProps = {
	recurringExpense: RecurringExpense;
};

export const EditSubscription = ({
	recurringExpense,
}: EditSubscriptionProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateSubscriptionFormValues = {
		name: recurringExpense.name,
		amount: recurringExpense.amount,
		frequency: recurringExpense.frequency,
		billingDays: recurringExpense.billingDays,
		billingDate:
			recurringExpense.frequency === "YEARLY" && recurringExpense.billingDays[0]
				? `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(recurringExpense.billingDays[0]).padStart(2, "0")}`
				: undefined,
		accountId: recurringExpense.accountId,
		categoryId: recurringExpense.categoryId ?? undefined,
		url: recurringExpense.url ?? undefined,
		color: recurringExpense.color ?? undefined,
		icon: recurringExpense.icon ?? undefined,
	};

	const editSubscriptionForm = useForm<UpdateSubscriptionFormValues>({
		resolver: zodResolver(updateSubscriptionSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editSubscriptionForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editSubscriptionForm}>
			<Modal
				icon={Edit3}
				title="Editar suscripción"
				description="Modifica la información de tu suscripción"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditSubscriptionForm />}
				actions={
					<EditSubscriptionSubmit
						subscriptionId={recurringExpense.id}
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
