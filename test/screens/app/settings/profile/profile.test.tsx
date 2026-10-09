import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import { toast } from "sonner";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useQueryProfile } from "@/hooks/profile/useQueryProfile";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { ProfileContent } from "@/screens/app/settings/profile/components/profile-content";
import { PROFILE_FIXTURE } from "../../../../utils/profile/profileFixture";

vi.mock("@/hooks/profile/useQueryProfile", () => ({ useQueryProfile: vi.fn() }));
vi.mock("@/hooks/profile/useUpdateProfile", () => ({ useUpdateProfile: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

type MutateOptions = {
	onSuccess?: (profile: Profile) => void;
};

const updateProfileMutate = vi.fn();

const getEditButton = (sectionName: RegExp): HTMLElement =>
	screen.getByRole("button", { name: sectionName });

const getActivePanel = (): HTMLElement => screen.getByRole("tabpanel");

const startEditingPersonal = async (): Promise<HTMLElement> => {
	await userEvent.click(getEditButton(/editar información personal/i));
	return screen.findByRole("textbox", { name: /^nombre/i });
};

describe("Profile settings", () => {
	beforeAll(() => {
		MotionGlobalConfig.skipAnimations = true;
	});

	beforeEach(() => {
		vi.clearAllMocks();
		updateProfileMutate.mockReset();
		vi.mocked(useQueryProfile).mockReturnValue({ profile: PROFILE_FIXTURE, isLoading: false });
		vi.mocked(useUpdateProfile).mockReturnValue({
			mutate: updateProfileMutate,
			isPending: false,
		} as unknown as ReturnType<typeof useUpdateProfile>);
	});

	it("renders the identity block and line-variant tabs with the personal tab active", () => {
		render(<ProfileContent />);

		expect(screen.getByText("Ana García")).toBeInTheDocument();
		expect(screen.getByText("ana@example.com")).toBeInTheDocument();
		expect(screen.getByRole("tablist")).toHaveAttribute("data-variant", "line");

		const tabs = screen.getAllByRole("tab");
		expect(tabs.map((tab) => tab.textContent)).toEqual(["Información personal", "Preferencias"]);
		expect(screen.getByRole("tab", { name: "Información personal" })).toHaveAttribute(
			"aria-selected",
			"true",
		);

		const panel = getActivePanel();
		expect(within(panel).getByText("Ana")).toBeInTheDocument();
		expect(within(panel).getByText("Sin especificar")).toBeInTheDocument();
		expect(within(panel).getByText("(555) 123-4567")).toBeInTheDocument();
		expect(within(panel).queryByRole("textbox")).not.toBeInTheDocument();
	});

	it("keeps the Editar button outside the card and labels it with the active section", async () => {
		render(<ProfileContent />);

		const editButton = getEditButton(/editar información personal/i);
		expect(getActivePanel()).not.toContainElement(editButton);

		await userEvent.click(screen.getByRole("tab", { name: "Preferencias" }));

		expect(getEditButton(/editar preferencias/i)).toBeInTheDocument();
		expect(within(getActivePanel()).getByText("Peso mexicano (MXN)")).toBeInTheDocument();
	});

	it("edits the active tab inline without a dialog and focuses the first field", async () => {
		render(<ProfileContent />);

		const firstNameInput = await startEditingPersonal();

		expect(getActivePanel()).toContainElement(firstNameInput);
		expect(firstNameInput).toHaveValue("Ana");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(getEditButton(/editar información personal/i)).toBeDisabled();
		await waitFor(() => expect(firstNameInput).toHaveFocus());
	});

	it("exits edit mode and discards changes when switching tabs", async () => {
		render(<ProfileContent />);

		const firstNameInput = await startEditingPersonal();
		await userEvent.clear(firstNameInput);
		await userEvent.type(firstNameInput, "Lucía");

		await userEvent.click(screen.getByRole("tab", { name: "Preferencias" }));
		expect(getEditButton(/editar preferencias/i)).toBeEnabled();
		expect(within(getActivePanel()).queryByRole("combobox")).not.toBeInTheDocument();

		await userEvent.click(screen.getByRole("tab", { name: "Información personal" }));

		const panel = getActivePanel();
		expect(within(panel).queryByRole("textbox")).not.toBeInTheDocument();
		expect(within(panel).getByText("Ana")).toBeInTheDocument();
		expect(screen.queryByText("Lucía")).not.toBeInTheDocument();
		expect(updateProfileMutate).not.toHaveBeenCalled();
	});

	it("restores values on Cancelar and returns focus to Editar", async () => {
		render(<ProfileContent />);

		const firstNameInput = await startEditingPersonal();
		await userEvent.clear(firstNameInput);
		await userEvent.type(firstNameInput, "Lucía");
		await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));

		await waitFor(() => expect(within(getActivePanel()).getByText("Ana")).toBeInTheDocument());
		expect(screen.queryByText("Lucía")).not.toBeInTheDocument();
		await waitFor(() => expect(getEditButton(/editar información personal/i)).toHaveFocus());

		expect(await startEditingPersonal()).toHaveValue("Ana");
	});

	it("cancels editing with the Escape key", async () => {
		render(<ProfileContent />);

		await startEditingPersonal();
		await userEvent.keyboard("{Escape}");

		await waitFor(() =>
			expect(within(getActivePanel()).queryByRole("textbox")).not.toBeInTheDocument(),
		);
		expect(getEditButton(/editar información personal/i)).toBeEnabled();
	});

	it("saves only the personal fields, toasts and returns focus to Editar", async () => {
		updateProfileMutate.mockImplementation(
			(payload: UpdateProfilePayload, options?: MutateOptions) => {
				options?.onSuccess?.({ ...PROFILE_FIXTURE, ...payload } as Profile);
			},
		);

		render(<ProfileContent />);

		const firstNameInput = await startEditingPersonal();
		await userEvent.clear(firstNameInput);
		await userEvent.type(firstNameInput, "Lucía");
		await userEvent.clear(screen.getByRole("textbox", { name: /teléfono/i }));

		const saveButton = screen.getByRole("button", { name: /guardar/i });
		await waitFor(() => expect(saveButton).toBeEnabled());
		await userEvent.click(saveButton);

		expect(updateProfileMutate).toHaveBeenCalledTimes(1);
		expect(updateProfileMutate.mock.calls[0][0]).toEqual({
			firstName: "Lucía",
			lastName: "García",
			secondLastName: null,
			phone: null,
		});
		expect(toast.success).toHaveBeenCalledWith("Perfil actualizado");
		await waitFor(() => expect(getEditButton(/editar información personal/i)).toHaveFocus());
	});

	it("stays in edit mode when the update fails", async () => {
		render(<ProfileContent />);

		const firstNameInput = await startEditingPersonal();
		await userEvent.type(firstNameInput, "a");

		const saveButton = screen.getByRole("button", { name: /guardar/i });
		await waitFor(() => expect(saveButton).toBeEnabled());
		await userEvent.click(saveButton);

		expect(updateProfileMutate).toHaveBeenCalledTimes(1);
		expect(toast.success).not.toHaveBeenCalled();
		expect(screen.getByRole("textbox", { name: /^nombre/i })).toBeInTheDocument();
	});
});
