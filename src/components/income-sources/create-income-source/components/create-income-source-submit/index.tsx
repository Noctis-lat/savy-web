import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import type { useCreateIncomeSource } from "@/hooks/income-sources/useCreateIncomeSource";
import type { CreateIncomeSourceFormValues } from "@/schemas/income-sources/createIncomeSourceSchema";

type CreateIncomeSourceSubmitProps = {
	createIncomeSource: ReturnType<typeof useCreateIncomeSource>["mutate"];
	isPending: boolean;
	onCreated?: (incomeSource: IncomeSource) => void;
};

export const CreateIncomeSourceSubmit = ({
	createIncomeSource,
	isPending,
	onCreated,
}: CreateIncomeSourceSubmitProps): React.ReactElement => {
	const createIncomeSourceForm = useFormContext<CreateIncomeSourceFormValues>();

	const onSubmit = (values: CreateIncomeSourceFormValues): void => {
		createIncomeSource(values, {
			onSuccess: (createdIncomeSource) => {
				toast.success("Fuente de ingreso creada");
				onCreated?.(createdIncomeSource);
			},
		});
	};

	return (
		<Button
			type="button"
			onClick={createIncomeSourceForm.handleSubmit(onSubmit)}
			disabled={!createIncomeSourceForm.formState.isValid || isPending}
		>
			{isPending ? (
				<>
					<Spinner size={16} />
					Guardando...
				</>
			) : (
				<>
					<Save className="size-4" />
					Guardar fuente
				</>
			)}
		</Button>
	);
};
