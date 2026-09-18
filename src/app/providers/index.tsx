import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { AppToaster } from "@/components/design-system/patterns/feedback/app-toaster";
import { DevTools } from "@/components/design-system/patterns/layouts/dev-tools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persister } from "@/services/persister";
import { queryClient } from "@/services/query-client";

type ProvidersProps = {
	children: React.ReactNode;
};

function App({ children }: ProvidersProps): React.ReactElement {
	const isProduction = import.meta.env.VITE_SCOPE === "production";
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			enableSystem
			disableTransitionOnChange
		>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister, maxAge: 30 * 60 * 1000 }}
			>
				<TooltipProvider delayDuration={100}>
					{children}
					<AppToaster />
				</TooltipProvider>
				{!isProduction && <DevTools />}
			</PersistQueryClientProvider>
		</ThemeProvider>
	);
}

export { App };
