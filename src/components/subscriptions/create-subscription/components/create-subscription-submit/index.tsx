import { Save } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateSubscription } from "@/hooks/subscriptions/useCreateSubscription";
import type { CreateSubscriptionFormValues } from "@/schemas/subscriptions/createSubscriptionSchema";

type CreateSubscriptionSubmitProps = {
	onSuccess?: () => void;
	onPendingChange?: (isPending: boolean) => void;
};

export const CreateSubscriptionSubmit = ({
	onSuccess,
	onPendingChange,
}: CreateSubscriptionSubmitProps): React.ReactElement => {
	const createSubscriptionForm = useFormContext<CreateSubscriptionFormValues>();
	const { mutate: createSubscription, isPending } = useCreateSubscription();

	useEffect(() => {
		onPendingChange?.(isPending);
	}, [isPending, onPendingChange]);

	useEffect(() => () => onPendingChange?.(false), [onPendingChange]);

	const onSubmit = (data: CreateSubscriptionFormValues): void => {
		const payload: CreateSubscriptionPayload = {
			name: data.name,
			amount: data.amount,
			frequency: data.frequency,
			billingDays:
				data.frequency === "BIWEEKLY" && data.billingDay2 !== undefined
					? [data.billingDay, data.billingDay2]
					: [data.billingDay],
			accountId: data.accountId,
			categoryId: data.categoryId || undefined,
			url: data.url || undefined,
			color: data.color || undefined,
			icon: data.icon || undefined,
		};

		createSubscription(payload, { onSuccess: () => onSuccess?.() });
	};

	return (
		<Button
			type="button"
			onClick={createSubscriptionForm.handleSubmit(onSubmit)}
			disabled={!createSubscriptionForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar suscripción
				</>
			)}
		</Button>
	);
};
