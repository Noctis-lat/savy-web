import { Plus } from "lucide-react";
import type React from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/app/router/routes";
import { Button } from "@/components/ui/button";

export const CreateBank = (): React.ReactElement => {
	const navigate = useNavigate();

	return (
		<Button onClick={() => navigate(ROUTES.APP.BANKS_NEW)}>
			<Plus className="size-4" />
			Agregar banco
		</Button>
	);
};
