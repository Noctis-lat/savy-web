import { describe, expect, it } from "vitest";
import { getIncomeSourceFormValues } from "@/utils/income-sources/getIncomeSourceFormValues";
import { INCOME_SOURCE_FIXTURE } from "./incomeSourceFixture";

describe("getIncomeSourceFormValues", () => {
	it("maps the editable fields and sorts paydays", () => {
		expect(getIncomeSourceFormValues(INCOME_SOURCE_FIXTURE)).toEqual({
			name: "Salario",
			amount: 2500000,
			frequency: "BIWEEKLY",
			paydays: [15, 30],
			destinationAccountId: "account-1",
		});
	});
});
