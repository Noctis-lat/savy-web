import { zodResolver } from "@hookform/resolvers/zod";
import { Tags, Wallet } from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { FormScreen } from "@/components/design-system/patterns/layouts/form-screen";
import { Screen } from "@/components/design-system/primitives/screen";
import { useQueryBudget } from "@/hooks/budgets/useQueryBudget";
import {
	type CreateBudgetFormValues,
	createBudgetSchema,
} from "@/schemas/budgets/createBudgetSchema";
import { CreateBudgetForm } from "@/screens/app/budgets/new/components/create-budget-form";
import { getBudgetFormValues } from "@/utils/budgets/getBudgetFormValues";
import { buildRoute } from "@/utils/routing/buildRoute";
import { EditBudgetSubmit } from "./components/edit-budget-submit";

const NAV_ITEMS: NavigatorItem[] = [
	{ sectionId: "general", label: "Información general", icon: Wallet },
	{ sectionId: "items", label: "Categorías y montos", icon: Tags },
];

export const BudgetEdit = (): React.ReactElement => {
	const { budget_id } = useParams<{ budget_id: string }>();
	const { budget, isLoading } = useQueryBudget(budget_id);

	const editBudgetForm = useForm<CreateBudgetFormValues>({
		resolver: zodResolver(createBudgetSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			kind: "RECURRING",
			period: "MONTHLY",
			startDate: "",
			endDate: undefined,
			items: [],
		},
	});

	useEffect(() => {
		if (budget) {
			editBudgetForm.reset(getBudgetFormValues(budget));
		}
	}, [budget, editBudgetForm]);

	if (isLoading) {
		return (
			<Screen
				backRoute={ROUTES.APP.BUDGETS.ROOT}
				breadcrumbsConfig={[
					{ label: "Inicio", href: ROUTES.APP.ROOT },
					{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
					{ label: "Editar" },
				]}
			>
				<div className="flex items-center justify-center py-20">
					<Wallet className="size-6 animate-pulse text-muted-foreground" />
				</div>
			</Screen>
		);
	}

	if (!budget) {
		return (
			<Screen
				backRoute={ROUTES.APP.BUDGETS.ROOT}
				breadcrumbsConfig={[
					{ label: "Inicio", href: ROUTES.APP.ROOT },
					{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
					{ label: "Editar" },
				]}
			>
				<p className="text-sm text-muted-foreground">No se encontró el presupuesto.</p>
			</Screen>
		);
	}

	return (
		<FormProvider {...editBudgetForm}>
			<Screen
				backRoute={buildRoute(ROUTES.APP.BUDGETS.DETAIL, { budget_id: budget.id })}
				breadcrumbsConfig={[
					{ label: "Inicio", href: ROUTES.APP.ROOT },
					{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
					{
						label: budget.name,
						href: buildRoute(ROUTES.APP.BUDGETS.DETAIL, { budget_id: budget.id }),
					},
					{ label: "Editar" },
				]}
			>
				<FormScreen
					formElement={<CreateBudgetForm />}
					submitElement={<EditBudgetSubmit />}
					navItems={NAV_ITEMS}
					navigatorTitle="Editar presupuesto"
					navigatorSubtitle="Modifica tus categorías y montos"
					navigatorIcon={Wallet}
				/>
				<div className="sm:hidden">
					<EditBudgetSubmit />
				</div>
			</Screen>
		</FormProvider>
	);
};
