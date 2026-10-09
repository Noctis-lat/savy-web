import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAccount } from "@/components/accounts/create-account";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { useQueryBanks } from "@/hooks/banks/useQueryBanks";
import { useCreateCreditCard } from "@/hooks/credit-cards/useCreateCreditCard";
import { useCreateLoan } from "@/hooks/loans/useCreateLoan";
import { useCreateSavingsGoal } from "@/hooks/savings-goals/useCreateSavingsGoal";

vi.mock("@/hooks/accounts/useCreateAccount", () => ({ useCreateAccount: vi.fn() }));
vi.mock("@/hooks/accounts/useDeleteAccount", () => ({ useDeleteAccount: vi.fn() }));
vi.mock("@/hooks/credit-cards/useCreateCreditCard", () => ({ useCreateCreditCard: vi.fn() }));
vi.mock("@/hooks/loans/useCreateLoan", () => ({ useCreateLoan: vi.fn() }));
vi.mock("@/hooks/savings-goals/useCreateSavingsGoal", () => ({ useCreateSavingsGoal: vi.fn() }));
vi.mock("@/hooks/banks/useQueryBanks", () => ({ useQueryBanks: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

type MutateOptions<TData> = {
	onSuccess?: (data: TData) => void;
	onError?: (error: unknown) => void;
};

const NEW_ACCOUNT: Account = {
	id: "account-1",
	profileId: "profile-1",
	bankId: undefined,
	name: "Cuenta principal",
	type: "DEBIT",
	currency: "MXN",
	balance: 0,
	color: undefined,
	icon: undefined,
	isActive: true,
	createdAt: "2026-10-03T00:00:00Z",
	updatedAt: "2026-10-03T00:00:00Z",
};

const createAccountMutate = vi.fn();

const mockMutationHook = <THook extends (...args: never[]) => unknown>(
	hook: THook,
	mutate: ReturnType<typeof vi.fn>,
): void => {
	vi.mocked(hook).mockReturnValue({ mutate, isPending: false } as ReturnType<THook>);
};

/** Opens the modal, fills the required name and starts saving a DEBIT account. */
const openAndSubmit = async (): Promise<void> => {
	render(<CreateAccount />);
	await userEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

	const dialog = await screen.findByRole("dialog");
	const [nameInput] = screen.getAllByRole("textbox");
	await userEvent.type(nameInput, "Cuenta principal");

	const submitButton = screen.getByRole("button", { name: /guardar cuenta/i });
	await waitFor(() => expect(submitButton).toBeEnabled());
	await userEvent.click(submitButton);

	expect(dialog).toBeInTheDocument();
};

describe("CreateAccount", () => {
	let pendingOptions: MutateOptions<Account> | undefined;

	beforeEach(() => {
		vi.clearAllMocks();
		pendingOptions = undefined;

		// Never resolves on its own: the test decides when the chain settles.
		createAccountMutate.mockImplementation(
			(_payload: CreateAccountPayload, options: MutateOptions<Account>) => {
				pendingOptions = options;
			},
		);

		mockMutationHook(useCreateAccount, createAccountMutate);
		mockMutationHook(useCreateCreditCard, vi.fn());
		mockMutationHook(useCreateLoan, vi.fn());
		mockMutationHook(useCreateSavingsGoal, vi.fn());
		mockMutationHook(useDeleteAccount, vi.fn());
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

	it("blocks Cancel, Escape and the close button while saving, then closes on success", async () => {
		await openAndSubmit();

		const cancelButton = await screen.findByRole("button", { name: /cancelar/i });
		await waitFor(() => expect(cancelButton).toBeDisabled());
		expect(screen.queryByRole("button", { name: /close/i })).not.toBeInTheDocument();

		await userEvent.click(cancelButton);
		await userEvent.keyboard("{Escape}");
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		act(() => pendingOptions?.onSuccess?.(NEW_ACCOUNT));

		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});

	it("stays open and becomes closable again when saving fails", async () => {
		await openAndSubmit();

		act(() => pendingOptions?.onError?.(new Error("boom")));

		const cancelButton = screen.getByRole("button", { name: /cancelar/i });
		await waitFor(() => expect(cancelButton).toBeEnabled());
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		await userEvent.keyboard("{Escape}");

		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});

	it("can be reopened and closed normally after a successful save", async () => {
		await openAndSubmit();
		act(() => pendingOptions?.onSuccess?.(NEW_ACCOUNT));
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

		await userEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));
		const cancelButton = await screen.findByRole("button", { name: /cancelar/i });
		expect(cancelButton).toBeEnabled();

		await userEvent.click(cancelButton);

		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});
});
