import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CrossFade } from ".";

const meta = {
	title: "Design System/Animations/CrossFade",
	component: CrossFade,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	args: {
		activeKey: "first",
		children: null,
	},
} satisfies Meta<typeof CrossFade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle: Story = {
	render: () => {
		const [isAlternate, setIsAlternate] = useState<boolean>(false);

		return (
			<div className="flex w-72 flex-col items-start gap-4">
				<Button
					type="button"
					variant="outline"
					onClick={() => setIsAlternate((previous) => !previous)}
				>
					Cambiar contenido
				</Button>
				<CrossFade activeKey={isAlternate ? "alternate" : "default"}>
					<p className="text-sm text-foreground">{isAlternate ? "Modo edición" : "Modo lectura"}</p>
				</CrossFade>
			</div>
		);
	},
};
