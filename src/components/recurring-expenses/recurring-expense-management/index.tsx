import { Power, PowerOff, Settings2, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Button } from "@/components/ui/button";
import { ManagementRow } from "./components/management-row";

type RecurringExpenseManagementProps = {
	name: string;
	entityLabel: string;
	isActive: boolean;
	onDeactivate: () => void;
	onActivate: () => void;
	onDelete: () => void;
	isDeactivating: boolean;
	isActivating: boolean;
	isDeleting: boolean;
};

export const RecurringExpenseManagement = ({
	name,
	entityLabel,
	isActive,
	onDeactivate,
	onActivate,
	onDelete,
	isDeactivating,
	isActivating,
	isDeleting,
}: RecurringExpenseManagementProps): React.ReactElement => {
	const [isDeactivateOpen, setIsDeactivateOpen] = useState<boolean>(false);
	const [isActivateOpen, setIsActivateOpen] = useState<boolean>(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

	return (
		<GlassCard className="p-0">
			<div className="flex items-center gap-2 p-4 pb-0">
				<Settings2
					className="size-4 text-muted-foreground"
					aria-hidden="true"
				/>
				<h3 className="text-sm font-semibold text-foreground">Administración</h3>
			</div>

			<div className="divide-y divide-border/40">
				{isActive ? (
					<ManagementRow
						title={`Desactivar ${entityLabel}`}
						description="Deja de generar cobros. El historial se conserva."
						action={
							<ConfirmDialog
								title={`Desactivar ${name}`}
								description="No se generarán nuevos cobros. Podrás consultar su historial cuando quieras."
								confirmText="Desactivar"
								cancelText="Volver"
								variant="destructive"
								confirmIcon={PowerOff}
								onConfirm={onDeactivate}
								open={isDeactivateOpen}
								onOpenChange={setIsDeactivateOpen}
								loading={isDeactivating}
								disabled={isDeactivating}
							>
								<Button
									variant="outline"
									size="sm"
								>
									<PowerOff />
									Desactivar
								</Button>
							</ConfirmDialog>
						}
					/>
				) : (
					<ManagementRow
						title={`Reactivar ${entityLabel}`}
						description="Vuelve a generar cobros según la frecuencia configurada."
						action={
							<ConfirmDialog
								title={`Reactivar ${name}`}
								description="Se reanudarán los cobros con la frecuencia y los días configurados."
								confirmText="Reactivar"
								cancelText="Volver"
								variant="success"
								confirmIcon={Power}
								onConfirm={onActivate}
								open={isActivateOpen}
								onOpenChange={setIsActivateOpen}
								loading={isActivating}
								disabled={isActivating}
							>
								<Button
									variant="outline"
									size="sm"
								>
									<Power />
									Reactivar
								</Button>
							</ConfirmDialog>
						}
					/>
				)}

				<ManagementRow
					title="Eliminar permanentemente"
					titleClassName="text-destructive"
					description="Borra el registro y su historial. No se puede deshacer."
					action={
						<ConfirmDialog
							title={`Eliminar ${name}`}
							description="Esta acción elimina el registro por completo y no se puede deshacer."
							confirmText="Eliminar"
							cancelText="Volver"
							variant="destructive"
							confirmIcon={Trash2}
							onConfirm={onDelete}
							open={isDeleteOpen}
							onOpenChange={setIsDeleteOpen}
							loading={isDeleting}
							disabled={isDeleting}
						>
							<Button
								variant="destructive"
								size="sm"
							>
								<Trash2 />
								Eliminar
							</Button>
						</ConfirmDialog>
					}
				/>
			</div>
		</GlassCard>
	);
};
