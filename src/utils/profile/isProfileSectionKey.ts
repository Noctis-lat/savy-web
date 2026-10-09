import { PROFILE_SECTIONS } from "@/content/profile/profileSections";

/** Narrows a tab value coming from the tabs primitive to a known profile section. */
export const isProfileSectionKey = (value: string): value is ProfileSectionKey =>
	value in PROFILE_SECTIONS;
