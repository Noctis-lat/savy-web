import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";
import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { FormField } from "@/components/design-system/patterns/forms/form-field";

type PercentageFormValues = {
	rate: number | undefined;
};

let harnessForm: UseFormReturn<PercentageFormValues> | undefined;

const PercentageHarness = (): React.ReactElement => {
	const percentageForm = useForm<PercentageFormValues>({
		mode: "onChange",
		defaultValues: { rate: undefined },
	});
	harnessForm = percentageForm;
	const rate = useWatch({ control: percentageForm.control, name: "rate" });

	return (
		<>
			<FormField
				name="rate"
				form={percentageForm}
				type="percentage"
				label="Tasa"
			/>
			<span data-testid="rate-value">{rate === undefined ? "undefined" : String(rate)}</span>
		</>
	);
};

const renderHarness = (): HTMLInputElement => {
	render(<PercentageHarness />);
	return screen.getByRole("textbox") as HTMLInputElement;
};

const getStoredValue = (): string => screen.getByTestId("rate-value").textContent ?? "";

describe("FormField type=percentage", () => {
	it("stores decimals as a plain percent and shows the suffix", async () => {
		const input = renderHarness();

		await userEvent.type(input, "5.5");

		expect(getStoredValue()).toBe("5.5");
		expect(input).toHaveValue("5.5%");
	});

	it("keeps at most 2 fraction digits", async () => {
		const input = renderHarness();

		await userEvent.type(input, "16.255");

		expect(getStoredValue()).toBe("16.25");
		expect(input).toHaveValue("16.25%");
	});

	it("Backspace with the caret after the suffix removes the last digit", async () => {
		const input = renderHarness();
		await userEvent.type(input, "55");
		expect(input).toHaveValue("55%");

		// jsdom does not move the caret through our requestAnimationFrame correction reliably, so the
		// caret is placed explicitly after "%" — the exact situation the keydown handler targets.
		input.setSelectionRange(input.value.length, input.value.length);
		fireEvent.keyDown(input, { key: "Backspace" });

		expect(getStoredValue()).toBe("5");
		expect(input).toHaveValue("5%");
	});

	it("Backspace after the suffix keeps a trailing decimal point editable", async () => {
		const input = renderHarness();
		await userEvent.type(input, "5.5");

		input.setSelectionRange(input.value.length, input.value.length);
		fireEvent.keyDown(input, { key: "Backspace" });

		expect(getStoredValue()).toBe("5");
		expect(input).toHaveValue("5.%");
	});

	it("select-all and typing the same number keeps the value (old suffix heuristic regression)", async () => {
		const input = renderHarness();
		await userEvent.type(input, "5");
		expect(input).toHaveValue("5%");

		// Replacing the whole selection yields a value without "%" equal to the previous raw text,
		// which the old heuristic misread as a Backspace over the suffix.
		await userEvent.tripleClick(input);
		await userEvent.keyboard("5");

		expect(getStoredValue()).toBe("5");
		expect(input).toHaveValue("5%");
	});

	it("deleting only the suffix does not drop a digit", () => {
		const input = renderHarness();
		fireEvent.change(input, { target: { value: "12" } });
		expect(input).toHaveValue("12%");

		// Forward-Delete of "%" produces "12" with no suffix: the value must stay intact.
		fireEvent.change(input, { target: { value: "12" } });

		expect(getStoredValue()).toBe("12");
		expect(input).toHaveValue("12%");
	});

	it("shows a range error above the default max of 100", async () => {
		const input = renderHarness();

		await userEvent.type(input, "150");

		expect(getStoredValue()).toBe("150");
		expect(await screen.findByText("El valor máximo es 100")).toBeInTheDocument();
	});

	it("reflects external setValue and reset in the displayed text", async () => {
		const input = renderHarness();

		act(() => harnessForm?.setValue("rate", 36.5));
		await waitFor(() => expect(input).toHaveValue("36.5%"));

		act(() => harnessForm?.reset({ rate: undefined }));
		await waitFor(() => expect(input).toHaveValue(""));
		expect(getStoredValue()).toBe("undefined");
	});
});
