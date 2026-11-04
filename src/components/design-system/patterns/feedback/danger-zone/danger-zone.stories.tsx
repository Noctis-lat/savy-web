import type { Meta, StoryObj } from "@storybook/react-vite";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";

const meta = {
	title: "Design System/Feedback/DangerZone",
	component: DangerZone,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-[40rem] max-w-full">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof DangerZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
	args: {
		entityName: "Cuenta principal",
		entityLabel: "la cuenta",
		isActive: true,
		onDeactivate: () => undefined,
		onPermanentDelete: () => undefined,
	},
};

export const ActiveReactivatable: Story = {
	args: {
		entityName: "Despensa",
		entityLabel: "el presupuesto",
		isActive: true,
		onDeactivate: () => undefined,
		onReactivate: () => undefined,
		onPermanentDelete: () => undefined,
	},
};

export const Inactive: Story = {
	args: {
		entityName: "Cuenta principal",
		entityLabel: "la cuenta",
		isActive: false,
		onDeactivate: () => undefined,
		onPermanentDelete: () => undefined,
	},
};

export const InactiveWithReactivate: Story = {
	args: {
		entityName: "Despensa",
		entityLabel: "el presupuesto",
		isActive: false,
		onDeactivate: () => undefined,
		onReactivate: () => undefined,
		onPermanentDelete: () => undefined,
	},
};

export const InactiveWithCascade: Story = {
	args: {
		entityName: "BBVA",
		entityLabel: "el banco",
		isActive: false,
		onDeactivate: () => undefined,
		onPermanentDelete: () => undefined,
		permanentDeleteDescription:
			"Se eliminan también sus cuentas, transacciones, tarjetas, préstamos y metas de ahorro.",
	},
};
