import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type UpdateSavingsGoalFormValues,
	updateSavingsGoalSchema,
} from "@/schemas/savings-goals/updateSavingsGoalSchema";
import { getSavingsGoalFormValues } from "@/utils/savings-goals/getSavingsGoalFormValues";
import { EditSavingsGoalForm } from "./components/edit-savings-goal-form";
import { EditSavingsGoalSubmit } from "./components/edit-savings-goal-submit";

type EditSavingsGoalProps = {
	savingsGoal: SavingsGoal;
};

export const EditSavingsGoal = ({ savingsGoal }: EditSavingsGoalProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const defaultValues: UpdateSavingsGoalFormValues = getSavingsGoalFormValues(savingsGoal);

	const editSavingsGoalForm = useForm<UpdateSavingsGoalFormValues>({
		resolver: zodResolver(updateSavingsGoalSchema),
		mode: "onChange",
		defaultValues,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			editSavingsGoalForm.reset(defaultValues);
		}
	};

	return (
		<FormProvider {...editSavingsGoalForm}>
			<Modal
				icon={Edit3}
				title={`Editar ${savingsGoal.name}`}
				description="Modifica la información de tu meta de ahorro."
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<EditSavingsGoalForm />}
				actions={
					<EditSavingsGoalSubmit
						savingsGoalId={savingsGoal.id}
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
