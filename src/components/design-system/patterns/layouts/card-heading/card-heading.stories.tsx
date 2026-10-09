import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserRound } from "lucide-react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";
import { CardHeading } from ".";

const meta = {
	title: "Design System/Layouts/CardHeading",
	component: CardHeading,
	parameters: { layout: "padded" },
	tags: ["autodocs"],
	args: {
		icon: UserRound,
		title: "Información personal",
		description: "Tu nombre aparece en tus reportes y presupuestos.",
	},
} satisfies Meta<typeof CardHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDescription: Story = {
	args: { description: undefined },
};

export const InsideGlassCard: Story = {
	render: (args) => (
		<GlassCard className="p-6">
			<CardHeading {...args} />
		</GlassCard>
	),
};
