import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { CreateAccount } from "@/components/accounts/create-account";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
		mutations: { retry: false },
	},
});

const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const meta = {
	title: "Accounts/CreateAccount",
	component: CreateAccount,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<QueryWrapper>
				<Story />
			</QueryWrapper>
		),
	],
} satisfies Meta<typeof CreateAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Select "Crédito" or "Préstamo" as the account type to reveal the credit card / loan fields. */
export const ButtonMode: Story = {
	args: {
		mode: "button",
	},
};

export const IconMode: Story = {
	args: {
		mode: "icon",
	},
};

export const CardMode: Story = {
	args: {
		mode: "card",
	},
	render: (args) => (
		<div className="w-80">
			<CreateAccount {...args} />
		</div>
	),
};

export const WithPreselectedBank: Story = {
	args: {
		mode: "button",
		bankId: "bank-1",
	},
};
