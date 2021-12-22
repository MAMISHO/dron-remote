import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesURI = '/devices';

  constructor(private http: HttpClient) { }

  public create(device: Device): Observable<Device> {
    return this.http.post<Device>(this.devicesURI, device).pipe(
      catchError(this.error)
    )
  }

  public edit(device: Device): Observable<Device> {
    return this.http.put<Device>(this.devicesURI, device).pipe(
      catchError(this.error)
    );
  }

  public delete(device: Device): Observable<Device> {
    return this.http.delete<Device>(`${this.devicesURI}/${device.uuid}`);
  }

  public findAll(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesURI).pipe(
      catchError(this.error)
    )
  }

  private error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
