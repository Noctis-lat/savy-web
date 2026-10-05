import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm, useWatch } from "react-hook-form";
import { FormField } from ".";

type FormFieldStoryValues = {
	name?: string;
	amount?: number;
	days?: number;
	rate?: number;
};

const meta: Meta = {
	title: "Design System/Forms/FormField",
	parameters: { layout: "centered" },
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Text: Story = {
	render: () => {
		const storyForm = useForm<FormFieldStoryValues>({ defaultValues: { name: "" } });
		return (
			<div className="w-80">
				<FormField
					name="name"
					form={storyForm}
					label="Nombre"
					placeholder="Ej. Cuenta principal"
					required
				/>
			</div>
		);
	},
};

export const Currency: Story = {
	render: () => {
		const storyForm = useForm<FormFieldStoryValues>({ defaultValues: { amount: 1250050 } });
		const amount = useWatch({ control: storyForm.control, name: "amount" });
		return (
			<div className="flex w-80 flex-col gap-2">
				<FormField
					name="amount"
					form={storyForm}
					type="currency"
					label="Monto"
					placeholder="0.00"
				/>
				<span className="text-xs text-muted-foreground">Valor (centavos): {String(amount)}</span>
			</div>
		);
	},
};

export const NumberWithRange: Story = {
	render: () => {
		const storyForm = useForm<FormFieldStoryValues>({ defaultValues: { days: undefined } });
		return (
			<div className="w-80">
				<FormField
					name="days"
					form={storyForm}
					type="number"
					label="Día de corte"
					placeholder="15"
					min={1}
					max={31}
					required
				/>
			</div>
		);
	},
};

export const DecimalPercentage: Story = {
	render: () => {
		const storyForm = useForm<FormFieldStoryValues>({ defaultValues: { rate: 16.5 } });
		const rate = useWatch({ control: storyForm.control, name: "rate" });
		return (
			<div className="flex w-80 flex-col gap-2">
				<FormField
					name="rate"
					form={storyForm}
					type="percentage"
					label="Tasa anual"
					placeholder="36.5"
					helperText="Hasta 2 decimales. Máximo 100% por defecto."
				/>
				<span className="text-xs text-muted-foreground">Valor: {String(rate)}</span>
			</div>
		);
	},
};
