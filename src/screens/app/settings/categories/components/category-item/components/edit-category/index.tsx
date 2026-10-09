import { PenLine } from "lucide-react";
import type React from "react";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Button } from "@/components/ui/button";

export const EditCategory = (): React.ReactElement => {
	return (
		<ScaleFadeIn className="absolute -top-3 right-13">
			<Button
				className="rounded-full"
				variant="outline"
				size="icon-sm"
			>
				<PenLine />
			</Button>
		</ScaleFadeIn>
	);
};
