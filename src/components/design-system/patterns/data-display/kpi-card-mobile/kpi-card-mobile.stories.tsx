import type { Meta, StoryObj } from "@storybook/react-vite";
import { Landmark } from "lucide-react";
import type React from "react";
import { KpiCardMobile } from "@/components/design-system/patterns/data-display/kpi-card-mobile";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-6">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		{children}
	</div>
);

const meta = {
	title: "Design System/Data Display/KpiCardMobile",
	component: KpiCardMobile,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: (args) => (
		<GlassBackground>
			<div className="w-[343px]">
				<KpiCardMobile {...args} />
			</div>
		</GlassBackground>
	),
} satisfies Meta<typeof KpiCardMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		totalLabel: "bancos",
		total: 3,
		totalIcon: Landmark,
		liquidity: 4_850_000,
		debt: 1_230_000,
		netWorth: 3_620_000,
	},
};

export const NegativeNetWorth: Story = {
	args: {
		totalLabel: "cuentas",
		total: 5,
		liquidity: 820_000,
		debt: 2_400_000,
		netWorth: -1_580_000,
	},
};

export const NoDebt: Story = {
	args: {
		totalLabel: "cuentas",
		total: 2,
		liquidity: 1_500_000,
		debt: 0,
		netWorth: 1_500_000,
	},
};

export const Empty: Story = {
	args: {
		totalLabel: "movimientos",
		total: 0,
		liquidity: 0,
		debt: 0,
		netWorth: 0,
	},
};
