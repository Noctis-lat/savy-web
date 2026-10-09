import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type React from "react";

type CrossFadeProps = {
	/** Changing the key fades the current content out and the new content in. */
	activeKey: string;
	children: React.ReactNode;
	className?: string;
};

export const CrossFade = ({
	activeKey,
	children,
	className,
}: CrossFadeProps): React.ReactElement => {
	const prefersReducedMotion = useReducedMotion();

	return (
		<AnimatePresence
			mode="wait"
			initial={false}
		>
			<motion.div
				key={activeKey}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={
					prefersReducedMotion ? { duration: 0 } : { duration: 0.15, ease: "easeOut" as const }
				}
				className={className}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};
