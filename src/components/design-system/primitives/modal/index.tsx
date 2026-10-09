import { Ban } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { merge } from "@/utils/ui/mergeStyles";

type ModalProps = {
	/** Trigger element — if omitted, the modal must be controlled via openModal/setOpenModal */
	children?: React.ReactElement;
	openModal?: boolean;
	setOpenModal?: (open: boolean) => void;
	showClose?: boolean;
	className?: string;
	title: string;
	description: string;
	/** Icon shown in a badge next to the title */
	icon?: React.ElementType;
	/** Badge color scheme — defaults to orange */
	iconVariant?: "default" | "neutral" | "amber" | "red" | "blue";
	content: React.ReactElement;
	actions?: React.ReactElement;
	showCancel?: boolean;
	/**
	 * Blocks every close path (X button, Cancel, Escape, outside click) — e.g. while saving.
	 * The parent can still close the modal programmatically through `openModal`.
	 */
	closeDisabled?: boolean;
};

const ICON_VARIANTS = {
	default: "bg-primary/10 ring-primary/20 text-primary",
	neutral: "bg-neutral-100 ring-neutral-200 text-neutral-600",
	amber: "bg-amber-50 ring-amber-200 text-amber-600",
	red: "bg-red-50 ring-red-200 text-red-600",
	blue: "bg-blue-50 ring-blue-200 text-blue-600",
} as const;

export const Modal = ({
	children,
	openModal = false,
	setOpenModal,
	showClose = true,
	className,
	title,
	description,
	icon: Icon,
	iconVariant = "default",
	content,
	actions,
	showCancel = false,
	closeDisabled = false,
}: ModalProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const isControlled = openModal !== undefined && setOpenModal !== undefined;

	const handleOpenChange = (next: boolean): void => {
		if (!next && closeDisabled) return;
		if (isControlled) setOpenModal?.(next);
		else setOpen(next);
	};

	const handleClose = (): void => handleOpenChange(false);

	const preventCloseWhenDisabled = (event: Event): void => {
		if (closeDisabled) event.preventDefault();
	};

	return (
		<Dialog
			open={isControlled ? openModal : open}
			onOpenChange={handleOpenChange}
		>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}

			<DialogContent
				showCloseButton={showClose && !closeDisabled}
				onEscapeKeyDown={preventCloseWhenDisabled}
				onInteractOutside={preventCloseWhenDisabled}
				className={merge("sm:max-w-lg! p-0 overflow-hidden gap-0", className)}
			>
				<DialogHeader className="px-6 py-4 pb-3">
					<div className="flex items-center gap-2.5">
						{Icon && (
							<div
								className={merge(
									"flex size-8 items-center justify-center rounded-lg ring-1 shrink-0",
									ICON_VARIANTS[iconVariant],
								)}
							>
								<Icon className="size-4" />
							</div>
						)}
						<DialogTitle className="text-base font-semibold text-gray-900">{title}</DialogTitle>
					</div>
					<DialogDescription className="text-sm text-gray-500 text-left">
						{description}
					</DialogDescription>
				</DialogHeader>

				<Separator />

				<div className="px-6 py-4">{content}</div>

				<Separator />

				{(showCancel || actions) && (
					<DialogFooter className="px-6 py-3 flex flex-row justify-end gap-2">
						{showCancel && (
							<Button
								variant="outline"
								onClick={handleClose}
								disabled={closeDisabled}
							>
								<Ban />
								Cancelar
							</Button>
						)}

						{actions}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};
