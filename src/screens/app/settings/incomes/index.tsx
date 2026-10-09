import { PenLine, Wallet } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { ROUTES } from "@/app/router/routes";
import { Empty } from "@/components/design-system/patterns/feedback/empty";
import { CreateIncomeSource } from "@/components/income-sources/create-income-source";
import { Button } from "@/components/ui/button";
import { useQueryIncomeSources } from "@/hooks/income-sources/useQueryIncomeSources";
import { useRoutesController } from "@/storage/settings/routesController";
import { IncomeSourceItem } from "./components/income-source-item";
import { IncomesHeader } from "./components/incomes-header";
import { IncomesSkeleton } from "./components/incomes-skeleton";

export const Incomes = (): React.ReactElement => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { setBreadcrumbsConfig } = useRoutesController();

	useEffect(() => {
		setBreadcrumbsConfig([
			{ label: "Inicio", href: ROUTES.APP.ROOT },
			{ label: "Configuración", href: ROUTES.APP.SETTINGS.ROOT },
			{ label: "Fuentes de ingreso" },
		]);
	}, [setBreadcrumbsConfig]);

	const { data: incomeSources, isLoading } = useQueryIncomeSources();

	if (isLoading) {
		return <IncomesSkeleton />;
	}

	if (!incomeSources || incomeSources.length === 0) {
		return (
			<Empty
				icon={Wallet}
				title="No tienes fuentes de ingreso"
				description="Registra tu salario u otros ingresos para planear mejor tus finanzas."
				action={
					<CreateIncomeSource
						mode="button"
						size="sm"
					/>
				}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-4 py-4">
			<div className="flex flex-row items-center justify-between">
				<IncomesHeader incomeSourcesLength={incomeSources.length} />

				<Button
					variant="outline"
					size="sm"
					onClick={() => setIsEditing(!isEditing)}
				>
					<PenLine />
					{isEditing ? "Dejar de editar" : "Editar fuentes"}
				</Button>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{incomeSources.map((incomeSource) => (
					<IncomeSourceItem
						incomeSource={incomeSource}
						isEditing={isEditing}
						key={incomeSource.id}
					/>
				))}
				<CreateIncomeSource
					mode="card"
					className="h-full"
				/>
			</div>
		</div>
	);
};
