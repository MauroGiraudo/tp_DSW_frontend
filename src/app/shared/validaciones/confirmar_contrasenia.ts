import { AbstractControl } from "@angular/forms"

export const validarContrasenias = (nombreContrasenia: string, nombreConfirmarContrasenia: string) => {
  const validar = (form: AbstractControl) => {
    const contrasenia = form.get(nombreContrasenia)
    const confirmarContrasenia = form.get(nombreConfirmarContrasenia)

    if(!contrasenia || !confirmarContrasenia) return
    if(contrasenia.value !== confirmarContrasenia.value) {
      confirmarContrasenia.setErrors({ noCoincide: true })
    } else {
      const errors = confirmarContrasenia.errors
      if(!errors) return

      delete errors['noCoincide']
      confirmarContrasenia.setErrors(errors)
    }
  }
  return validar
}