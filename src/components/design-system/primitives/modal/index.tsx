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
	iconVariant?: "orange" | "neutral" | "amber" | "red";
	content: React.ReactElement;
	actions?: React.ReactElement;
	showCancel?: boolean;
};

const ICON_VARIANTS = {
	orange: "bg-primary/10 ring-primary/20 text-primary",
	neutral: "bg-neutral-100 ring-neutral-200 text-neutral-600",
	amber: "bg-amber-50 ring-amber-200 text-amber-600",
	red: "bg-red-50 ring-red-200 text-red-600",
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
	iconVariant = "orange",
	content,
	actions,
	showCancel = false,
}: ModalProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const isControlled = openModal !== undefined && setOpenModal !== undefined;

	const handleClose = () => {
		if (isControlled) setOpenModal?.(false);
		else setOpen(false);
	};

	return (
		<Dialog
			open={isControlled ? openModal : open}
			onOpenChange={isControlled ? setOpenModal : setOpen}
		>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}

			<DialogContent
				showCloseButton={showClose}
				className={merge("max-w-lg! p-0 overflow-hidden gap-0", className)}
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
					<DialogDescription className="text-sm text-gray-500">{description}</DialogDescription>
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
