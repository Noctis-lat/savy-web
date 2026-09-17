import type React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const BankDetailSkeleton = (): React.ReactElement => (
	<div className="flex flex-1 flex-col gap-6 p-6">
		<div className="flex items-center justify-between">
			<Skeleton className="h-8 w-48" />
			<Skeleton className="h-9 w-24 rounded-md" />
		</div>

		<Skeleton className="h-32 w-full rounded-xl" />

		<div className="flex justify-end">
			<Skeleton className="h-9 w-40 rounded-md" />
		</div>
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<Skeleton className="h-64 rounded-xl" />
			<Skeleton className="h-64 rounded-xl" />
		</div>

		<Skeleton className="h-48 w-full rounded-xl" />

		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<Skeleton className="aspect-[16/10] rounded-xl" />
			<Skeleton className="aspect-[16/10] rounded-xl" />
			<Skeleton className="aspect-[16/10] rounded-xl" />
			<Skeleton className="aspect-[16/10] rounded-xl" />
		</div>
	</div>
);
