import { Save } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateService } from "@/hooks/services/useCreateService";
import type { CreateBillFormValues } from "@/schemas/bills/createBillSchema";

type CreateBillSubmitProps = {
	onSuccess?: () => void;
	onPendingChange?: (isPending: boolean) => void;
};

export const CreateBillSubmit = ({
	onSuccess,
	onPendingChange,
}: CreateBillSubmitProps): React.ReactElement => {
	const createBillForm = useFormContext<CreateBillFormValues>();
	const { mutate: createService, isPending } = useCreateService();

	useEffect(() => {
		onPendingChange?.(isPending);
	}, [isPending, onPendingChange]);

	useEffect(() => () => onPendingChange?.(false), [onPendingChange]);

	const onSubmit = (data: CreateBillFormValues): void => {
		const payload: CreateServicePayload = {
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

		createService(payload, { onSuccess: () => onSuccess?.() });
	};

	return (
		<Button
			type="button"
			onClick={createBillForm.handleSubmit(onSubmit)}
			disabled={!createBillForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar servicio
				</>
			)}
		</Button>
	);
};
