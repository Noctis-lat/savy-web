import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserIcon } from "lucide-react";
import { Item } from "./index";
import { ItemActions } from "./item-actions";
import { ItemContent } from "./item-content";
import { ItemDescription } from "./item-description";
import { ItemHeader } from "./item-header";
import { ItemMedia } from "./item-media";
import { ItemTitle } from "./item-title";

const meta: Meta<typeof Item> = {
	title: "UI/Item",
	component: Item,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
	render: () => (
		<Item className="max-w-sm">
			<ItemMedia>
				<UserIcon className="size-5" />
			</ItemMedia>
			<ItemContent>
				<ItemHeader>
					<ItemTitle>John Doe</ItemTitle>
					<ItemDescription>john.doe@example.com</ItemDescription>
				</ItemHeader>
			</ItemContent>
			<ItemActions>
				<button
					type="button"
					className="text-sm text-primary"
				>
					Edit
				</button>
			</ItemActions>
		</Item>
	),
};
