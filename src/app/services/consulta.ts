
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Consulta {
  id?: number;
  data: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private readonly apiUrl = 'http://localhost:8080/consultas';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  salvar(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  atualizar(id: number, consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
