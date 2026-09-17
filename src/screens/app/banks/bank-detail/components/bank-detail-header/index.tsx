import { Edit3 } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryBank } from "@/hooks/banks/useQueryBank";

type BankDetailHeaderProps = {
	bankId: string;
};

export const BankDetailHeader = ({ bankId }: BankDetailHeaderProps): React.ReactElement => {
	const navigate = useNavigate();
	const bankQuery = useQueryBank(bankId, true);
	const bank = bankQuery.data;

	if (bankQuery.isLoading) {
		return (
			<div className="flex items-center justify-between">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-9 w-24 rounded-md" />
			</div>
		);
	}

	if (bankQuery.isError || !bank) {
		return (
			<AppBreadcrumbs
				backRoute={ROUTES.APP.BANKS}
				config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: "Detalle" }]}
			/>
		);
	}

	const editRoute = ROUTES.APP.BANKS_EDIT.replace(":id", bankId);

	return (
		<div className="flex items-center justify-between">
			<AppBreadcrumbs
				backRoute={ROUTES.APP.BANKS}
				config={[{ label: "Bancos", href: ROUTES.APP.BANKS }, { label: bank.name }]}
			/>
			<Button
				variant="outline"
				onClick={() => navigate(editRoute)}
			>
				<Edit3 className="size-4" />
				Editar
			</Button>
		</div>
	);
};
