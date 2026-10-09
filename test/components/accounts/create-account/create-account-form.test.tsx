import { zodResolver } from "@hookform/resolvers/zod";
import { act, render, screen, waitFor } from "@testing-library/react";
import type React from "react";
import { FormProvider, type UseFormReturn, useForm } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAccountForm } from "@/components/accounts/create-account/components/create-account-form";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";

vi.mock("@/hooks/banks/useQueryBanks", () => ({ useQueryBanks: vi.fn() }));

let harnessForm: UseFormReturn<CreateAccountFormValues> | undefined;

const FormHarness = ({
	defaultValues,
}: {
	defaultValues: CreateAccountFormValues;
}): React.ReactElement => {
	const createAccountForm = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
		defaultValues,
	});
	harnessForm = createAccountForm;

	return (
		<FormProvider {...createAccountForm}>
			<CreateAccountForm />
		</FormProvider>
	);
};

const getForm = (): UseFormReturn<CreateAccountFormValues> => {
	if (!harnessForm) throw new Error("Form harness not rendered");
	return harnessForm;
};

const changeType = async (type: CreateAccountFormValues["type"]): Promise<void> => {
	await act(async () => {
		getForm().setValue("type", type);
	});
};

const CREDIT_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Tarjeta Oro",
	type: "CREDIT",
	creditLimit: 5000000,
	cutDay: 15,
	paymentDay: 25,
	interestRate: 36.5,
};

describe("CreateAccountForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		harnessForm = undefined;
		vi.mocked(useQueryBanks).mockReturnValue({
			banks: [],
			banksInfo: undefined,
			page: undefined,
			perPage: undefined,
			total: undefined,
			totalPages: undefined,
			isLoading: false,
		});
	});

	it("renders only the sub-section of the selected type", async () => {
		render(<FormHarness defaultValues={CREDIT_VALUES} />);

		expect(screen.getByText("Datos de la tarjeta")).toBeInTheDocument();
		expect(screen.queryByText("Datos del préstamo")).not.toBeInTheDocument();
		expect(screen.queryByText("Datos del ahorro")).not.toBeInTheDocument();

		await changeType("LOAN");
		expect(screen.getByText("Datos del préstamo")).toBeInTheDocument();
		expect(screen.queryByText("Datos de la tarjeta")).not.toBeInTheDocument();

		await changeType("SAVINGS");
		expect(screen.getByText("Datos del ahorro")).toBeInTheDocument();
		expect(screen.queryByText("Datos del préstamo")).not.toBeInTheDocument();

		await changeType("DEBIT");
		expect(screen.queryByText("Datos de la tarjeta")).not.toBeInTheDocument();
		expect(screen.queryByText("Datos del préstamo")).not.toBeInTheDocument();
		expect(screen.queryByText("Datos del ahorro")).not.toBeInTheDocument();
	});

	it("resets credit fields when leaving CREDIT and keeps interestRate only for LOAN", async () => {
		render(<FormHarness defaultValues={CREDIT_VALUES} />);

		await changeType("LOAN");
		await waitFor(() => {
			expect(getForm().getValues("creditLimit")).toBeUndefined();
		});
		expect(getForm().getValues("cutDay")).toBeUndefined();
		expect(getForm().getValues("paymentDay")).toBeUndefined();
		expect(getForm().getValues("interestRate")).toBe(36.5);

		await changeType("DEBIT");
		await waitFor(() => {
			expect(getForm().getValues("interestRate")).toBeUndefined();
		});
	});

	it("resets savings fields to their defaults when leaving SAVINGS", async () => {
		render(
			<FormHarness
				defaultValues={{
					...CREATE_ACCOUNT_DEFAULT_VALUES,
					name: "Fondo",
					type: "SAVINGS",
					isCashSavings: true,
					savingsTargetAmount: 2500000,
					savingsDeadline: "2027-06-30",
				}}
			/>,
		);

		await changeType("DEBIT");
		await waitFor(() => {
			expect(getForm().getValues("isCashSavings")).toBe(false);
		});
		expect(getForm().getValues("savingsTargetAmount")).toBeUndefined();
		expect(getForm().getValues("savingsDeadline")).toBeUndefined();
	});

	it("renders the savings switch only for SAVINGS", async () => {
		render(<FormHarness defaultValues={CREDIT_VALUES} />);

		expect(screen.queryByText("Tipo de ahorro")).not.toBeInTheDocument();
		expect(screen.queryByRole("switch")).not.toBeInTheDocument();

		await changeType("SAVINGS");
		expect(screen.getByText("Tipo de ahorro")).toBeInTheDocument();
		expect(screen.getByRole("switch")).toBeInTheDocument();

		await changeType("LOAN");
		expect(screen.queryByText("Tipo de ahorro")).not.toBeInTheDocument();
		expect(screen.queryByRole("switch")).not.toBeInTheDocument();
	});
});
