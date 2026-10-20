import { zodResolver } from "@hookform/resolvers/zod";
import { Tags, Wallet } from "lucide-react";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ROUTES } from "@/app/router/routes";
import { FormScreen } from "@/components/design-system/patterns/layouts/form-screen";
import { Screen } from "@/components/design-system/primitives/screen";
import { CREATE_BUDGET_DEFAULT_VALUES } from "@/content/budgets/createBudgetValues";
import type { CreateBudgetFormValues } from "@/schemas/budgets/createBudgetSchema";
import { createBudgetSchema } from "@/schemas/budgets/createBudgetSchema";
import { CreateBudgetForm } from "./components/create-budget-form";
import { CreateBudgetSubmit } from "./components/create-budget-submit";

const NAV_ITEMS: NavigatorItem[] = [
	{ sectionId: "general", label: "Información general", icon: Wallet },
	{ sectionId: "items", label: "Categorías y montos", icon: Tags },
];

export const BudgetNew = (): React.ReactElement => {
	const createBudgetForm = useForm<CreateBudgetFormValues>({
		resolver: zodResolver(createBudgetSchema),
		mode: "onChange",
		defaultValues: CREATE_BUDGET_DEFAULT_VALUES,
	});

	return (
		<FormProvider {...createBudgetForm}>
			<Screen
				backRoute={ROUTES.APP.BUDGETS.ROOT}
				breadcrumbsConfig={[
					{ label: "Inicio", href: ROUTES.APP.ROOT },
					{ label: "Presupuestos", href: ROUTES.APP.BUDGETS.ROOT },
					{ label: "Nuevo presupuesto" },
				]}
			>
				<FormScreen
					formElement={<CreateBudgetForm />}
					submitElement={<CreateBudgetSubmit />}
					navItems={NAV_ITEMS}
					navigatorTitle="Nuevo presupuesto"
					navigatorSubtitle="Define tus categorías y montos"
					navigatorIcon={Wallet}
				/>
				<div className="sm:hidden">
					<CreateBudgetSubmit />
				</div>
			</Screen>
		</FormProvider>
	);
};
