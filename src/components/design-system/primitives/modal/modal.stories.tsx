import type { Meta, StoryObj } from "@storybook/react-vite";
import { CreditCardPlus, Save } from "lucide-react";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { Modal } from ".";

const meta = {
	title: "Design System/Primitives/Modal",
	component: Modal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		icon: CreditCardPlus,
		title: "Crear cuenta",
		description: "Crea una nueva cuenta para llevar tus finanzas",
		content: <p className="text-sm text-muted-foreground">Contenido del modal.</p>,
		children: <Button>Abrir modal</Button>,
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
	args: {
		showCancel: true,
		actions: (
			<Button>
				<Save className="size-4" />
				Guardar
			</Button>
		),
	},
};

/** While saving: Cancel is disabled, the X button is hidden and Escape/outside click are ignored. */
export const CloseDisabled: Story = {
	args: {
		showCancel: true,
		closeDisabled: true,
		actions: (
			<Button disabled>
				<Spinner size={16} />
				Guardando...
			</Button>
		),
	},
};
