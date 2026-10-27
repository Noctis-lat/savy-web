import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { BillingCycleProgress } from "@/components/recurring-expenses/recurring-expense-schedule/components/billing-cycle-progress";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative w-full max-w-3xl">{children}</div>
	</div>
);

const meta = {
	title: "Recurring Expenses/RecurringExpenseSchedule/BillingCycleProgress",
	component: BillingCycleProgress,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: (args) => (
		<GlassBackground>
			<BillingCycleProgress {...args} />
		</GlassBackground>
	),
} satisfies Meta<typeof BillingCycleProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EarlyInCycle: Story = {
	args: {
		previous: new Date(2026, 9, 22),
		next: new Date(2026, 10, 22),
		referenceDate: new Date(2026, 9, 27),
	},
};

export const LateInCycle: Story = {
	args: {
		previous: new Date(2026, 9, 1),
		next: new Date(2026, 10, 1),
		referenceDate: new Date(2026, 9, 27),
	},
};
