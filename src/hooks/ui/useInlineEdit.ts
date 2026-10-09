import { type RefObject, useCallback, useEffect, useRef, useState } from "react";

type StopEditingOptions = {
	/** Return focus to the edit trigger (default true). Use false when focus is moving elsewhere on purpose. */
	restoreFocus?: boolean;
};

type UseInlineEditReturn<TKey extends string> = {
	editingKey: TKey | undefined;
	editButtonRef: RefObject<HTMLButtonElement | null>;
	startEditing: (key: TKey) => void;
	stopEditing: (options?: StopEditingOptions) => void;
};

/**
 * Tracks which inline-editable section is in edit mode.
 * Returns focus to the edit trigger when leaving edit mode, once it is rendered again.
 */
export const useInlineEdit = <TKey extends string>(): UseInlineEditReturn<TKey> => {
	const [editingKey, setEditingKey] = useState<TKey | undefined>(undefined);
	const editButtonRef = useRef<HTMLButtonElement>(null);
	const shouldRestoreFocusRef = useRef<boolean>(false);

	useEffect(() => {
		if (editingKey !== undefined || !shouldRestoreFocusRef.current) return;

		shouldRestoreFocusRef.current = false;
		editButtonRef.current?.focus();
	}, [editingKey]);

	const startEditing = useCallback((key: TKey): void => {
		setEditingKey(key);
	}, []);

	const stopEditing = useCallback((options?: StopEditingOptions): void => {
		shouldRestoreFocusRef.current = options?.restoreFocus ?? true;
		setEditingKey(undefined);
	}, []);

	return { editingKey, editButtonRef, startEditing, stopEditing };
};
