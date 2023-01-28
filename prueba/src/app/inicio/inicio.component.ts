import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/services/usuarios.service';
import { CreateUserPayload } from 'src/shared/payloads/create-user-payload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SignaturePad from 'signature_pad';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ValidateBirthDate } from 'src/shared/directives/birthdate.validator';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  sig!: SignaturePad;
  image: string | undefined;
  withContent: boolean = false;
  users: any;
  displayStyle = "none";
  displayStyleDeleteUser = "none";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  idUser!: string;
  create: boolean = false
  createUserForm: FormGroup = this.fb.group(
    {
      fullName: ['', Validators.required],
      birthDate: [new Date(), Validators.compose([Validators.required, ValidateBirthDate])],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', Validators.required],
      signature: [null, Validators.required]
    }
  )

  constructor(private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private toastrService: ToastrService) {
    moment.locale("es");
  }

  get correo() {
    return this.createUserForm.get('email')
  }

  get nombreCompleto() {
    return this.createUserForm.get('fullName')
  }

  get diaNacimiento() {
    return this.createUserForm.get('birthDate')
  }

  get telefono() {
    return this.createUserForm.get('phone')
  }

  ngOnInit(): void {
    this.getUsers();
    this.sig = new SignaturePad(this.canvas?.nativeElement, {
      penColor: 'black',
    });
  }

  getUsers(): void {
    const handleSuccess = (response: any) => {
      this.users = response
    };

    const handleError = (error: any) => {
      this.showError(error.message)
    };

    this.usuariosService.getUsers().subscribe(handleSuccess, handleError);
  }

  async createUser(): Promise<void> {
    this.createUserForm.patchValue({
      phone: (this.createUserForm.value.phone.replace(")", "").replace("(", "")).replace(/\s+/g, '')
    });
    this.saveSignature()
    const payload = new CreateUserPayload(this.createUserForm).toJSONObject()

    this.usuariosService.createUser(payload).subscribe(
      (response: any) => {
        if (response) {
          this.closePopup()
          this.resetform()
          this.getUsers()
          this.clear()
          this.showSuccess('Usuario creado correctamente')
        }
      },
      error => {
        this.showError(error.message)
      }
    )
  }

  async deleteUser(): Promise<void> {
    const deleteUserInfo = (): void => {
      this.closePopup()
      this.closeDeletePopup()
      this.resetform()
      this.getUsers()
      this.clear()
      this.showSuccess('Usuario eliminado correctamente')
    };

    const handleError = (response: any): void => {
      this.showError(response.message)
    };

    this.usuariosService.deleteUser(this.idUser).subscribe(deleteUserInfo, handleError);
  }

  async updateUser(editUserForm: FormGroup): Promise<void> {
    editUserForm.patchValue({
      phone: ((editUserForm.value.phone.toString()).replace(")", "").replace("(", "")).replace(/\s+/g, ''),
    });
    const payload = new CreateUserPayload(editUserForm);

    const updateUserInfo = (): void => {
      this.closePopup()
      this.resetform()
      this.getUsers()
      this.clear()
      this.showSuccess('Usuario actualizado correctamente')
    };

    const handleError = (response: any): void => {
      this.showError(response.message)
    };

    this.usuariosService
      .updateUser(this.idUser, payload.toJSONObject())
      .subscribe(updateUserInfo, handleError);
  }

  clear(): void {
    this.sig.clear();
    this.image = undefined
    this.createUserForm.patchValue({
      signature: '',
    });
  }

  resetform(): void {
    this.createUserForm.reset()
  }

  openPopup(item: any): void {
    if (item) {
      this.idUser = item._id
      this.withContent = true
      this.image = item?.signature
      this.createUserForm.patchValue({
        fullName: item.fullName,
        birthDate: moment.utc(item.birthDate).format("YYYY[-]MM[-]DD"),
        email: item.email,
        phone: item.phone,
        signature: item.signature
      })
      this.create = true
    }
    else {
      this.resetform()
      this.clear()
      this.withContent = false
      this.idUser = ''
      this.create = false
    }
    this.displayStyle = "block";
  }

  closePopup(): void {
    this.displayStyle = "none";
    this.resetform()
    this.getUsers()
    this.clear()
  }

  openDeletePopup(): void {
    this.displayStyleDeleteUser = "block";
  }

  closeDeletePopup(): void {
    this.displayStyleDeleteUser = "none";
  }

  showSuccess(item: string): void {
    this.toastrService.success(item);
  }

  showInfo(item: string): void {
    this.toastrService.info(item);
  }

  showWarning(item: string): void {
    this.toastrService.warning(item);
  }

  showError(item: string): void {
    this.toastrService.error(item);
  }

  saveSignature(): void {
    this.createUserForm.patchValue({
      signature: this.image || this.sig.toDataURL('image/svg+xml')
    });
  }
}
