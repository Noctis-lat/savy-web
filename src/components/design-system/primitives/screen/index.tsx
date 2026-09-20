import type React from "react";
import { merge } from "@/utils/ui/mergeStyles";
import { ScreenHeader } from "./components/screen-header";

type ScreenProps = {
	className?: string;
	headerClassName?: string;
	children: React.ReactNode;
	backRoute: string;
	breadcrumbsConfig: BreadcrumbItemConfig[];
	action?: React.ReactElement;
};

export const Screen = ({
	className,
	headerClassName,
	children,
	backRoute,
	breadcrumbsConfig,
	action,
}: ScreenProps): React.ReactElement => {
	return (
		<div className={merge("flex flex-1 flex-col gap-6 p-6", className)}>
			<ScreenHeader
				className={headerClassName}
				backRoute={backRoute}
				breadcrumbsConfig={breadcrumbsConfig}
				action={action}
			/>
			{children}
		</div>
	);
};
