import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ROUTES } from "@/app/router/routes";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { useCreateBudget } from "@/hooks/budgets/useCreateBudget";
import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { buildBudgetPayload } from "@/utils/budgets/buildBudgetPayload";

export const CreateBudgetSubmit = (): React.ReactElement => {
	const createBudgetForm = useFormContext<CreateBudgetFormValues>();
	const navigate = useNavigate();

	const { mutate: createBudget, isPending } = useCreateBudget();

	const onSubmit = (values: CreateBudgetFormValues): void => {
		createBudget(buildBudgetPayload(values), {
			onSuccess: () => {
				toast.success("Presupuesto creado");
				createBudgetForm.reset();
				navigate(ROUTES.APP.BUDGETS.ROOT);
			},
		});
	};

	return (
		<Button
			type="button"
			onClick={createBudgetForm.handleSubmit(onSubmit)}
			disabled={!createBudgetForm.formState.isValid || isPending}
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
					Guardar presupuesto
				</>
			)}
		</Button>
	);
};
