import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import { toast } from "sonner";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";
import { useUpdateCategory } from "@/hooks/categories/useUpdateCategory";
import { CategoryItem } from "@/screens/app/settings/categories/components/category-item";
import { CATEGORY_FIXTURE } from "../../../../utils/categories/categoryFixture";

vi.mock("@/hooks/categories/useUpdateCategory", () => ({ useUpdateCategory: vi.fn() }));
vi.mock("@/hooks/categories/useDeleteCategory", () => ({ useDeleteCategory: vi.fn() }));
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

type MutateOptions<TData> = {
	onSuccess?: (data: TData) => void;
	onError?: (error: unknown) => void;
};

const updateCategoryMutate = vi.fn();
const deleteCategoryMutate = vi.fn();

const mockMutationHook = <THook extends (...args: never[]) => unknown>(
	hook: THook,
	mutate: ReturnType<typeof vi.fn>,
): void => {
	vi.mocked(hook).mockReturnValue({ mutate, isPending: false } as ReturnType<THook>);
};

describe("CategoryItem", () => {
	beforeAll(() => {
		MotionGlobalConfig.skipAnimations = true;
	});

	beforeEach(() => {
		vi.clearAllMocks();

		updateCategoryMutate.mockImplementation(
			(_args: { id: string; payload: UpdateCategoryPayload }, options: MutateOptions<Category>) =>
				options.onSuccess?.({ ...CATEGORY_FIXTURE, ...options } as Category),
		);
		deleteCategoryMutate.mockImplementation((_id: string, options: MutateOptions<void>) =>
			options.onSuccess?.(undefined),
		);

		mockMutationHook(useUpdateCategory, updateCategoryMutate);
		mockMutationHook(useDeleteCategory, deleteCategoryMutate);
	});

	it("renders the category name and type badge", () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={false}
			/>,
		);

		expect(screen.getByText("Comida")).toBeInTheDocument();
		expect(screen.getByText("Gasto")).toBeInTheDocument();
	});

	it("does not show edit and remove buttons when not editing", () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={false}
			/>,
		);

		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("opens the edit modal when the edit button is clicked", async () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={true}
			/>,
		);

		const editButton = screen.getByRole("button", { name: /editar categoría/i });
		await userEvent.click(editButton);

		const dialog = await screen.findByRole("dialog");
		expect(dialog).toBeInTheDocument();

		const nameInput = screen.getByRole("textbox") as HTMLInputElement;
		expect(nameInput).toHaveValue("Comida");
	});

	it("opens the confirmation alert dialog when the trash button is clicked", async () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={true}
			/>,
		);

		const trashButton = screen.getByRole("button", { name: /eliminar categoría/i });
		await userEvent.click(trashButton);

		expect(await screen.findByText(/¿seguro que quieres eliminar "Comida"\?/i)).toBeInTheDocument();
	});

	it("calls deleteCategory when the confirm action is clicked", async () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /eliminar categoría/i }));

		const confirmButton = await screen.findByRole("button", { name: /^eliminar$/i });
		await userEvent.click(confirmButton);

		await waitFor(() => expect(deleteCategoryMutate).toHaveBeenCalledTimes(1));
		expect(deleteCategoryMutate.mock.calls[0][0]).toBe("category-1");
		expect(toast.success).toHaveBeenCalledWith("Categoría eliminada");
	});

	it("calls updateCategory when the edit form is submitted", async () => {
		render(
			<CategoryItem
				category={CATEGORY_FIXTURE}
				isEditing={true}
			/>,
		);

		await userEvent.click(screen.getByRole("button", { name: /editar categoría/i }));

		const nameInput = (await screen.findByRole("textbox")) as HTMLInputElement;
		await userEvent.clear(nameInput);
		await userEvent.type(nameInput, "Transporte");

		const saveButton = screen.getByRole("button", { name: /guardar cambios/i });
		await waitFor(() => expect(saveButton).toBeEnabled());
		await userEvent.click(saveButton);

		await waitFor(() => expect(updateCategoryMutate).toHaveBeenCalledTimes(1));
		expect(updateCategoryMutate.mock.calls[0][0]).toEqual({
			id: "category-1",
			payload: { name: "Transporte", color: undefined, icon: undefined },
		});
		expect(toast.success).toHaveBeenCalledWith("Categoría actualizada");
	});
});
