import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][appPhoneMask]',
})
export class PhoneMaskDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: any): void {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event: any): void {
        this.onInputChange(event?.target?.value, true);
    }

    onInputChange(event: any, backspace: boolean) {
        if (event == null) {
            return 
        }

        let newVal = (event.toString()).replace(/\D/g, '');
        if (backspace && newVal?.length <= 6) {
            newVal = newVal?.substring(0, newVal?.length - 1);
        }
        if (newVal?.length === 0) {
            newVal = '';
        } else if (newVal?.length <= 3) {
            newVal = newVal?.replace(/^(\d{0,3})/, '($1)');
        } else if (newVal?.length <= 6) {
            newVal = newVal?.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (newVal?.length <= 10) {
            newVal = newVal?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2 $3');
        } else {
            newVal = newVal?.substring(0, 10);
            newVal = newVal?.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2 $3');
        }
        if (newVal === "") {
            this.ngControl?.control?.setValue(null);
        } else {
            this.ngControl?.valueAccessor?.writeValue(newVal);
        }
    }
}
