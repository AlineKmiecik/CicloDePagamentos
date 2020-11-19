import { BillingCycle } from "./../models/BillingCycle";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CycleService {

  baseURL = 'http://localhost:1234';
  
  constructor(private http: HttpClient) {}

  list(): Observable<BillingCycle[]> {
    return this.http.get<BillingCycle[]>(this.baseURL);
  }
  create(cycle: BillingCycle): Observable<BillingCycle>{
    return this.http.post<BillingCycle>(this.baseURL, cycle);
  }
  getById(id: string): Observable<BillingCycle>{
    return this.http.get<BillingCycle>(`${this.baseURL}/${id}`);
  }
  update(cycle: BillingCycle): Observable<BillingCycle>{
    return this.http.put<BillingCycle>(this.baseURL, cycle);
  }
  delete(id: string): Observable<BillingCycle[]>{
    return this.http.delete<BillingCycle[]>(`${this.baseURL}/${id}`);
  }
  getByMonthYear(year: number, month: number): Observable<BillingCycle>{
    return this.http.get<BillingCycle>(`${this.baseURL}/${year}/${month}`);
  }
}
