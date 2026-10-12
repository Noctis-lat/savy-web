import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, Check, Loader2 } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/design-system/patterns/forms/form-field";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import { Button } from "@/components/ui/button";
import { ACCOUNT_TYPE_OPTIONS } from "@/content/banks/bankContent";
import { type AccountFormValues, accountSchema } from "@/schemas/onboarding/accountSchema";

const ONBOARDING_ACCOUNT_TYPE_OPTIONS = ACCOUNT_TYPE_OPTIONS.filter(
	(option) => option.value === "DEBIT" || option.value === "CASH",
);

type AccountFormProps = {
	onSave: (values: AccountFormValues) => void | Promise<void>;
	onCancel: () => void;
	bankOptions: Option[];
};

const DEFAULT_VALUES: AccountFormValues = {
	name: "",
	type: "DEBIT",
	bankId: "",
	currency: "MXN",
	balance: 0,
};

export const AccountForm = ({
	onSave,
	onCancel,
	bankOptions,
}: AccountFormProps): React.ReactElement => {
	const form = useForm<AccountFormValues>({
		resolver: zodResolver(accountSchema),
		mode: "onChange",
		defaultValues: DEFAULT_VALUES,
	});

	const accountType = form.watch("type");
	const isCash = accountType === "CASH";

	const handleSave = form.handleSubmit(async (values) => {
		const payload: AccountFormValues = isCash ? { ...values, bankId: null } : values;
		await onSave(payload);
		form.reset(DEFAULT_VALUES);
	});

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-semibold text-foreground">Nueva cuenta</h3>
				<p className="text-xs text-muted-foreground">
					Registra tu cuenta para recibir ingresos y registrar gastos.
				</p>
			</div>

			<FormField
				name="name"
				form={form}
				label="Nombre de la cuenta"
				placeholder="Ej. Cuenta principal"
				required
			/>

			<FormSelect
				name="type"
				form={form}
				label="Tipo de cuenta"
				options={ONBOARDING_ACCOUNT_TYPE_OPTIONS}
				required
			/>

			{!isCash && (
				<FormSelect
					name="bankId"
					form={form}
					label="Banco"
					options={bankOptions}
					placeholder="Selecciona un banco..."
					required
				/>
			)}

			<FormField
				name="currency"
				form={form}
				label="Moneda"
				placeholder="MXN"
				required
			/>

			<FormField
				name="balance"
				form={form}
				type="currency"
				label="Saldo inicial"
				placeholder="0"
				helperText="Saldo actual de la cuenta."
			/>

			<div className="flex flex-row gap-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
					disabled={form.formState.isSubmitting}
				>
					<Ban />
					Cancelar
				</Button>
				<Button
					type="button"
					onClick={handleSave}
					disabled={form.formState.isSubmitting}
					className="flex-1"
				>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className="animate-spin" />
							Guardando...
						</>
					) : (
						<>
							<Check className="size-4" />
							Guardar cuenta
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
