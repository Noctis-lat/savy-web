import { TriangleAlert } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Alert } from "@/components/design-system/primitives/alert";
import { DeleteGoal } from "./delete-goal";

type GoalDangerZoneProps = {
	savingsGoal: SavingsGoal;
};

export const GoalDangerZone = ({ savingsGoal }: GoalDangerZoneProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<Alert
				variant={"destructive"}
				icon={TriangleAlert}
				title="Zona de peligro"
				action={<DeleteGoal savingsGoal={savingsGoal} />}
			>
				<p>
					Eliminar una meta de ahorro es una accion permanente, la informacion no podra ser
					recuperada.
				</p>
			</Alert>
		</ScaleFadeIn>
	);
};
