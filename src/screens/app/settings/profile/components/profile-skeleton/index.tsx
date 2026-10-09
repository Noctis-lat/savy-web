import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = (): React.ReactElement => {
	return (
		<div
			role="status"
			aria-label="Cargando perfil"
			className="flex w-full flex-col gap-8"
		>
			<div className="flex items-center gap-4">
				<Skeleton className="size-16 rounded-full" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-4 w-56" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>

			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-5 w-28" />
					</div>
					<Skeleton className="h-8 w-20" />
				</div>

				<GlassCard className="gap-6 p-6 md:p-8">
					<div className="flex items-center gap-2">
						<Skeleton className="size-6 rounded-md" />
						<div className="flex flex-col gap-1.5">
							<Skeleton className="h-4 w-36" />
							<Skeleton className="h-3 w-64" />
						</div>
					</div>

					<div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 4 }, (_item, index) => `field-${index}`).map((fieldKey) => (
							<div
								key={fieldKey}
								className="flex flex-col gap-2"
							>
								<Skeleton className="h-3 w-20" />
								<Skeleton className="h-4 w-32" />
							</div>
						))}
					</div>
				</GlassCard>
			</div>
		</div>
	);
};
