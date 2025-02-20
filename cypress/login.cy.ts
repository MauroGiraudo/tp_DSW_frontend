import { HttpClientModule } from "@angular/common/http"
import { LoginComponent } from "../src/app/login/login.component"
import { RouterTestingModule } from "@angular/router/testing"
import { ActivatedRoute, RouterModule } from "@angular/router"
import { of } from 'rxjs'

describe('login.cy.ts', () => {
  it('Inicia sesión con un usuario de ejemplo y regresa a /home', () => {

    cy.mount(LoginComponent, {
      imports: [HttpClientModule, RouterModule.forRoot([])],
      providers: [
        {provide: ActivatedRoute,
        useValue: {
          params: of({}),
          queryParams: of({}),
          snapshot: {
            paramMap: {
              get: () => null,
            }
          }
        }}
      ]
    })

    cy.get('[label=Email]').type('example@gmail.com')
    cy.get('[label=Contraseña]').type('123123')
    cy.contains('Iniciar Sesión').click()

  })
})
