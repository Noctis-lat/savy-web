import { zodResolver } from "@hookform/resolvers/zod";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAccountSubmit } from "@/components/accounts/create-account/components/create-account-submit";
import { CREATE_ACCOUNT_DEFAULT_VALUES } from "@/content/accounts/createAccountValues";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { useCreateCreditCard } from "@/hooks/credit-cards/useCreateCreditCard";
import { useCreateLoan } from "@/hooks/loans/useCreateLoan";
import { useCreateSavingsGoal } from "@/hooks/savings-goals/useCreateSavingsGoal";
import {
	type CreateAccountFormValues,
	createAccountSchema,
} from "@/schemas/accounts/createAccountSchema";
import { buildLoanPayload } from "@/utils/accounts/buildLoanPayload";

vi.mock("@/hooks/accounts/useCreateAccount", () => ({ useCreateAccount: vi.fn() }));
vi.mock("@/hooks/accounts/useDeleteAccount", () => ({ useDeleteAccount: vi.fn() }));
vi.mock("@/hooks/credit-cards/useCreateCreditCard", () => ({ useCreateCreditCard: vi.fn() }));
vi.mock("@/hooks/loans/useCreateLoan", () => ({ useCreateLoan: vi.fn() }));
vi.mock("@/hooks/savings-goals/useCreateSavingsGoal", () => ({ useCreateSavingsGoal: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));
vi.mock("@/utils/accounts/buildLoanPayload", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/utils/accounts/buildLoanPayload")>();
	return { buildLoanPayload: vi.fn(actual.buildLoanPayload) };
});

type MutateOptions<TData> = {
	onSuccess?: (data: TData) => void;
	onError?: (error: unknown) => void;
	onSettled?: () => void;
};

const NEW_ACCOUNT: Account = {
	id: "account-1",
	profileId: "profile-1",
	bankId: undefined,
	name: "Tarjeta Oro",
	type: "CREDIT",
	currency: "MXN",
	balance: 0,
	color: undefined,
	icon: undefined,
	isActive: true,
	createdAt: "2026-10-03T00:00:00Z",
	updatedAt: "2026-10-03T00:00:00Z",
};

const CREDIT_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Tarjeta Oro",
	type: "CREDIT",
	creditLimit: 5000050,
	cutDay: 15,
	paymentDay: 25,
	interestRate: 16.5,
};

const LOAN_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Hipoteca",
	type: "LOAN",
	principal: 100000000,
	interestRate: 9.75,
	termMonths: 240,
	monthlyPayment: 950000,
	startDate: "2026-10-03",
};

const SAVINGS_VALUES: CreateAccountFormValues = {
	...CREATE_ACCOUNT_DEFAULT_VALUES,
	name: "Fondo de emergencia",
	type: "SAVINGS",
	savingsTargetAmount: 2500050,
	savingsDeadline: "2027-06-30",
};

const createAccountMutate = vi.fn();
const createSavingsGoalMutate = vi.fn();
const createCreditCardMutate = vi.fn();
const createLoanMutate = vi.fn();
const deleteAccountMutate = vi.fn();

const mockMutationHook = <THook extends (...args: never[]) => unknown>(
	hook: THook,
	mutate: ReturnType<typeof vi.fn>,
): void => {
	vi.mocked(hook).mockReturnValue({ mutate, isPending: false } as ReturnType<THook>);
};

const FormWrapper = ({
	defaultValues,
	children,
}: {
	defaultValues: CreateAccountFormValues;
	children: React.ReactNode;
}): React.ReactElement => {
	const createAccountForm = useForm<CreateAccountFormValues>({
		resolver: zodResolver(createAccountSchema),
		mode: "onChange",
		defaultValues,
	});

	return <FormProvider {...createAccountForm}>{children}</FormProvider>;
};

const renderSubmit = (onSuccess: () => void, defaultValues = CREDIT_VALUES) =>
	render(
		<FormWrapper defaultValues={defaultValues}>
			<CreateAccountSubmit onSuccess={onSuccess} />
		</FormWrapper>,
	);

const clickSubmit = async (): Promise<void> => {
	const submitButton = await screen.findByRole("button", { name: /guardar cuenta/i });
	await waitFor(() => expect(submitButton).toBeEnabled());
	await userEvent.click(submitButton);
};

describe("CreateAccountSubmit", () => {
	beforeEach(() => {
		vi.clearAllMocks();

		createAccountMutate.mockImplementation(
			(_payload: CreateAccountPayload, options: MutateOptions<Account>) =>
				options.onSuccess?.(NEW_ACCOUNT),
		);

		mockMutationHook(useCreateAccount, createAccountMutate);
		mockMutationHook(useCreateCreditCard, createCreditCardMutate);
		mockMutationHook(useCreateLoan, createLoanMutate);
		mockMutationHook(useCreateSavingsGoal, createSavingsGoalMutate);
		mockMutationHook(useDeleteAccount, deleteAccountMutate);
	});

	it("creates the account, then the credit card with the new account id, and closes", async () => {
		createCreditCardMutate.mockImplementation(
			(_payload: CreateCreditCardPayload, options: MutateOptions<CreditCard>) =>
				options.onSuccess?.({} as CreditCard),
		);
		const onSuccess = vi.fn();

		renderSubmit(onSuccess);
		await clickSubmit();

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));

		const [accountPayload] = createAccountMutate.mock.calls[0];
		expect(accountPayload).toEqual({
			name: "Tarjeta Oro",
			type: "CREDIT",
			bankId: undefined,
			balance: 0,
			currency: "MXN",
			color: undefined,
			icon: undefined,
		});

		const [creditCardPayload] = createCreditCardMutate.mock.calls[0];
		expect(creditCardPayload).toEqual({
			accountId: "account-1",
			creditLimit: 5000050,
			cutDay: 15,
			paymentDay: 25,
			interestRate: 0.165,
		});
		expect(createLoanMutate).not.toHaveBeenCalled();
		expect(deleteAccountMutate).not.toHaveBeenCalled();
	});

	it("rolls back the account when the credit card creation fails and keeps the modal open", async () => {
		createCreditCardMutate.mockImplementation(
			(_payload: CreateCreditCardPayload, options: MutateOptions<CreditCard>) =>
				options.onError?.(new Error("boom")),
		);
		deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
			options.onSuccess?.(undefined);
			options.onSettled?.();
		});
		const onSuccess = vi.fn();

		renderSubmit(onSuccess);
		await clickSubmit();

		await waitFor(() => expect(deleteAccountMutate).toHaveBeenCalledTimes(1));
		expect(deleteAccountMutate.mock.calls[0][0]).toBe("account-1");
		expect(onSuccess).not.toHaveBeenCalled();
		expect(toast.error).not.toHaveBeenCalled();
		expect(useDeleteAccount).toHaveBeenCalledWith({ showErrorToast: false });
	});

	it("toasts an explicit error when the rollback also fails", async () => {
		createCreditCardMutate.mockImplementation(
			(_payload: CreateCreditCardPayload, options: MutateOptions<CreditCard>) =>
				options.onError?.(new Error("boom")),
		);
		deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
			options.onError?.(new Error("rollback failed"));
			options.onSettled?.();
		});
		const onSuccess = vi.fn();

		renderSubmit(onSuccess);
		await clickSubmit();

		await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
		expect(vi.mocked(toast.error).mock.calls[0][0]).toContain("Tarjeta Oro");
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it("creates the loan with the new account id, rate fraction and ISO start date", async () => {
		createLoanMutate.mockImplementation(
			(_payload: CreateLoanPayload, options: MutateOptions<Loan>) =>
				options.onSuccess?.({} as Loan),
		);
		const onSuccess = vi.fn();

		renderSubmit(onSuccess, {
			...CREATE_ACCOUNT_DEFAULT_VALUES,
			name: "Hipoteca",
			type: "LOAN",
			principal: 100000000,
			interestRate: 9.75,
			termMonths: 240,
			monthlyPayment: 950000,
			startDate: "2026-10-03",
		});
		await clickSubmit();

		await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
		expect(createLoanMutate.mock.calls[0][0]).toEqual({
			accountId: "account-1",
			principal: 100000000,
			interestRate: 0.0975,
			termMonths: 240,
			monthlyPayment: 950000,
			startDate: new Date(2026, 9, 3).toISOString(),
		});
		expect(createCreditCardMutate).not.toHaveBeenCalled();
	});

	it("rolls back the account when the loan creation fails", async () => {
		createLoanMutate.mockImplementation(
			(_payload: CreateLoanPayload, options: MutateOptions<Loan>) =>
				options.onError?.(new Error("boom")),
		);
		deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
			options.onSuccess?.(undefined);
			options.onSettled?.();
		});
		const onSuccess = vi.fn();

		renderSubmit(onSuccess, LOAN_VALUES);
		await clickSubmit();

		await waitFor(() => expect(deleteAccountMutate).toHaveBeenCalledTimes(1));
		expect(deleteAccountMutate.mock.calls[0][0]).toBe("account-1");
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it("rolls back the account when the entity payload cannot be built", async () => {
		vi.mocked(buildLoanPayload).mockImplementationOnce(() => {
			throw new RangeError("Invalid time value");
		});
		deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
			options.onSuccess?.(undefined);
			options.onSettled?.();
		});
		const onSuccess = vi.fn();

		renderSubmit(onSuccess, LOAN_VALUES);
		await clickSubmit();

		await waitFor(() => expect(deleteAccountMutate).toHaveBeenCalledTimes(1));
		expect(deleteAccountMutate.mock.calls[0][0]).toBe("account-1");
		expect(createLoanMutate).not.toHaveBeenCalled();
		expect(toast.error).toHaveBeenCalledTimes(1);
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it("re-enables the submit button after a rollback", async () => {
		createLoanMutate.mockImplementation(
			(_payload: CreateLoanPayload, options: MutateOptions<Loan>) =>
				options.onError?.(new Error("boom")),
		);
		deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
			options.onSuccess?.(undefined);
			options.onSettled?.();
		});

		renderSubmit(vi.fn(), LOAN_VALUES);
		await clickSubmit();

		await waitFor(() =>
			expect(screen.getByRole("button", { name: /guardar cuenta/i })).toBeEnabled(),
		);
	});

	it("re-enables the button and calls no entity mutation when createAccount fails", async () => {
		createAccountMutate.mockImplementation(
			(_payload: CreateAccountPayload, options: MutateOptions<Account>) =>
				options.onError?.(new Error("boom")),
		);
		const onSuccess = vi.fn();

		renderSubmit(onSuccess);
		await clickSubmit();

		await waitFor(() =>
			expect(screen.getByRole("button", { name: /guardar cuenta/i })).toBeEnabled(),
		);
		expect(createCreditCardMutate).not.toHaveBeenCalled();
		expect(createLoanMutate).not.toHaveBeenCalled();
		expect(createSavingsGoalMutate).not.toHaveBeenCalled();
		expect(deleteAccountMutate).not.toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it("reports pending to the parent while the chain runs and clears it when it settles", async () => {
		let pendingOptions: MutateOptions<Account> | undefined;
		createAccountMutate.mockImplementation(
			(_payload: CreateAccountPayload, options: MutateOptions<Account>) => {
				pendingOptions = options;
			},
		);
		const onPendingChange = vi.fn();

		render(
			<FormWrapper defaultValues={CREDIT_VALUES}>
				<CreateAccountSubmit onPendingChange={onPendingChange} />
			</FormWrapper>,
		);
		await clickSubmit();

		await waitFor(() => expect(onPendingChange).toHaveBeenLastCalledWith(true));
		expect(screen.getByRole("button", { name: /guardando/i })).toBeDisabled();

		act(() => pendingOptions?.onError?.(new Error("boom")));

		await waitFor(() => expect(onPendingChange).toHaveBeenLastCalledWith(false));
	});

	it("clears the parent pending flag when unmounted mid-chain", async () => {
		createAccountMutate.mockImplementation(() => undefined);
		const onPendingChange = vi.fn();

		const { unmount } = render(
			<FormWrapper defaultValues={CREDIT_VALUES}>
				<CreateAccountSubmit onPendingChange={onPendingChange} />
			</FormWrapper>,
		);
		await clickSubmit();
		await waitFor(() => expect(onPendingChange).toHaveBeenLastCalledWith(true));

		unmount();

		expect(onPendingChange).toHaveBeenLastCalledWith(false);
	});

	describe("SAVINGS", () => {
		it.each([
			{ isCashSavings: false, expectedType: "DEBIT" },
			{ isCashSavings: true, expectedType: "CASH" },
		])(
			"creates a $expectedType account and a linked savings goal",
			async ({ isCashSavings, expectedType }) => {
				createSavingsGoalMutate.mockImplementation(
					(_payload: CreateSavingsGoalPayload, options: MutateOptions<SavingsGoal>) =>
						options.onSuccess?.({} as SavingsGoal),
				);
				const onSuccess = vi.fn();

				renderSubmit(onSuccess, { ...SAVINGS_VALUES, isCashSavings });
				await clickSubmit();

				await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
				expect(createAccountMutate.mock.calls[0][0]).toMatchObject({
					name: "Fondo de emergencia",
					type: expectedType,
				});
				expect(createSavingsGoalMutate.mock.calls[0][0]).toEqual({
					accountId: "account-1",
					name: "Fondo de emergencia",
					targetAmount: 2500050,
					deadline: new Date(2027, 5, 30).toISOString(),
				});
				expect(createCreditCardMutate).not.toHaveBeenCalled();
				expect(createLoanMutate).not.toHaveBeenCalled();
				expect(deleteAccountMutate).not.toHaveBeenCalled();
			},
		);

		it("rolls back the account when the savings goal creation fails", async () => {
			createSavingsGoalMutate.mockImplementation(
				(_payload: CreateSavingsGoalPayload, options: MutateOptions<SavingsGoal>) =>
					options.onError?.(new Error("boom")),
			);
			deleteAccountMutate.mockImplementation((_id: string, options: MutateOptions<void>) => {
				options.onSuccess?.(undefined);
				options.onSettled?.();
			});
			const onSuccess = vi.fn();

			renderSubmit(onSuccess, SAVINGS_VALUES);
			await clickSubmit();

			await waitFor(() => expect(deleteAccountMutate).toHaveBeenCalledTimes(1));
			expect(deleteAccountMutate.mock.calls[0][0]).toBe("account-1");
			expect(onSuccess).not.toHaveBeenCalled();
		});
	});
});
