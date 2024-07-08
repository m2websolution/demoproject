import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Function: HAndles validation for avoiding html tags
 * @returns validation
 */
export function noHtmlTagsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (value && /<[^>]*>/g.test(value)) {
      return { noHtmlTags: true };
    }
    return null;
  };
}
