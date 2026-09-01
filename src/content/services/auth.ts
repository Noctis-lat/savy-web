export const authKeys = {
	auth: () => ["auth"] as const,
	me: () => [...authKeys.auth(), "me"] as const,
};
