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
	args: {
		value: undefined,
		onChange: () => undefined,
	},
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
	args: {
		value: "#3b82f6",
		onChange: () => undefined,
	},
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
	args: {
		value: "#10b981",
		onChange: () => undefined,
		label: "Color del banco",
	},
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
	args: {
		value: "#f97316",
		onChange: () => undefined,
		disabled: true,
	},
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
