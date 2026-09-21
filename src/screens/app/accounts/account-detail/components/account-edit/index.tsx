import { PenLine } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";

export const AccountEdit = (): React.ReactElement => {
	return (
		<Button variant={"outline"}>
			<PenLine />
			Editar cuenta
		</Button>
	);
};
