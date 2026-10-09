import { describe, expect, it } from "vitest";
import { buildProfilePreferencesPayload } from "@/utils/profile/buildProfilePreferencesPayload";

describe("buildProfilePreferencesPayload", () => {
	it("sends only the preference fields", () => {
		expect(
			buildProfilePreferencesPayload({
				currency: "USD",
				locale: "en-US",
				timezone: "America/New_York",
			}),
		).toEqual({ currency: "USD", locale: "en-US", timezone: "America/New_York" });
	});
});
