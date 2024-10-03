import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Barang } from '../../../model/barang.model';

@Injectable({
  providedIn: 'root'
})
export class BarangService {
  private apiUrl = '/api/barang';
  private username = 'admin';
  private password = 'adminpassword';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });
  }

  getAllBarang(): Observable<Barang[]> {
    return this.http.get<Barang[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getBarangById(id: string): Observable<Barang> {
    return this.http.get<Barang>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createBarang(barang: Barang): Observable<void> {
    return this.http.post<void>(this.apiUrl, barang, { headers: this.getHeaders() });
  }

  updateBarang(id: string, barang: Barang): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, barang, { headers: this.getHeaders() });
  }

  deleteBarang(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  searchBarang(keyword: string): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/search?keyword=${keyword}`, { headers: this.getHeaders() });
  }

  sortBarangByNama(): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/sort/nama`, { headers: this.getHeaders() });
  }

  sortBarangByTanggal(): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/sort/tanggal`, { headers: this.getHeaders() });
  }

  compareBarangByJenis(jenis_barang: string, ascending: boolean): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/compare/jenis?jenis_barang=${jenis_barang}&ascending=${ascending}`, { headers: this.getHeaders() });
  }

  filterBarangByDateRange(startDate: string, endDate: string): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/filter?startDate=${startDate}&endDate=${endDate}`, { headers: this.getHeaders() });
  }

  getBarangPaginated(page: number, size: number): Observable<Barang[]> {
    return this.http.get<Barang[]>(`${this.apiUrl}/datatable?page=${page}&size=${size}`, { headers: this.getHeaders() });
  }
}
