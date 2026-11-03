import type { Meta, StoryObj } from "@storybook/react-vite";
import { UsageBlock } from "@/components/design-system/patterns/data-display/usage-block";

const meta = {
	title: "Design System/Data Display/UsageBlock",
	component: UsageBlock,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof UsageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Uso del crédito",
		meta: "Disponible $8,000.00",
		detail: "Usado $2,000.00 de $10,000.00",
		percentage: 20,
		ariaLabel: "20% del crédito usado",
	},
};

export const Warning: Story = {
	args: {
		title: "Uso del crédito",
		meta: "Disponible $1,800.00",
		detail: "Usado $8,200.00 de $10,000.00",
		percentage: 82,
		tone: "warning",
		ariaLabel: "82% del crédito usado",
	},
};

export const Danger: Story = {
	args: {
		title: "Uso del crédito",
		meta: "Disponible -$500.00",
		detail: "Usado $10,500.00 de $10,000.00",
		percentage: 105,
		tone: "danger",
		ariaLabel: "105% del crédito usado",
	},
};

export const EmptyBar: Story = {
	args: {
		title: "Pago del periodo",
		detail: "Sin estado de cuenta pendiente",
	},
};

export const TextOnly: Story = {
	args: {
		title: "Saldo del periodo",
		meta: "$4,250.00",
		showBar: false,
		children: (
			<div className="flex items-baseline justify-between gap-2 text-xs">
				<span className="text-muted-foreground">Intereses</span>
				<span className="text-muted-foreground">Sin intereses</span>
			</div>
		),
	},
};
