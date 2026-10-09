import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScaleFadeIn } from "@/components/design-system/patterns/animations/scale-fade-in";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import { useUpdateIncomeSource } from "@/hooks/income-sources/useUpdateIncomeSource";
import {
	type UpdateIncomeSourceFormValues,
	updateIncomeSourceSchema,
} from "@/schemas/income-sources/updateIncomeSourceSchema";
import { getIncomeSourceFormValues } from "@/utils/income-sources/getIncomeSourceFormValues";
import { EditIncomeSourceForm } from "./components/edit-income-source-form";
import { EditIncomeSourceSubmit } from "./components/edit-income-source-submit";

type EditIncomeSourceProps = {
	incomeSource: IncomeSource;
};

export const EditIncomeSource = ({ incomeSource }: EditIncomeSourceProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate: updateIncomeSource, isPending } = useUpdateIncomeSource();

	const editIncomeSourceForm = useForm<UpdateIncomeSourceFormValues>({
		resolver: zodResolver(updateIncomeSourceSchema),
		mode: "onChange",
		defaultValues: getIncomeSourceFormValues(incomeSource),
	});

	const handleOpenChange = (next: boolean): void => {
		if (isPending && !next) return;
		setOpen(next);
		if (!next) {
			editIncomeSourceForm.reset(getIncomeSourceFormValues(incomeSource));
		}
	};

	const handleOpen = (): void => {
		editIncomeSourceForm.reset(getIncomeSourceFormValues(incomeSource));
		setOpen(true);
	};

	return (
		<FormProvider {...editIncomeSourceForm}>
			<Modal
				icon={PenLine}
				title="Editar fuente de ingreso"
				description="Modifica la información de tu fuente de ingreso."
				openModal={open}
				setOpenModal={handleOpenChange}
				closeDisabled={isPending}
				content={<EditIncomeSourceForm />}
				actions={
					<EditIncomeSourceSubmit
						incomeSourceId={incomeSource.id}
						updateIncomeSource={updateIncomeSource}
						isPending={isPending}
						onSuccess={() => setOpen(false)}
					/>
				}
				showCancel
			>
				<ScaleFadeIn className="absolute -top-3 right-13">
					<Button
						className="rounded-full"
						variant="outline"
						size="icon-sm"
						aria-label="Editar fuente de ingreso"
						onClick={handleOpen}
					>
						<PenLine />
					</Button>
				</ScaleFadeIn>
			</Modal>
		</FormProvider>
	);
};
