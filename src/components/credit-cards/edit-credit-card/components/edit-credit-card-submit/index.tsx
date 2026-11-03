import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateCreditCard } from "@/hooks/credit-cards/useUpdateCreditCard";
import type { UpdateCreditCardFormValues } from "@/schemas/credit-cards/updateCreditCardSchema";
import { percentToRate } from "@/utils/accounts/percentToRate";

type EditCreditCardSubmitProps = {
	creditCardId: string;
	onSuccess?: () => void;
};

export const EditCreditCardSubmit = ({
	creditCardId,
	onSuccess,
}: EditCreditCardSubmitProps): React.ReactElement => {
	const editCreditCardForm = useFormContext<UpdateCreditCardFormValues>();
	const { mutate: updateCreditCard, isPending } = useUpdateCreditCard();

	const onSubmit = (formValues: UpdateCreditCardFormValues): void => {
		const { accountId: _accountId, paymentAccountId, interestRate, ...rest } = formValues;

		const payload: UpdateCreditCardPayload = {
			...rest,
			...(interestRate !== undefined && { interestRate: percentToRate(interestRate) }),
			// "" means the user chose "Sin cuenta" → clear; undefined means no change → omit.
			...(paymentAccountId === "" && { paymentAccountId: null }),
			...(paymentAccountId && paymentAccountId !== "" && { paymentAccountId }),
		};

		updateCreditCard(
			{ id: creditCardId, payload },
			{
				onSuccess: () => {
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editCreditCardForm.handleSubmit(onSubmit)}
			disabled={!editCreditCardForm.formState.isValid || isPending}
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
