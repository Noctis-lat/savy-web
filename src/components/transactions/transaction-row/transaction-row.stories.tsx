import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionRow } from "@/components/transactions/transaction-row";

const meta = {
	title: "Transactions/TransactionRow",
	component: TransactionRow,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof TransactionRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const LOCALE = "es-MX";

const baseTransaction: Transaction = {
	id: "t1",
	accountId: "acc-1",
	destinationAccountId: undefined,
	categoryId: "cat-1",
	type: "INCOME",
	amount: 50000,
	description: "Salario",
	note: undefined,
	date: "2026-07-29",
	createdAt: "2026-07-29T12:00:00.000Z",
	updatedAt: "2026-07-29T12:00:00.000Z",
};

export const Income: Story = {
	args: {
		transaction: baseTransaction,
		locale: LOCALE,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow {...args} />
		</div>
	),
};

export const Expense: Story = {
	args: {
		transaction: {
			...baseTransaction,
			id: "t2",
			type: "EXPENSE",
			amount: 12500,
			description: "Groceries",
			date: "2026-07-28",
		},
		locale: LOCALE,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow {...args} />
		</div>
	),
};

export const Transfer: Story = {
	args: {
		transaction: {
			...baseTransaction,
			id: "t3",
			type: "TRANSFER",
			amount: 30000,
			description: undefined,
			date: "2026-07-27",
			categoryId: undefined,
		},
		locale: LOCALE,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow {...args} />
		</div>
	),
};

export const Editable: Story = {
	args: {
		transaction: {
			...baseTransaction,
			id: "t4",
			type: "EXPENSE",
			amount: 8900,
			description: "Café",
			date: "2026-07-26",
		},
		locale: LOCALE,
		editable: true,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow {...args} />
		</div>
	),
};
