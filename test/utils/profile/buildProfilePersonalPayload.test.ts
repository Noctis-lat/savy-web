import { describe, expect, it } from "vitest";
import { buildProfilePersonalPayload } from "@/utils/profile/buildProfilePersonalPayload";

describe("buildProfilePersonalPayload", () => {
	it("sends only the personal fields, trimmed", () => {
		expect(
			buildProfilePersonalPayload({
				firstName: "  Ana ",
				lastName: "García ",
				secondLastName: " López",
				phone: "5551234567",
			}),
		).toEqual({
			firstName: "Ana",
			lastName: "García",
			secondLastName: "López",
			phone: "5551234567",
		});
	});

	it("maps empty optional values to null so the backend clears them", () => {
		expect(
			buildProfilePersonalPayload({
				firstName: "Ana",
				lastName: "García",
				secondLastName: "   ",
				phone: "",
			}),
		).toEqual({ firstName: "Ana", lastName: "García", secondLastName: null, phone: null });
	});

	it("maps undefined optional values to null", () => {
		expect(buildProfilePersonalPayload({ firstName: "Ana", lastName: "García" })).toEqual({
			firstName: "Ana",
			lastName: "García",
			secondLastName: null,
			phone: null,
		});
	});
});
