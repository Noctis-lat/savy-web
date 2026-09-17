import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from ".";

const meta = {
	title: "Design System/Primitives/Spinner",
	component: Spinner,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: 12,
	},
};

export const Large: Story = {
	args: {
		size: 32,
	},
};

export const WithClassName: Story = {
	args: {
		size: 24,
		className: "text-primary",
	},
};
