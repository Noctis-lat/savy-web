import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import type { useUpdateIncomeSource } from "@/hooks/income-sources/useUpdateIncomeSource";
import type { UpdateIncomeSourceFormValues } from "@/schemas/income-sources/updateIncomeSourceSchema";

type EditIncomeSourceSubmitProps = {
	incomeSourceId: string;
	updateIncomeSource: ReturnType<typeof useUpdateIncomeSource>["mutate"];
	isPending: boolean;
	onSuccess?: () => void;
};

export const EditIncomeSourceSubmit = ({
	incomeSourceId,
	updateIncomeSource,
	isPending,
	onSuccess,
}: EditIncomeSourceSubmitProps): React.ReactElement => {
	const editIncomeSourceForm = useFormContext<UpdateIncomeSourceFormValues>();

	const onSubmit = (values: UpdateIncomeSourceFormValues): void => {
		updateIncomeSource(
			{ id: incomeSourceId, payload: values },
			{
				onSuccess: () => {
					toast.success("Fuente de ingreso actualizada");
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editIncomeSourceForm.handleSubmit(onSubmit)}
			disabled={!editIncomeSourceForm.formState.isValid || isPending}
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
