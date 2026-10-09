import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IncomeScheduleFields } from "@/components/income-sources/income-schedule-fields";
import {
	type CreateIncomeSourceFormValues,
	createIncomeSourceSchema,
} from "@/schemas/income-sources/createIncomeSourceSchema";

const ScheduleFormWrapper = ({
	defaultValues,
	children,
}: {
	defaultValues: Pick<CreateIncomeSourceFormValues, "frequency" | "paydays">;
	children: React.ReactNode;
}) => {
	const scheduleForm = useForm<CreateIncomeSourceFormValues>({
		resolver: zodResolver(createIncomeSourceSchema),
		mode: "onChange",
		defaultValues: {
			name: "Salario",
			amount: 2500000,
			destinationAccountId: "account-1",
			...defaultValues,
		},
	});

	return (
		<FormProvider {...scheduleForm}>
			<div className="w-96">{children}</div>
		</FormProvider>
	);
};

const meta = {
	title: "Income Sources/IncomeScheduleFields",
	component: IncomeScheduleFields,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof IncomeScheduleFields>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
	render: () => (
		<ScheduleFormWrapper defaultValues={{ frequency: "MONTHLY", paydays: [15] }}>
			<IncomeScheduleFields />
		</ScheduleFormWrapper>
	),
};

export const Biweekly: Story = {
	render: () => (
		<ScheduleFormWrapper defaultValues={{ frequency: "BIWEEKLY", paydays: [15, 30] }}>
			<IncomeScheduleFields />
		</ScheduleFormWrapper>
	),
};

export const Weekly: Story = {
	render: () => (
		<ScheduleFormWrapper defaultValues={{ frequency: "WEEKLY", paydays: [5] }}>
			<IncomeScheduleFields />
		</ScheduleFormWrapper>
	),
};
