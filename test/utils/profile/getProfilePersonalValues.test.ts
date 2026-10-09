import { describe, expect, it } from "vitest";
import { getProfilePersonalValues } from "@/utils/profile/getProfilePersonalValues";
import { PROFILE_FIXTURE } from "./profileFixture";

describe("getProfilePersonalValues", () => {
	it("maps the personal fields of the profile", () => {
		expect(getProfilePersonalValues(PROFILE_FIXTURE)).toEqual({
			firstName: "Ana",
			lastName: "García",
			secondLastName: "",
			phone: "5551234567",
		});
	});

	it("maps null values to empty strings", () => {
		expect(
			getProfilePersonalValues({
				...PROFILE_FIXTURE,
				firstName: null,
				lastName: null,
				secondLastName: null,
				phone: null,
			}),
		).toEqual({ firstName: "", lastName: "", secondLastName: "", phone: "" });
	});

	it("normalizes a formatted phone to its last 10 digits", () => {
		expect(getProfilePersonalValues({ ...PROFILE_FIXTURE, phone: "+52 55 1234 5678" }).phone).toBe(
			"5512345678",
		);
	});
});
