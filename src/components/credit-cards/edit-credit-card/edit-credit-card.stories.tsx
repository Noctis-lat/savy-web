import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { EditCreditCard } from "@/components/credit-cards/edit-credit-card";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
		mutations: { retry: false },
	},
});

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockCreditCard: CreditCard = {
	id: "card-1",
	accountId: "credit-account-1",
	paymentAccountId: "debit-account-1",
	name: "Visa Oro",
	color: "#4F46E5",
	icon: "credit-card",
	creditLimit: 1000000,
	cutDay: 15,
	paymentDueDays: 20,
	paymentDay: 5,
	interestRate: 0.365,
	availableCredit: 750000,
	currentBalance: 250000,
	currentCycleCutDate: "2026-11-15T00:00:00.000Z",
	currentCyclePaymentDueDate: "2026-12-05T00:00:00.000Z",
	createdAt: "2026-01-01T00:00:00.000Z",
	updatedAt: "2026-11-01T00:00:00.000Z",
};

const meta = {
	title: "Credit Cards/EditCreditCard",
	component: EditCreditCard,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<QueryWrapper>
				<Story />
			</QueryWrapper>
		),
	],
} satisfies Meta<typeof EditCreditCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonMode: Story = {
	args: {
		creditCard: mockCreditCard,
		mode: "button",
	},
};

export const IconMode: Story = {
	args: {
		creditCard: mockCreditCard,
		mode: "icon",
	},
};
