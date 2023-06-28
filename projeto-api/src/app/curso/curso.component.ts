import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Curso from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

 vetor: Curso[] = [];
 curso = new Curso();
  
  constructor(private cursoService: CursoService) {}

  ngOnInit() {
    this.selecao();
   }

  //Cadastro
  public cadastro() {
    this.cursoService.cadastrarCurso(this.curso).subscribe((res: Curso[]) => {
      this.vetor = res;

      //Limpar os atributos
      this.curso.nomeCurso = "";
      this.curso.valorCurso = 0;
    })

  }

  //Seleção
  public selecao() {
    this.cursoService.obterCursos().subscribe(
      (res:Curso[]) => {
        this.vetor = res;
      }
    )
  }

  //Alterar
  public alterar() {
    this.cursoService.atualizarCurso(this.curso).subscribe((res) => {
      this.vetor = res;

      this.curso.nomeCurso = "";
      this.curso.valorCurso = 0;

      this.selecao();
    })
  }

  //Excluir
  public excluir() {
    this.cursoService.excluirCurso(this.curso).subscribe(
      (res: Curso[]) => {
        this.vetor = res;
        this.curso.nomeCurso = "";
        this.curso.valorCurso = 0;

      }
    )
  }

  //Selecionar
  selecionarCurso(v: Curso[]) {
    this.curso = v.idCurso;
    this.curso = v.nomeCurso;
    this.curso = v.valorCurso;
  }

}
