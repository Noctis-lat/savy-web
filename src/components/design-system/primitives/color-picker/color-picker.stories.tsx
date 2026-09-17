import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ColorPicker } from ".";

const meta = {
	title: "Design System/Primitives/ColorPicker",
	component: ColorPicker,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [color, setColor] = useState<string | undefined>(undefined);
		return (
			<ColorPicker
				value={color}
				onChange={setColor}
			/>
		);
	},
};

export const WithValue: Story = {
	render: () => {
		const [color, setColor] = useState<string | undefined>("#3b82f6");
		return (
			<ColorPicker
				value={color}
				onChange={setColor}
			/>
		);
	},
};

export const CustomLabel: Story = {
	render: () => {
		const [color, setColor] = useState<string | undefined>("#10b981");
		return (
			<ColorPicker
				value={color}
				onChange={setColor}
				label="Color del banco"
			/>
		);
	},
};

export const Disabled: Story = {
	render: () => {
		const [color, setColor] = useState<string | undefined>("#f97316");
		return (
			<ColorPicker
				value={color}
				onChange={setColor}
				disabled
			/>
		);
	},
};
