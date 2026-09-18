import { Edit3 } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";

type BankEditProps = {
	bankId: string;
};

export const BankEdit = ({ bankId }: BankEditProps): React.ReactElement => {
	const navigate = useNavigate();
	const editRoute = ROUTES.APP.BANKS_EDIT.replace(":id", bankId);

	return (
		<Button
			variant="outline"
			onClick={() => navigate(editRoute)}
		>
			<Edit3 className="size-4" />
			Editar
		</Button>
	);
};
