import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { UpcomingChargeRow } from "@/components/recurring-expenses/recurring-expense-schedule/components/upcoming-charge-row";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative w-full max-w-3xl">{children}</div>
	</div>
);

const meta = {
	title: "Recurring Expenses/RecurringExpenseSchedule/UpcomingChargeRow",
	component: UpcomingChargeRow,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: (args) => (
		<GlassBackground>
			<ul>
				<UpcomingChargeRow {...args} />
			</ul>
		</GlassBackground>
	),
} satisfies Meta<typeof UpcomingChargeRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Next: Story = {
	args: { date: new Date(2026, 10, 22), amount: 22200, isNext: true },
};

export const Later: Story = {
	args: { date: new Date(2026, 11, 22), amount: 22200, isNext: false },
};
