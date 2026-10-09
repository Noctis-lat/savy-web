import { Trash2 } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Button } from "@/components/ui/button";

export const RemoveCategory = (): React.ReactElement => {
	return (
		<ScaleFadeIn className="absolute -top-3 right-3 ">
			<Button
				className="rounded-full"
				variant="destructive"
				size="icon-sm"
			>
				<Trash2 />
			</Button>
		</ScaleFadeIn>
	);
};
