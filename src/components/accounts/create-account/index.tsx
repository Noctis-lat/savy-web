import { CreditCardPlus } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

export const CreateAccount = (): React.ReactElement => {
	return (
		<Button>
			<CreditCardPlus />
			Crear cuenta
		</Button>
	);
};
