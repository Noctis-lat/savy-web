import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { SavingsFields } from ".";

const SavingsFormProvider = ({
	defaultValues,
	children,
}: {
	defaultValues: CreateAccountFormValues;
	children: React.ReactNode;
}) => {
	const createAccountForm = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
		defaultValues,
	});

	return (
		<FormProvider {...createAccountForm}>
			<div className="w-96">{children}</div>
		</FormProvider>
	);
};

const meta = {
	title: "Accounts/CreateAccount/SavingsFields",
	component: SavingsFields,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof SavingsFields>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	decorators: [
		(Story) => (
			<SavingsFormProvider defaultValues={{ ...CREATE_ACCOUNT_DEFAULT_VALUES, type: "SAVINGS" }}>
				<Story />
			</SavingsFormProvider>
		),
	],
};

export const Filled: Story = {
	decorators: [
		(Story) => (
			<SavingsFormProvider
				defaultValues={{
					...CREATE_ACCOUNT_DEFAULT_VALUES,
					type: "SAVINGS",
					savingsTargetAmount: 2500000,
					savingsDeadline: "2027-06-30",
				}}
			>
				<Story />
			</SavingsFormProvider>
		),
	],
};
