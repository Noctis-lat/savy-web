import type { LucideIcon } from "lucide-react";
import type React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { merge } from "@/utils/ui/mergeStyles";

type AppNavigationTabItem = {
	label: string;
	value: string;
	icon?: LucideIcon;
};

type AppNavigationTabsProps = {
	config: readonly AppNavigationTabItem[];
	defaultValue?: string;
	className?: string;
	tabListClassname?: string;
	variant?: "default" | "line";
};

export const AppNavigationTabs = ({
	config,
	defaultValue,
	className,
	tabListClassname,
	variant = "default",
}: AppNavigationTabsProps): React.ReactElement => {
	const navigate = useNavigate();
	const location = useLocation();

	const activeValue =
		config.find((tab) => location.pathname === tab.value)?.value ??
		defaultValue ??
		config[0]?.value ??
		"";

	const handleTabChange = (value: string): void => {
		navigate(value);
	};

	return (
		<Tabs
			value={activeValue}
			onValueChange={handleTabChange}
			className={className}
		>
			<TabsList
				className={merge("bg-gray-100", tabListClassname)}
				variant={variant}
			>
				{config.map((tab) => {
					const Icon = tab.icon;

					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className={merge(
								"data-[state=active]:text-emerald-700",
								variant === "line" &&
									"text-sm text-gray-400 data-[state=active]:shadow-none pb-5 after:bg-emerald-600!",
							)}
						>
							{Icon && <Icon />}

							<span>{tab.label}</span>
						</TabsTrigger>
					);
				})}
			</TabsList>

			<Outlet />
		</Tabs>
	);
};
