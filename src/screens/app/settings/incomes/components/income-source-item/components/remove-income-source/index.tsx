import { Trash2 } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteIncomeSource } from "@/hooks/income-sources/useDeleteIncomeSource";

type RemoveIncomeSourceProps = {
	incomeSource: IncomeSource;
};

export const RemoveIncomeSource = ({
	incomeSource,
}: RemoveIncomeSourceProps): React.ReactElement => {
	const { mutateAsync: deleteIncomeSource, isPending } = useDeleteIncomeSource();

	const handleConfirm = async (): Promise<void> => {
		await deleteIncomeSource(incomeSource.id);
		toast.success("Fuente de ingreso eliminada");
	};

	return (
		<ScaleFadeIn className="absolute -top-3 right-3">
			<ConfirmDialog
				title="Eliminar fuente de ingreso"
				description={`¿Seguro que quieres eliminar "${incomeSource.name}"? Esta acción no se puede deshacer.`}
				confirmText="Eliminar"
				variant="destructive"
				onConfirm={handleConfirm}
				loading={isPending}
			>
				<Button
					className="rounded-full"
					variant="destructive"
					size="icon-sm"
					aria-label="Eliminar fuente de ingreso"
				>
					<Trash2 />
				</Button>
			</ConfirmDialog>
		</ScaleFadeIn>
	);
};
