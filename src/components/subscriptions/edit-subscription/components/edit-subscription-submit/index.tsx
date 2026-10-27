import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { subscriptionKeys } from "@/content/services";
import { useUpdateSubscription } from "@/hooks/subscriptions/useUpdateSubscription";
import type { UpdateSubscriptionFormValues } from "@/schemas/subscriptions/updateSubscriptionSchema";

type EditSubscriptionSubmitProps = {
	subscriptionId: string;
	onSuccess?: () => void;
};

export const EditSubscriptionSubmit = ({
	subscriptionId,
	onSuccess,
}: EditSubscriptionSubmitProps): React.ReactElement => {
	const editSubscriptionForm = useFormContext<UpdateSubscriptionFormValues>();
	const { mutate: updateSubscription, isPending } = useUpdateSubscription();
	const queryClient = useQueryClient();

	const onSubmit = (data: UpdateSubscriptionFormValues): void => {
		const payload: UpdateSubscriptionPayload = {
			name: data.name,
			amount: data.amount,
			frequency: data.frequency,
			billingDays: data.billingDays,
			accountId: data.accountId,
			categoryId: data.categoryId || undefined,
			url: data.url || undefined,
			color: data.color || undefined,
			icon: data.icon || undefined,
		};

		updateSubscription(
			{ id: subscriptionId, payload },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: [subscriptionKeys.subscription, subscriptionId],
					});
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editSubscriptionForm.handleSubmit(onSubmit)}
			disabled={!editSubscriptionForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar cambios
				</>
			)}
		</Button>
	);
};
