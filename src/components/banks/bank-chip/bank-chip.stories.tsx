import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { BankChip } from "@/components/banks/bank-chip";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		{children}
	</div>
);

const meta = {
	title: "Banks/BankChip",
	component: BankChip,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
} satisfies Meta<typeof BankChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		bank: {
			id: "b1",
			name: "BBVA",
			color: "#0266AE",
			logo: null,
			accountCount: 3,
		},
	},
	render: (args) => (
		<GlassBackground>
			<BankChip {...args} />
		</GlassBackground>
	),
};

export const NoColor: Story = {
	args: {
		bank: {
			id: "b2",
			name: "Banco nuevo",
			color: null,
			logo: null,
			accountCount: 1,
		},
	},
	render: (args) => (
		<GlassBackground>
			<BankChip {...args} />
		</GlassBackground>
	),
};

export const WithLogo: Story = {
	args: {
		bank: {
			id: "b3",
			name: "Santander",
			color: null,
			logo: "https://via.placeholder.com/24",
			accountCount: 2,
		},
	},
	render: (args) => (
		<GlassBackground>
			<BankChip {...args} />
		</GlassBackground>
	),
};
