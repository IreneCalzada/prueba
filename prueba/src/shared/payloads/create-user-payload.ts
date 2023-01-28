import type { FormGroup } from '@angular/forms'
import { IUsersPayload } from './users-payload'

export class CreateUserPayload {
  private pCreateUserForm: FormGroup

  constructor(createUsrForm: FormGroup) {
    this.pCreateUserForm = createUsrForm
  }

  private get pCreateUserValue(): IUsersPayload {
    return this.pCreateUserForm.value
  }

  toJSONObject(): IUsersPayload {
    const data: IUsersPayload = {
      fullName: this.pCreateUserValue.fullName,
      birthDate: this.pCreateUserValue.birthDate,
      email: this.pCreateUserValue.email?.toLocaleLowerCase(),
      extension: this.pCreateUserValue.extension,
      phone: this.pCreateUserValue.phone,
      signature: this.pCreateUserValue.signature
    }

    return data
  }
}