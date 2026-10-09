import { describe, expect, it } from "vitest";
import { formatDestinationAccountOptions } from "@/utils/income-sources/formatDestinationAccountOptions";

const buildAccount = (id: string, type: AccountType): Account =>
	({ id, name: `Cuenta ${id}`, type }) as Account;

describe("formatDestinationAccountOptions", () => {
	it("keeps only DEBIT and CASH accounts", () => {
		const accounts = [
			buildAccount("1", "DEBIT"),
			buildAccount("2", "CREDIT"),
			buildAccount("3", "CASH"),
			buildAccount("4", "LOAN"),
		];

		expect(formatDestinationAccountOptions(accounts)).toEqual([
			{ label: "Cuenta 1", value: "1" },
			{ label: "Cuenta 3", value: "3" },
		]);
	});

	it("returns an empty list when accounts are not loaded", () => {
		expect(formatDestinationAccountOptions(undefined)).toEqual([]);
	});
});
