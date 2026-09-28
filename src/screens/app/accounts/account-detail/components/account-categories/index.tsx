import { Copy } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

export const AccountCategories = (): React.ReactElement => {
	return (
		<ScaleFadeIn className="flex-1">
			<GlassCard className="h-full p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Copy className="size-4 text-primary" />
						<h3 className="text-sm font-semibold text-foreground">Categorias gasto</h3>
					</div>
				</div>
			</GlassCard>
		</ScaleFadeIn>
	);
};
