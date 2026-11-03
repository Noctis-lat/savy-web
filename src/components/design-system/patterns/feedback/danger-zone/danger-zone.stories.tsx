import type { Meta, StoryObj } from "@storybook/react-vite";
import { DangerZone } from "@/components/design-system/patterns/feedback/danger-zone";

const meta = {
	title: "Design System/Feedback/DangerZone",
	component: DangerZone,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div className="w-full max-w-md">
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

export const Inactive: Story = {
	args: {
		entityName: "Cuenta principal",
		entityLabel: "la cuenta",
		isActive: false,
		onPermanentDelete: () => undefined,
	},
};

export const InactiveWithReactivate: Story = {
	args: {
		entityName: "Presupuesto groceries",
		entityLabel: "el presupuesto",
		isActive: false,
		onReactivate: () => undefined,
		onPermanentDelete: () => undefined,
	},
};
