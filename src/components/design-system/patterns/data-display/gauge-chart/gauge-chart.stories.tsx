import type { Meta, StoryObj } from "@storybook/react-vite";
import { GaugeChart } from "@/components/design-system/patterns/data-display/gauge-chart";

const meta = {
	title: "Design System/Data Display/GaugeChart",
	component: GaugeChart,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof GaugeChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatCurrency = (value: number) => `$${(value / 100).toFixed(2)}`;

export const Default: Story = {
	args: {
		value: 8000,
		max: 10000,
		label: "Ahorrado",
		formatValue: formatCurrency,
	},
	render: (args) => <GaugeChart {...args} />,
};

export const Empty: Story = {
	args: {
		value: 0,
		max: 10000,
		label: "Ahorrado",
		formatValue: formatCurrency,
	},
	render: (args) => <GaugeChart {...args} />,
};

export const Full: Story = {
	args: {
		value: 10000,
		max: 10000,
		label: "Meta alcanzada",
		formatValue: formatCurrency,
	},
	render: (args) => <GaugeChart {...args} />,
};

export const NoLabel: Story = {
	args: {
		value: 4500,
		max: 10000,
		formatValue: formatCurrency,
	},
	render: (args) => <GaugeChart {...args} />,
};
