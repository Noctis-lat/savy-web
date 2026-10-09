import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Wallet } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { CREATE_INCOME_SOURCE_DEFAULT_VALUES } from "@/content/income-sources/createIncomeSourceValues";
import { useCreateIncomeSource } from "@/hooks/income-sources/useCreateIncomeSource";
import {
	type CreateIncomeSourceFormValues,
	createIncomeSourceSchema,
} from "@/schemas/income-sources/createIncomeSourceSchema";
import { merge } from "@/utils/ui/mergeStyles";
import { CreateIncomeSourceForm } from "./components/create-income-source-form";
import { CreateIncomeSourceSubmit } from "./components/create-income-source-submit";

type CreateIncomeSourceProps = {
	mode?: "button" | "card";
	size?: "default" | "xs" | "sm" | "lg";
	className?: string;
	onCreated?: (incomeSource: IncomeSource) => void;
};

export const CreateIncomeSource = ({
	mode = "button",
	size = "default",
	className,
	onCreated,
}: CreateIncomeSourceProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: createIncomeSource, isPending } = useCreateIncomeSource();

	const createIncomeSourceForm = useForm<CreateIncomeSourceFormValues>({
		resolver: zodResolver(createIncomeSourceSchema),
		mode: "onChange",
		defaultValues: CREATE_INCOME_SOURCE_DEFAULT_VALUES,
	});

	const handleOpenChange = (next: boolean): void => {
		if (isPending && !next) return;
		setOpen(next);
		if (!next) {
			createIncomeSourceForm.reset(CREATE_INCOME_SOURCE_DEFAULT_VALUES);
		}
	};

	const handleCreated = (incomeSource: IncomeSource): void => {
		onCreated?.(incomeSource);
		setOpen(false);
		createIncomeSourceForm.reset(CREATE_INCOME_SOURCE_DEFAULT_VALUES);
	};

	return (
		<FormProvider {...createIncomeSourceForm}>
			<Modal
				icon={Wallet}
				title="Crear fuente de ingreso"
				description="Registra de dónde viene tu dinero y cuándo lo recibes."
				openModal={open}
				setOpenModal={handleOpenChange}
				closeDisabled={isPending}
				content={<CreateIncomeSourceForm />}
				actions={
					<CreateIncomeSourceSubmit
						createIncomeSource={createIncomeSource}
						isPending={isPending}
						onCreated={handleCreated}
					/>
				}
				showCancel
			>
				{mode === "card" ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className={merge(
							"flex min-h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
							className,
						)}
					>
						<Plus className="size-6" />
						<span className="text-sm">Agregar fuente de ingreso</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
						className={className}
					>
						<Plus />
						Crear fuente de ingreso
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
