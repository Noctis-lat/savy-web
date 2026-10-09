import { describe, expect, it } from "vitest";
import { getProfilePreferencesValues } from "@/utils/profile/getProfilePreferencesValues";
import { PROFILE_FIXTURE } from "./profileFixture";

describe("getProfilePreferencesValues", () => {
	it("maps only the preference fields of the profile", () => {
		expect(getProfilePreferencesValues(PROFILE_FIXTURE)).toEqual({
			currency: "MXN",
			locale: "es-MX",
			timezone: "America/Mexico_City",
		});
	});
});
