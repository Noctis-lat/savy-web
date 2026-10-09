import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pencil, SlidersHorizontal, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTabs } from ".";

type AppTabsStoryData = {
	name: string;
	currency: string;
};

const STORY_DATA: AppTabsStoryData = { name: "Ana García", currency: "MXN" };

const STORY_CONFIG = [
	{
		label: "Información personal",
		value: "personal",
		icon: UserRound,
		content: (data: AppTabsStoryData) => <p className="text-sm text-foreground">{data.name}</p>,
	},
	{
		label: "Preferencias",
		value: "preferences",
		icon: SlidersHorizontal,
		content: (data: AppTabsStoryData) => <p className="text-sm text-foreground">{data.currency}</p>,
	},
];

const meta: Meta = {
	title: "Design System/Navigation/AppTabs",
	parameters: { layout: "padded" },
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<AppTabs
			config={STORY_CONFIG}
			data={STORY_DATA}
		/>
	),
};

export const Line: Story = {
	render: () => (
		<AppTabs
			config={STORY_CONFIG}
			data={STORY_DATA}
			variant="line"
		/>
	),
};

export const LineWithAction: Story = {
	render: () => (
		<AppTabs
			config={STORY_CONFIG}
			data={STORY_DATA}
			variant="line"
			action={
				<Button
					type="button"
					variant="outline"
					size="sm"
				>
					<Pencil />
					Editar
				</Button>
			}
		/>
	),
};
