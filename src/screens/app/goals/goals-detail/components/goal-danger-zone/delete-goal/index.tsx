import { Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteSavingsGoal } from "@/hooks/savings-goals/useDeleteSavingsGoal";

type DeleteGoalProps = {
	savingsGoal: SavingsGoal;
};
export const DeleteGoal = ({ savingsGoal }: DeleteGoalProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>();
	const navigate = useNavigate();

	const { mutate: deleteGoal, isPending } = useDeleteSavingsGoal();

	const handleDelete = () => {
		deleteGoal(savingsGoal.id, {
			onSuccess: () => {
				setOpen(false);
				navigate(ROUTES.APP.GOALS.ROOT);
			},
		});
	};

	return (
		<ConfirmDialog
			title={`Borrar meta: ${savingsGoal.name}`}
			description={`Estas por borrar la meta: ${savingsGoal.name}, esto sera permanente y no hay forma de deshacerlo.`}
			onConfirm={handleDelete}
			onOpenChange={setOpen}
			open={open}
			disabled={isPending}
		>
			<Button variant={"destructive"}>
				<Trash2 />
				Eliminar
			</Button>
		</ConfirmDialog>
	);
};
