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

const CURRENCY = "MXN";
const LOCALE = "es-MX";

export const Income: Story = {
	args: {
		transaction: {
			id: "t1",
			type: "INCOME",
			amount: 50000,
			description: "Salario",
			date: "2026-07-29",
			accountName: "Cuenta débito",
			categoryName: "Ingresos",
		},
		currency: CURRENCY,
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
			id: "t2",
			type: "EXPENSE",
			amount: 12500,
			description: "Groceries",
			date: "2026-07-28",
			accountName: "Tarjeta de crédito",
			categoryName: "Comida",
		},
		currency: CURRENCY,
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
			id: "t3",
			type: "TRANSFER",
			amount: 30000,
			description: null,
			date: "2026-07-27",
			accountName: "Cuenta ahorro",
			categoryName: null,
		},
		currency: CURRENCY,
		locale: LOCALE,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow {...args} />
		</div>
	),
};

export const WithOnClick: Story = {
	args: {
		transaction: {
			id: "t4",
			type: "EXPENSE",
			amount: 8900,
			description: "Café",
			date: "2026-07-26",
			accountName: "Cuenta débito",
			categoryName: "Café",
		},
		currency: CURRENCY,
		locale: LOCALE,
	},
	render: (args) => (
		<div className="w-96 rounded-lg border border-border p-2">
			<TransactionRow
				{...args}
				onClick={() => console.log("Transaction clicked")}
			/>
		</div>
	),
};
