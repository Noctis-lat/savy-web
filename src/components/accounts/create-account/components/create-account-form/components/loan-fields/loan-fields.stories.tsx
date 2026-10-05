import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { LoanFields } from ".";

const LoanFormProvider = ({
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
	title: "Accounts/CreateAccount/LoanFields",
	component: LoanFields,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof LoanFields>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	decorators: [
		(Story) => (
			<LoanFormProvider defaultValues={{ ...CREATE_ACCOUNT_DEFAULT_VALUES, type: "LOAN" }}>
				<Story />
			</LoanFormProvider>
		),
	],
};

export const Filled: Story = {
	decorators: [
		(Story) => (
			<LoanFormProvider
				defaultValues={{
					...CREATE_ACCOUNT_DEFAULT_VALUES,
					type: "LOAN",
					principal: 100000000,
					interestRate: 9.75,
					termMonths: 240,
					monthlyPayment: 950000,
					startDate: "2026-10-03",
				}}
			>
				<Story />
			</LoanFormProvider>
		),
	],
};
