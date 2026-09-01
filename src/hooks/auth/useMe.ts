import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { useAuthStorage } from "@/storage/authStorage";

export const useMe = () => {
	const isAuthenticated = useAuthStorage((state) => state.isAuthenticated);

	return useQuery({
		queryKey: ["auth", "me"],
		queryFn: () => authService.getMe(),
		enabled: isAuthenticated,
		staleTime: 1000 * 60 * 15,
		gcTime: 1000 * 60 * 20,
	});
};
