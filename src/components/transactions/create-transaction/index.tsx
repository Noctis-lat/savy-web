import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "@/components/design-system/primitives/modal";
import { Button } from "@/components/ui/button";
import {
	type CreateTransactionFormValues,
	createTransactionSchema,
} from "@/schemas/transactions/createTransactionSchema";
import { CreateTransactionForm } from "./components/create-transaction-form";
import { CreateTransactionSubmit } from "./components/create-transaction-submit";

type CreateTransactionProps = {
	mode?: "button" | "icon" | "card";
	size?: "default" | "icon" | "xs" | "sm" | "lg" | "icon-xs" | "icon-sm" | "icon-lg";
	accountId?: string;
};

export const CreateTransaction = ({
	mode = "button",
	size = "default",
	accountId,
}: CreateTransactionProps): React.ReactElement => {
	const [open, setOpen] = useState<boolean>(false);

	const today = new Date();

	const CREATE_TRANSACTION_DEFAULT_VALUES: CreateTransactionFormValues = {
		accountId: accountId || "",
		type: "EXPENSE",
		amount: 0,
		destinationAccountId: undefined,
		categoryId: undefined,
		description: undefined,
		note: undefined,
		date: today.toISOString().split("T")[0], // Format as YYYY-MM-DD
	};

	const createTransactionForm = useForm<CreateTransactionFormValues>({
		resolver: zodResolver(createTransactionSchema),
		mode: "onChange",
		defaultValues: CREATE_TRANSACTION_DEFAULT_VALUES,
	});

	const handleOpenChange = (next: boolean): void => {
		setOpen(next);
		if (!next) {
			createTransactionForm.reset(CREATE_TRANSACTION_DEFAULT_VALUES);
		}
	};

	return (
		<FormProvider {...createTransactionForm}>
			<Modal
				icon={ArrowRightLeft}
				title="Nueva transacción"
				description="Registra un ingreso, gasto, transferencia o pago"
				openModal={open}
				setOpenModal={handleOpenChange}
				content={<CreateTransactionForm preselectedAccountId={accountId} />}
				actions={<CreateTransactionSubmit onSuccess={() => handleOpenChange(false)} />}
				showCancel
			>
				{mode === "icon" ? (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpen(true)}
						aria-label="Nueva transacción"
						className="text-primary hover:bg-primary/10"
					>
						<Plus className="size-4" />
					</Button>
				) : mode === "card" ? (
					<button
						type="button"
						onClick={() => setOpen(true)}
						className="flex aspect-16/10 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary hover:bg-emerald-50/30"
					>
						<ArrowRightLeft className="size-6" />
						<span className="text-sm">Nueva transacción</span>
					</button>
				) : (
					<Button
						onClick={() => setOpen(true)}
						size={size}
					>
						<ArrowRightLeft />
						Nueva transacción
					</Button>
				)}
			</Modal>
		</FormProvider>
	);
};
