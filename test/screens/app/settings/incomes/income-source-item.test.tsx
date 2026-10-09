import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import { toast } from "sonner";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useQueryAccounts } from "@/hooks/accounts/useQueryAccounts";
import { useDeleteIncomeSource } from "@/hooks/income-sources/useDeleteIncomeSource";
import { useUpdateIncomeSource } from "@/hooks/income-sources/useUpdateIncomeSource";
import { IncomeSourceItem } from "@/screens/app/settings/incomes/components/income-source-item";
import {
	DESTINATION_ACCOUNT_FIXTURE,
	INCOME_SOURCE_FIXTURE,
} from "../../../../utils/income-sources/incomeSourceFixture";

vi.mock("@/hooks/accounts/useQueryAccounts", () => ({ useQueryAccounts: vi.fn() }));
vi.mock("@/hooks/income-sources/useUpdateIncomeSource", () => ({
	useUpdateIncomeSource: vi.fn(),
}));
vi.mock("@/hooks/income-sources/useDeleteIncomeSource", () => ({
	useDeleteIncomeSource: vi.fn(),
}));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

type MutateOptions<TData> = {
	onSuccess?: (data: TData) => void;
};

const updateIncomeSourceMutate = vi.fn();
const deleteIncomeSourceMutateAsync = vi.fn();

const mockMutationHook = <THook extends (...args: never[]) => unknown>(
	hook: THook,
	extras: Record<string, unknown>,
): void => {
	vi.mocked(hook).mockReturnValue({ isPending: false, ...extras } as ReturnType<THook>);
};

describe("IncomeSourceItem", () => {
	beforeAll(() => {
		MotionGlobalConfig.skipAnimations = true;
	});

	beforeEach(() => {
		vi.clearAllMocks();

		updateIncomeSourceMutate.mockImplementation(
			(
				_args: { id: string; payload: UpdateIncomeSourcePayload },
				options: MutateOptions<IncomeSource>,
			) => options.onSuccess?.(INCOME_SOURCE_FIXTURE),
		);
		deleteIncomeSourceMutateAsync.mockResolvedValue(undefined);

		vi.mocked(useQueryAccounts).mockReturnValue({
			accounts: [DESTINATION_ACCOUNT_FIXTURE],
			isLoading: false,
		} as ReturnType<typeof useQueryAccounts>);
		mockMutationHook(useUpdateIncomeSource, { mutate: updateIncomeSourceMutate });
		mockMutationHook(useDeleteIncomeSource, { mutateAsync: deleteIncomeSourceMutateAsync });
	});

	it("renders name, frequency, amount, paydays and destination account", () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={false}
			/>,
		);

		expect(screen.getByText("Salario")).toBeInTheDocument();
		expect(screen.getByText("Quincenal")).toBeInTheDocument();
		expect(screen.getByText("$25,000.00")).toBeInTheDocument();
		expect(screen.getByText("Días de pago: 15 y 30")).toBeInTheDocument();
		expect(screen.getByText("Nómina BBVA")).toBeInTheDocument();
		expect(screen.queryByText("Inactiva")).not.toBeInTheDocument();
	});

	it("shows fallbacks for inactive sources and missing accounts", () => {
		vi.mocked(useQueryAccounts).mockReturnValue({
			accounts: [],
			isLoading: false,
		} as unknown as ReturnType<typeof useQueryAccounts>);

		render(
			<IncomeSourceItem
				incomeSource={{ ...INCOME_SOURCE_FIXTURE, isActive: false }}
				isEditing={false}
			/>,
		);

		expect(screen.getByText("Inactiva")).toBeInTheDocument();
		expect(screen.getByText("Cuenta no encontrada")).toBeInTheDocument();
	});

	it("does not show edit and remove buttons when not editing", () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={false}
			/>,
		);

		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("opens the edit modal prefilled with the income source values", async () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /editar fuente de ingreso/i }));

		const dialog = await screen.findByRole("dialog");
		expect(within(dialog).getByRole("textbox", { name: /nombre/i })).toHaveValue("Salario");
		expect(within(dialog).getByRole("textbox", { name: /monto por pago/i })).toHaveValue(
			"$25,000.00",
		);
		expect(within(dialog).getByRole("radio", { name: "Quincenal" })).toHaveAttribute(
			"aria-checked",
			"true",
		);
		expect(within(dialog).getByRole("button", { name: "15" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		expect(within(dialog).getByRole("button", { name: "30" })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	it("calls updateIncomeSource with the edited values", async () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /editar fuente de ingreso/i }));

		const dialog = await screen.findByRole("dialog");
		const nameInput = within(dialog).getByRole("textbox", { name: /nombre/i });
		await userEvent.clear(nameInput);
		await userEvent.type(nameInput, "Salario base");

		await userEvent.click(within(dialog).getByRole("button", { name: "1" }));

		const saveButton = within(dialog).getByRole("button", { name: /guardar cambios/i });
		await waitFor(() => expect(saveButton).toBeEnabled());
		await userEvent.click(saveButton);

		await waitFor(() => expect(updateIncomeSourceMutate).toHaveBeenCalledTimes(1));
		expect(updateIncomeSourceMutate.mock.calls[0][0]).toEqual({
			id: "income-source-1",
			payload: {
				name: "Salario base",
				amount: 2500000,
				frequency: "BIWEEKLY",
				paydays: [1, 30],
				destinationAccountId: "account-1",
			},
		});
		expect(toast.success).toHaveBeenCalledWith("Fuente de ingreso actualizada");
	});

	it("clears paydays and blocks saving when the frequency changes", async () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /editar fuente de ingreso/i }));

		const dialog = await screen.findByRole("dialog");
		await userEvent.click(within(dialog).getByRole("radio", { name: "Semanal" }));

		expect(await within(dialog).findByText("Selecciona un día de la semana")).toBeInTheDocument();
		expect(within(dialog).getByRole("button", { name: /guardar cambios/i })).toBeDisabled();
	});

	it("calls deleteIncomeSource with the id when the removal is confirmed", async () => {
		render(
			<IncomeSourceItem
				incomeSource={INCOME_SOURCE_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /eliminar fuente de ingreso/i }));

		expect(
			await screen.findByText(/¿seguro que quieres eliminar "Salario"\?/i),
		).toBeInTheDocument();

		await userEvent.click(await screen.findByRole("button", { name: /^eliminar$/i }));

		await waitFor(() => expect(deleteIncomeSourceMutateAsync).toHaveBeenCalledTimes(1));
		expect(deleteIncomeSourceMutateAsync.mock.calls[0][0]).toBe("income-source-1");
		expect(toast.success).toHaveBeenCalledWith("Fuente de ingreso eliminada");
	});
});
