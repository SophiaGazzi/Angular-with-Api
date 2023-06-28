import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import Curso from './curso';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url:string = 'http://localhost/api/php/';
  vetor: Curso[] = [];

  constructor( private http: HttpClient) {  }

  //Obter todos os cursos
  obterCursos(): Observable<Curso[]> {
    return this.http.get(this.url+"listar").pipe(
      map((res: any) => {
        this.vetor = res['cursos'];
        return this.vetor;
      })
    );
  }

  //Cadastrar Curso
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post(this.url+"cadastrar",{cursos:c}).pipe(map((res:any) => {
      this.vetor.push(res['cursos']);
      return this.vetor;
    }))
  }

  //Excluir
  excluirCurso(c: Curso): Observable<Curso[]> {
    const params = new HttpParams().set('idCurso', c.idCurso.toString());

    return this.http.delete(this.url+"excluir", {params:params}).pipe(map((res) => {
      const filtro = this.vetor.filter((curso) => {
        return +curso['idCurso'] !== curso.idCurso;
      })
      return this.vetor = filtro;
    }))
  }

  //Atualizar curso
  atualizarCurso(c: Curso): Observable<Curso[]> {
    return this.http.put(this.url + "alterar", {curso: c}).pipe(
      map((res) => {
        const cursoAlterado = this.vetor.find((item) => {
          return +item['idCurso'] === +['idCurso'];
        })

        if(cursoAlterado) {
          cursoAlterado['nomeCurso'] = c['nomeCurso'];
          cursoAlterado['valorCurso'] = c['valorCurso'];
        }
        return this.vetor;
      })
    )
  }


}
