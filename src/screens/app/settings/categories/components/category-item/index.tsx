import type React from "react";
import { GlassCard } from "@/components/design-system/patterns/glass-card";

type CategoryItemProps = {
	category: Category;
};

export const CategoryItem = ({ category }: CategoryItemProps): React.ReactElement => {
	return <GlassCard></GlassCard>;
};
