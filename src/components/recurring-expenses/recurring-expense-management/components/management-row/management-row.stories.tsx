import type { Meta, StoryObj } from "@storybook/react-vite";
import { PowerOff } from "lucide-react";
import type React from "react";
import { ManagementRow } from "@/components/recurring-expenses/recurring-expense-management/components/management-row";
import { Button } from "@/components/ui/button";

const GlassBackground = ({ children }: { children: React.ReactNode }) => (
	<div className="relative flex size-full min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/15 p-8">
		<div className="pointer-events-none absolute -left-[10%] top-[10%] size-[400px] rounded-full bg-primary/10 blur-[100px]" />
		<div className="pointer-events-none absolute -right-[5%] bottom-[10%] size-[350px] rounded-full bg-primary/8 blur-[100px]" />
		<div className="relative w-full max-w-3xl">{children}</div>
	</div>
);

const meta = {
	title: "Recurring Expenses/RecurringExpenseManagement/ManagementRow",
	component: ManagementRow,
	parameters: { layout: "fullscreen" },
	tags: ["autodocs"],
	render: (args) => (
		<GlassBackground>
			<ManagementRow {...args} />
		</GlassBackground>
	),
} satisfies Meta<typeof ManagementRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAction: Story = {
	args: {
		title: "Desactivar suscripción",
		description: "Deja de generar cobros. El historial se conserva.",
		action: (
			<Button
				variant="outline"
				size="sm"
			>
				<PowerOff />
				Desactivar
			</Button>
		),
	},
};

export const WithoutAction: Story = {
	args: {
		title: "Estado",
		description: "Ya no genera cobros.",
	},
};
