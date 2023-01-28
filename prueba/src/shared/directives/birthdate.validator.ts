import type { AbstractControl } from '@angular/forms'
import * as moment from 'moment'

export const ValidateBirthDate = (control: AbstractControl): any => {
  const birthDate = control.value
  const status = { birthDateValid: false }

  if (birthDate) {
    const now = moment(new Date())
    const duration = moment.duration(now.diff(birthDate))
    const years = duration.asYears()
    if (Math.round(years) >= 18 && Math.round(years) < 150) {
      status.birthDateValid = false
    }else {
      status.birthDateValid = true
      return status
    }
  }
  status.birthDateValid = true
}
