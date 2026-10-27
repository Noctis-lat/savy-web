import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateSavingsGoal } from "@/hooks/savings-goals/useUpdateSavingsGoal";
import type { UpdateSavingsGoalFormValues } from "@/schemas/savings-goals/updateSavingsGoalSchema";
import { buildUpdateSavingsGoalPayload } from "@/utils/savings-goals/buildUpdateSavingsGoalPayload";

type EditSavingsGoalSubmitProps = {
	savingsGoalId: string;
	onSuccess?: () => void;
};

export const EditSavingsGoalSubmit = ({
	savingsGoalId,
	onSuccess,
}: EditSavingsGoalSubmitProps): React.ReactElement => {
	const editSavingsGoalForm = useFormContext<UpdateSavingsGoalFormValues>();

	const { mutate: updateSavingsGoal, isPending } = useUpdateSavingsGoal();

	const onSubmit = (values: UpdateSavingsGoalFormValues): void => {
		updateSavingsGoal(
			{ id: savingsGoalId, payload: buildUpdateSavingsGoalPayload(values) },
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
			onClick={editSavingsGoalForm.handleSubmit(onSubmit)}
			disabled={!editSavingsGoalForm.formState.isValid || isPending}
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
