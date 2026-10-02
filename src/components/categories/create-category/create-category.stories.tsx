import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { CreateCategory } from "@/components/categories/create-category";

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
	title: "Categories/CreateCategory",
	component: CreateCategory,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<QueryWrapper>
				<Story />
			</QueryWrapper>
		),
	],
} satisfies Meta<typeof CreateCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

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
			<CreateCategory {...args} />
		</div>
	),
};

export const EmbeddedMode: Story = {
	args: {
		mode: "embedded",
		categoryType: "EXPENSE",
	},
	render: (args) => (
		<div className="w-96">
			<CreateCategory {...args} />
		</div>
	),
};

export const EmbeddedIncome: Story = {
	args: {
		mode: "embedded",
		categoryType: "INCOME",
	},
	render: (args) => (
		<div className="w-96">
			<CreateCategory {...args} />
		</div>
	),
};
