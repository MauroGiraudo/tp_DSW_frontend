export type navData = {
  routeLink: string;
  icon: string;
  label: string;
  tipoUsuario: string[];
  logueado?: string;
}

//La idea es que, cada vez que se incorpore una nueva funcionalidad, de ser necesario, 
//se asignará el tipo de usuario que tiene permitido ejecutarla.
//Si cualquier usuario, incluso sin loguearse, puede utilizar la funcionalidad,
//se asignará el tipo de usuario como ['']

export const navDataImport: navData[] = [
  {
    routeLink: "home",
    icon: "fal fa-home",
    label: "Inicio",
    tipoUsuario: ['']
  },

  {
    routeLink: "carta",
    icon: "fa-solid fa-utensils",
    label: "Carta",
    tipoUsuario: ['']
  },

  {
    routeLink: "pedido",
    icon: "fa-regular fa-bookmark",
    label: "Pedidos",
    tipoUsuario: ['cliente'] 
    //Por ahora queda de esta manera, pero la idea es crear una funcionalidad de pedido 
    //distinta para cada tipo de usuario
  },

  {
    routeLink: "proveedor",
    icon: "fa-solid fa-truck-field",
    label: "Proveedores",
    tipoUsuario: ['empleado']
  },



  {
    routeLink: "cliente",
    icon: "fa-solid fa-user",
    label: "Cuenta",
    tipoUsuario: ['empleado', 'cliente'],
    logueado: 'true'
  },

  {
    routeLink: "login",
    icon: "fa-solid fa-arrow-right-to-bracket",
    label: "Iniciar Sesión",
    tipoUsuario: [''],
    logueado: 'false'
  }

];