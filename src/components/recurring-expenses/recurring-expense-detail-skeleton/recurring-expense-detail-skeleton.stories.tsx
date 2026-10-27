import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { RecurringExpenseDetailSkeleton } from "@/components/recurring-expenses/recurring-expense-detail-skeleton";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative flex w-full">{children}</div>
	</div>
);

const meta = {
	title: "Recurring Expenses/RecurringExpenseDetailSkeleton",
	component: RecurringExpenseDetailSkeleton,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: () => (
		<GlassBackground>
			<RecurringExpenseDetailSkeleton />
		</GlassBackground>
	),
} satisfies Meta<typeof RecurringExpenseDetailSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
