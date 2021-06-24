import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public githubList: any[] = [];
  // Iniciamos el form
  public gitFormGroup: FormGroup
  // loading
  public loading: any = false;
  // alert
  public alert: any = false;

  constructor(
    private fb: FormBuilder,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    // validamos el form
    this.gitFormGroup = this.fb.group( {
      busqueda: ['', [
        Validators.required
      ]]
    });
  }

  submitForm(){
    this.loading = true;
    // Importamos la función "getConsultaAPI" del servicio "githubService" y le pasamos el valor del campo
    const gitSearch = this.gitFormGroup.controls['busqueda'].value;
    this.githubService.getConsultaAPI(gitSearch).subscribe(
      (data: any) => {
        // Le pasamos los valores que devuelve el json a la variable pública "githubList" y así la llevamos al html del componente
        this.loading = false;
        this.githubList = data.items;
        if(data.total_count === 0) { // La api devuelve total_count: 0 cuando no hay resultados de búsqueda
          this.alert = true;
        } else {
          this.alert = false;
        }
      }
    ),
    (error: any) => {
      console.log('Error en la conexión....');
    }
  }

}
