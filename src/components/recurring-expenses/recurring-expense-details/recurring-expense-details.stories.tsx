import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { RecurringExpenseDetails } from "@/components/recurring-expenses/recurring-expense-details";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative w-full max-w-3xl">{children}</div>
	</div>
);

const baseExpense: RecurringExpense = {
	id: "re-1",
	profileId: "profile-1",
	name: "Netflix",
	amount: 22200,
	frequency: "MONTHLY",
	billingDays: [22],
	type: "SUBSCRIPTION",
	accountId: "account-1",
	categoryId: "category-1",
	url: "https://www.netflix.com/account",
	color: "oklch(0.62 0.17 145)",
	icon: "tv",
	isActive: true,
	createdAt: "2026-03-14T00:00:00.000Z",
	updatedAt: "2026-09-01T00:00:00.000Z",
};

const meta = {
	title: "Recurring Expenses/RecurringExpenseDetails",
	component: RecurringExpenseDetails,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: (args) => (
		<GlassBackground>
			<div className="max-w-sm">
				<RecurringExpenseDetails {...args} />
			</div>
		</GlassBackground>
	),
} satisfies Meta<typeof RecurringExpenseDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		recurringExpense: baseExpense,
		accountName: "BBVA Débito",
		categoryName: "Entretenimiento",
	},
};

export const Loading: Story = {
	args: {
		recurringExpense: baseExpense,
		categoryName: "Entretenimiento",
		isLoading: true,
	},
};

export const WithoutOptional: Story = {
	args: {
		recurringExpense: { ...baseExpense, url: undefined, categoryId: undefined },
		accountName: "Efectivo",
	},
};
