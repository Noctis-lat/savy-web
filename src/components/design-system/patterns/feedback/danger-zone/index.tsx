import { Info, Power, PowerOff, Settings2, Trash2 } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DangerZoneRow } from "./components/danger-zone-row";

type DangerZoneProps = {
	entityName: string;
	entityLabel: string;
	isActive: boolean;
	onDeactivate?: () => void;
	onReactivate?: () => void;
	onPermanentDelete: () => void;
	isDeactivating?: boolean;
	isReactivating?: boolean;
	isDeleting?: boolean;
	/** Cascade consequences of the permanent delete, shown in the row and the confirm dialog. */
	permanentDeleteDescription?: string;
};

export const DangerZone = ({
	entityName,
	entityLabel,
	isActive,
	onDeactivate,
	onReactivate,
	onPermanentDelete,
	isDeactivating = false,
	isReactivating = false,
	isDeleting = false,
	permanentDeleteDescription,
}: DangerZoneProps): React.ReactElement => {
	const canReactivate = onReactivate !== undefined;
	// Entities without a visibility lifecycle (e.g. card statements) get no status badge.
	const hasVisibilityState = onDeactivate !== undefined || canReactivate;

	const deactivateDescription = canReactivate
		? "Se oculta de la app y su historial se conserva. Puedes revertirlo cuando quieras."
		: "Se oculta de la app y su historial se conserva. Desde la app no se puede revertir.";
	const deleteRowDescription =
		permanentDeleteDescription ?? "Se elimina el registro con todo su historial.";
	const deleteDialogDescription = `${permanentDeleteDescription ?? "Se eliminará el registro con todo su historial."} Esta acción no se puede deshacer.`;

	return (
		<ScaleFadeIn>
			<GlassCard className="overflow-hidden p-0 gap-0">
				<div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
					<div className="flex items-center gap-2">
						<Settings2
							className="size-4 text-muted-foreground"
							aria-hidden="true"
						/>
						<h3 className="text-sm font-semibold text-foreground">Administración</h3>
					</div>
					{hasVisibilityState &&
						(isActive ? (
							<Badge
								variant="success"
								className="px-2 text-xs"
							>
								Visible
							</Badge>
						) : (
							<Badge
								variant="outline"
								className="px-2 text-xs text-muted-foreground"
							>
								No visible
							</Badge>
						))}
				</div>

				{isActive ? (
					<>
						<DangerZoneRow
							icon={PowerOff}
							tone="neutral"
							title={`Desactivar ${entityLabel}`}
							description={deactivateDescription}
							action={
								<ConfirmDialog
									title={`Desactivar ${entityName}`}
									description={deactivateDescription}
									confirmText="Desactivar"
									cancelText="Volver"
									variant="destructive"
									confirmIcon={PowerOff}
									onConfirm={onDeactivate ?? (() => undefined)}
									loading={isDeactivating}
									disabled={onDeactivate === undefined}
								>
									<Button
										variant="outline"
										size="sm"
									>
										<PowerOff className="size-4" />
										Desactivar
									</Button>
								</ConfirmDialog>
							}
						/>
						<p className="flex items-center gap-2 border-t border-border/40 px-4 py-3 text-xs text-muted-foreground">
							<Info
								className="size-3.5 shrink-0"
								aria-hidden="true"
							/>
							El borrado permanente se habilita después de desactivar.
						</p>
					</>
				) : (
					<>
						{canReactivate && (
							<DangerZoneRow
								icon={Power}
								tone="primary"
								title={`Reactivar ${entityLabel}`}
								description="Vuelve a mostrarse en la app con todos sus datos."
								action={
									<ConfirmDialog
										title={`Reactivar ${entityName}`}
										description="Volverá a mostrarse en la app con todos sus datos."
										confirmText="Reactivar"
										cancelText="Volver"
										variant="success"
										confirmIcon={Power}
										onConfirm={onReactivate}
										loading={isReactivating}
									>
										<Button
											variant="outline"
											size="sm"
										>
											<Power className="size-4" />
											Reactivar
										</Button>
									</ConfirmDialog>
								}
							/>
						)}
						<DangerZoneRow
							icon={Trash2}
							tone="destructive"
							title="Eliminar permanentemente"
							description={deleteRowDescription}
							action={
								<ConfirmDialog
									title={`Eliminar ${entityName}`}
									description={deleteDialogDescription}
									confirmText="Eliminar"
									cancelText="Volver"
									variant="destructive"
									confirmIcon={Trash2}
									onConfirm={onPermanentDelete}
									loading={isDeleting}
								>
									<Button
										variant="destructive"
										size="sm"
									>
										<Trash2 className="size-4" />
										Eliminar
									</Button>
								</ConfirmDialog>
							}
						/>
					</>
				)}
			</GlassCard>
		</ScaleFadeIn>
	);
};
