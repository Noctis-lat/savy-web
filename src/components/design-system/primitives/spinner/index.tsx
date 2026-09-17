import { Loader2 } from "lucide-react";
import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";

type SpinnerProps = {
	size?: number;
	className?: string;
};

export const Spinner = ({ size = 16, className }: SpinnerProps): React.ReactElement => {
	return (
		<Loader2
			style={{ width: size, height: size }}
			className={merge("animate-spin", className)}
		/>
	);
};
