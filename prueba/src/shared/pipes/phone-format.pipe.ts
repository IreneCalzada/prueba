import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'phoneFormat',
})
export class phoneFormatComponent implements PipeTransform {
    constructor() {
        /* No data */
    }


    transform(value: any) {
        if (!value) return "";
        let trim = value.toString().replace(/\D/g, '').substr(0, 10);
        let matched = trim.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        return !matched[2] ? matched[1] : '(' + matched[1] + ') ' + matched[2] + (matched[3] ? '-' + matched[3] : ''); // Format
    }
}
