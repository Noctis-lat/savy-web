import type React from "react";
import { useEffect, useRef } from "react";
import type { DayButton } from "react-day-picker";
import { getDefaultClassNames } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { merge } from "@/utils/ui/mergeStyles";

export const RangeDayButton = ({
	className,
	day,
	modifiers,
	...props
}: React.ComponentProps<typeof DayButton>): React.ReactElement => {
	const defaultClassNames = getDefaultClassNames();
	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={merge(
				"relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 leading-none font-normal",
				// range start — solid primary, rounded left only
				"data-[range-start=true]:bg-primary data-[range-start=true]:text-white data-[range-start=true]:rounded-l-lg data-[range-start=true]:rounded-r-none data-[range-start=true]:hover:bg-primary/80",
				// range end — solid primary, rounded right only
				"data-[range-end=true]:bg-primary data-[range-end=true]:text-white data-[range-end=true]:rounded-r-lg data-[range-end=true]:rounded-l-none data-[range-end=true]:hover:bg-primary/80",
				// range middle — soft primary tint, no rounding
				"data-[range-middle=true]:bg-primary/10 data-[range-middle=true]:text-primary data-[range-middle=true]:rounded-none data-[range-middle=true]:hover:bg-primary/15",
				// selected single — full pill
				"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white data-[selected-single=true]:rounded-lg data-[selected-single=true]:hover:bg-primary/80",
				"[&>span]:text-xs [&>span]:opacity-70",
				defaultClassNames.day,
				className,
			)}
			{...props}
		/>
	);
};
