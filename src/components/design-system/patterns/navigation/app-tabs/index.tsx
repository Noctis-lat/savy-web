import type { LucideIcon } from "lucide-react";
import type React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { merge } from "@/utils/ui/mergeStyles";

type AppTabItem<TData> = {
	label: string;
	value: string;
	icon?: LucideIcon;
	content: (data: TData) => React.ReactNode;
};

type AppTabsConfig<TData> = AppTabItem<TData>[];

type AppTabsProps<TData> = {
	config: AppTabsConfig<TData>;
	data: TData;
	defaultValue?: string;
	/** Controlled active tab. Omit to let the tabs manage their own state. */
	value?: string;
	onValueChange?: (value: string) => void;
	/** Optional node rendered on the same row as the tab list, right-aligned. */
	action?: React.ReactNode;
	className?: string;
	tabListClassname?: string;
	variant?: "default" | "line";
};

export const AppTabs = <TData,>({
	config,
	data,
	defaultValue,
	value,
	onValueChange,
	action,
	className,
	tabListClassname,
	variant = "default",
}: AppTabsProps<TData>): React.ReactElement => {
	const tabsList = (
		<TabsList
			className={merge("", tabListClassname)}
			variant={variant}
		>
			{config.map((tab) => {
				const Icon = tab.icon;

				return (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className={merge(
							"",
							variant === "line" &&
								"text-sm text-gray-400 data-[state=active]:text-primary data-[state=active]:shadow-none pb-5 after:bg-primary!",
						)}
					>
						{Icon && <Icon />}

						<span>{tab.label}</span>
					</TabsTrigger>
				);
			})}
		</TabsList>
	);

	return (
		<Tabs
			defaultValue={defaultValue ?? config[0]?.value}
			value={value}
			onValueChange={onValueChange}
			className={className}
		>
			{action ? (
				<div className="flex items-center justify-between gap-4">
					{tabsList}
					{action}
				</div>
			) : (
				tabsList
			)}

			{config.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
				>
					{tab.content(data)}
				</TabsContent>
			))}
		</Tabs>
	);
};
