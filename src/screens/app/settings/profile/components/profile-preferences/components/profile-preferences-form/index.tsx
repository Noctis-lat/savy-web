import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormSelect } from "@/components/design-system/patterns/forms/form-select";
import {
	CURRENCY_OPTIONS,
	LOCALE_OPTIONS,
	TIMEZONE_OPTIONS,
} from "@/content/onboarding/preferenceOptions";
import type { ProfilePreferencesFormValues } from "@/schemas/profile/profilePreferencesSchema";
import { withCurrentOption } from "@/utils/forms/withCurrentOption";
import { focusFirstField } from "@/utils/ui/focusFirstField";

export const ProfilePreferencesForm = (): React.ReactElement => {
	const profilePreferencesForm = useFormContext<ProfilePreferencesFormValues>();
	const { defaultValues } = profilePreferencesForm.formState;
	const fieldsRef = useRef<HTMLDivElement>(null);

	const currencyOptions = useMemo(
		() => withCurrentOption(CURRENCY_OPTIONS, defaultValues?.currency),
		[defaultValues?.currency],
	);
	const localeOptions = useMemo(
		() => withCurrentOption(LOCALE_OPTIONS, defaultValues?.locale),
		[defaultValues?.locale],
	);
	const timezoneOptions = useMemo(
		() => withCurrentOption(TIMEZONE_OPTIONS, defaultValues?.timezone),
		[defaultValues?.timezone],
	);

	useEffect(() => {
		focusFirstField(fieldsRef.current);
	}, []);

	return (
		<div
			ref={fieldsRef}
			className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
		>
			<FormSelect
				name="currency"
				form={profilePreferencesForm}
				label="Moneda"
				options={currencyOptions}
				required
			/>
			<FormSelect
				name="locale"
				form={profilePreferencesForm}
				label="Idioma y región"
				options={localeOptions}
				required
			/>
			<FormSelect
				name="timezone"
				form={profilePreferencesForm}
				label="Zona horaria"
				options={timezoneOptions}
				searchable
				searchPlaceholder="Buscar zona horaria..."
				required
			/>
		</div>
	);
};
