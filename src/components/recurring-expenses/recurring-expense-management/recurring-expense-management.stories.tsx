import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { RecurringExpenseManagement } from "@/components/recurring-expenses/recurring-expense-management";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative w-full max-w-3xl">{children}</div>
	</div>
);

const meta = {
	title: "Recurring Expenses/RecurringExpenseManagement",
	component: RecurringExpenseManagement,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	args: {
		name: "Netflix",
		entityLabel: "suscripción",
		isActive: true,
		onDeactivate: () => undefined,
		onDelete: () => undefined,
		isDeactivating: false,
		isDeleting: false,
	},
	render: (args) => (
		<GlassBackground>
			<RecurringExpenseManagement {...args} />
		</GlassBackground>
	),
} satisfies Meta<typeof RecurringExpenseManagement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Inactive: Story = {
	args: { isActive: false },
};

export const Deleting: Story = {
	args: { isDeleting: true },
};
