import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusCallout } from "@/components/design-system/patterns/data-display/status-callout";

const meta = {
	title: "Design System/Data Display/StatusCallout",
	component: StatusCallout,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof StatusCallout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		tone: "success",
		title: "Al corriente",
		description: "No tienes pagos pendientes. Siguiente fecha de pago 12 nov.",
	},
};

export const Warning: Story = {
	args: {
		tone: "warning",
		title: "Próximo pago",
		description: "Paga $4,250.00 antes del 12 nov para no generar intereses.",
	},
};

export const Danger: Story = {
	args: {
		tone: "danger",
		title: "Pago vencido",
		description: "Debías pagar $4,250.00 el 28 oct para no generar intereses.",
	},
};

export const Neutral: Story = {
	args: {
		tone: "neutral",
		title: "Sin datos",
		description: "Todavía no hay información para este periodo.",
	},
};
