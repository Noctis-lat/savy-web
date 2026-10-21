import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useUpdateBudget } from "@/hooks/budgets/useUpdateBudget";
import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { buildUpdateBudgetPayload } from "@/utils/budgets/buildUpdateBudgetPayload";
import { buildRoute } from "@/utils/routing/buildRoute";

export const EditBudgetSubmit = (): React.ReactElement => {
	const { budget_id } = useParams<{ budget_id: string }>();
	const editBudgetForm = useFormContext<CreateBudgetFormValues>();
	const navigate = useNavigate();

	const { mutate: updateBudget, isPending } = useUpdateBudget();

	const onSubmit = (values: CreateBudgetFormValues): void => {
		updateBudget(
			{ id: budget_id as string, payload: buildUpdateBudgetPayload(values) },
			{
				onSuccess: () => {
					toast.success("Presupuesto actualizado");
					editBudgetForm.reset();
					navigate(buildRoute(ROUTES.APP.BUDGETS.DETAIL, { budget_id: budget_id as string }));
				},
			},
		);
	};

	return (
		<Button
			type="button"
			onClick={editBudgetForm.handleSubmit(onSubmit)}
			disabled={!editBudgetForm.formState.isValid || isPending}
			className="w-full"
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
