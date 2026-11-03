import { Power, PowerOff, Trash2, TriangleAlert } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { ConfirmDialog } from "@/components/design-system/primitives/confirm-dialog";
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
}: DangerZoneProps): React.ReactElement => {
	return (
		<ScaleFadeIn>
			<GlassCard className="p-0">
				<div className="flex items-center gap-2 px-4 pt-4 pb-2">
					<TriangleAlert
						className="size-4 text-muted-foreground"
						aria-hidden="true"
					/>
					<h3 className="text-sm font-semibold text-foreground">Administración</h3>
				</div>

				<div className="divide-y divide-border/40">
					{isActive ? (
						<DangerZoneRow
							title={`Desactivar ${entityLabel}`}
							description="Deja de estar visible en la app. El historial se conserva."
							action={
								<ConfirmDialog
									title={`Desactivar ${entityName}`}
									description={`Esta acción desactiva ${entityLabel} y lo oculta de la app. Puedes eliminarlo permanentemente después.`}
									confirmText="Desactivar"
									cancelText="Volver"
									confirmIcon={PowerOff}
									onConfirm={onDeactivate ?? (() => undefined)}
									loading={isDeactivating}
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
					) : (
						<>
							{onReactivate && (
								<DangerZoneRow
									title={`Reactivar ${entityLabel}`}
									description="Vuelve a estar visible en la app con todos sus datos."
									action={
										<ConfirmDialog
											title={`Reactivar ${entityName}`}
											description={`Esta acción reactiva ${entityLabel} y lo vuelve visible en la app.`}
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
								title="Eliminar permanentemente"
								titleClassName="text-destructive"
								description="Borra el registro y su historial. No se puede deshacer."
								action={
									<ConfirmDialog
										title={`Eliminar ${entityName}`}
										description={`Esta acción elimina ${entityLabel} por completo y no se puede deshacer.`}
										confirmText="Eliminar"
										cancelText="Volver"
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
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
