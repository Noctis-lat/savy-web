import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { CreateIncomeSource } from "@/components/income-sources/create-income-source";

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
	title: "Income Sources/CreateIncomeSource",
	component: CreateIncomeSource,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<QueryWrapper>
				<Story />
			</QueryWrapper>
		),
	],
} satisfies Meta<typeof CreateIncomeSource>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonMode: Story = {
	args: {
		mode: "button",
	},
};

export const CardMode: Story = {
	args: {
		mode: "card",
	},
	render: (args) => (
		<div className="w-80">
			<CreateIncomeSource {...args} />
		</div>
	),
};
