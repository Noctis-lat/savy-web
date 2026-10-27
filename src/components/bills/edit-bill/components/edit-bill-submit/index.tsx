import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { serviceKeys } from "@/content/services";
import { useUpdateService } from "@/hooks/services/useUpdateService";
import type { UpdateBillFormValues } from "@/schemas/bills/updateBillSchema";

type EditBillSubmitProps = {
	billId: string;
	onSuccess?: () => void;
};

export const EditBillSubmit = ({ billId, onSuccess }: EditBillSubmitProps): React.ReactElement => {
	const editBillForm = useFormContext<UpdateBillFormValues>();
	const { mutate: updateService, isPending } = useUpdateService();
	const queryClient = useQueryClient();

	const onSubmit = (data: UpdateBillFormValues): void => {
		const payload: UpdateServicePayload = {
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

		updateService(
			{ id: billId, payload },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: [serviceKeys.service, billId] });
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editBillForm.handleSubmit(onSubmit)}
			disabled={!editBillForm.formState.isValid || isPending}
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
