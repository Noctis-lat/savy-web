import { Save } from "lucide-react";
import type React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/components/design-system/primitives/spinner";
import { Button } from "@/components/ui/button";
import { PROFILE_UPDATED_MESSAGE } from "@/content/profile/profileSections";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import type { ProfilePersonalFormValues } from "@/schemas/profile/profilePersonalSchema";
import { buildProfilePersonalPayload } from "@/utils/profile/buildProfilePersonalPayload";

type ProfilePersonalActionsProps = {
	onSuccess: () => void;
	onCancel: () => void;
};

export const ProfilePersonalActions = ({
	onSuccess,
	onCancel,
}: ProfilePersonalActionsProps): React.ReactElement => {
	const profilePersonalForm = useFormContext<ProfilePersonalFormValues>();
	const { handleSubmit, formState } = profilePersonalForm;
	// Read both flags up front: the formState proxy only subscribes to fields that are accessed,
	// and a short-circuited `||` would skip `isDirty` while the form is invalid.
	const { isValid, isDirty } = formState;
	const { mutate: updateProfile, isPending } = useUpdateProfile();

	const onSubmit = (values: ProfilePersonalFormValues): void => {
		updateProfile(buildProfilePersonalPayload(values), {
			onSuccess: () => {
				toast.success(PROFILE_UPDATED_MESSAGE);
				onSuccess();
			},
		});
	};

	return (
		<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
			<Button
				type="button"
				variant="ghost"
				className="h-10"
				onClick={onCancel}
				disabled={isPending}
			>
				Cancelar
			</Button>
			<Button
				type="submit"
				className="h-10"
				onClick={handleSubmit(onSubmit)}
				disabled={!isValid || !isDirty || isPending}
			>
				{isPending ? <Spinner size={16} /> : <Save />}
				Guardar
			</Button>
		</div>
	);
};
