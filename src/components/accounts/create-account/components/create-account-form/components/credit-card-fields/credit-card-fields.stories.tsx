import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { CreditCardFields } from ".";

const CreditCardFormProvider = ({
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
	title: "Accounts/CreateAccount/CreditCardFields",
	component: CreditCardFields,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof CreditCardFields>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	decorators: [
		(Story) => (
			<CreditCardFormProvider defaultValues={{ ...CREATE_ACCOUNT_DEFAULT_VALUES, type: "CREDIT" }}>
				<Story />
			</CreditCardFormProvider>
		),
	],
};

export const Filled: Story = {
	decorators: [
		(Story) => (
			<CreditCardFormProvider
				defaultValues={{
					...CREATE_ACCOUNT_DEFAULT_VALUES,
					type: "CREDIT",
					creditLimit: 5000000,
					cutDay: 15,
					paymentDay: 25,
					interestRate: 36.5,
				}}
			>
				<Story />
			</CreditCardFormProvider>
		),
	],
};
