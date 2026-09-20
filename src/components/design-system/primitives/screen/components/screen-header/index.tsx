import type React from "react";
import { AppBreadcrumbs } from "@/components/design-system/patterns/navigation/app-breadcrumbs";
import { merge } from "@/utils/ui/mergeStyles";

type ScreenHeaderProps = {
	className?: string;
	backRoute: string;
	breadcrumbsConfig: BreadcrumbItemConfig[];
	action?: React.ReactElement;
};

export const ScreenHeader = ({
	className,
	backRoute,
	breadcrumbsConfig,
	action,
}: ScreenHeaderProps): React.ReactElement => {
	return (
		<div className={merge("flex items-center justify-between", className)}>
			<AppBreadcrumbs
				backRoute={backRoute}
				config={breadcrumbsConfig}
			/>

			{action}
		</div>
	);
};
