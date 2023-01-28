import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environment/environment';
import { catchError, map, retry } from "rxjs/operators";
import { Users } from 'src/shared/models/users';
import { IUsersResponse } from 'src/shared/declarations/users-response';
import { IUsersPayload } from 'src/shared/payloads/users-payload';
import { IUsersListResponse } from 'src/shared/declarations/usersList-response';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUsersResponse> {
    return this.httpClient
      .get(`${environment.API}/usuarios`)
      .pipe(map(response => response as IUsersResponse))
  }

  createUser(payload: IUsersPayload): Observable<IUsersListResponse> {
    return this.httpClient
      .post(`${environment.API}/usuarios`, payload)
      .pipe(map((response: any) => response))
  }

  updateUser(id: string, payload: IUsersPayload) {
    return this.httpClient.patch(
      `${environment.API}/usuarios/${id}`, payload);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${environment.API}/usuarios/${id}`);
  }

}