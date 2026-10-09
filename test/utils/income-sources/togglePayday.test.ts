import { describe, expect, it } from "vitest";
import { togglePayday } from "@/utils/income-sources/togglePayday";

describe("togglePayday", () => {
	it("removes an already selected day", () => {
		expect(togglePayday([15, 30], 15, "BIWEEKLY")).toEqual([30]);
	});

	it("adds a day and keeps the result sorted", () => {
		expect(togglePayday([30], 15, "BIWEEKLY")).toEqual([15, 30]);
	});

	it("drops the oldest selection when the limit is reached", () => {
		expect(togglePayday([15, 30], 1, "BIWEEKLY")).toEqual([1, 30]);
	});

	it("replaces the selection for single-day frequencies", () => {
		expect(togglePayday([15], 20, "MONTHLY")).toEqual([20]);
		expect(togglePayday([1], 5, "WEEKLY")).toEqual([5]);
	});
});
