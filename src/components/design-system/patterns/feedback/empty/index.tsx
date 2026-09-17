import type { LucideIcon } from "lucide-react";
import type React from "react";
import { isValidElement } from "react";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

type EmptyAction = {
	label: string;
	onClick: () => void;
	icon?: LucideIcon;
};

type EmptyProps = {
	title?: string;
	description?: string;
	icon?: LucideIcon;
	/** Pass an object for a default Button action, or a ReactElement for a custom component (e.g. <CreateBank/>). */
	action?: EmptyAction | React.ReactElement;
	className?: string;
};

const renderAction = (action: EmptyAction | React.ReactElement): React.ReactNode => {
	if (isValidElement(action)) {
		return action;
	}

	const { label, onClick, icon: ActionIcon } = action as EmptyAction;

	return (
		<Button
			size="sm"
			onClick={onClick}
		>
			{ActionIcon && <ActionIcon className="mr-1 h-4 w-4" />}
			{label}
		</Button>
	);
};

export const Empty = ({
	title = "Sin resultados",
	description = "No hay información para mostrar.",
	icon: Icon,
	action,
	className = "",
}: EmptyProps): React.ReactElement => {
	return (
		<div
			className={merge(
				"flex h-full w-full flex-col items-center justify-center gap-3 py-16 text-center",
				className,
			)}
		>
			{Icon && (
				<div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-500/15 bg-gray-100">
					<Icon className="h-8 w-8 text-gray-500" />
				</div>
			)}

			<div className="flex flex-col gap-1">
				{title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}

				{description && <p className="text-sm text-gray-500">{description}</p>}
			</div>

			{action && <div className="mt-2">{renderAction(action)}</div>}
		</div>
	);
};
