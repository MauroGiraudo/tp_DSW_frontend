export type navData = {
  routeLink: string;
  icon?: string;
  label: string;
  expanded?:boolean;
  tipoUsuario: string[];
  items?: navData[];
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
    routeLink: "cartaComida",
    icon: "fa-solid fa-utensils",
    label: "Carta de comidas",
    tipoUsuario: ['']
  },

  {
  routeLink: "cartaBebida",
  icon: "fa-solid fa-beer",
  label: "Carta de bebidas",
  tipoUsuario: [''],
  items: [
    {
      routeLink: "cartaBebida/Lista",
      label: "Carta de bebidas",
      tipoUsuario: [''],
    },
    {
      routeLink: "cartaBebida/Crear",
      label: "Agregar bebida",
      tipoUsuario: ['empleado'],  
    },
    {
      routeLink: "cartaBebida/Modificar",
      label: "Modificar bebida",
      tipoUsuario: ['empleado'],
    },
    {
      routeLink: "cartaBebida/Eliminar",
      label: "Eliminar bebida",
      tipoUsuario: ['empleado'],
    }
  ]
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
    tipoUsuario: ['empleado'],
    items: [
      {
        routeLink: "proveedor/Lista",
        label: "Lista de proveedores",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "proveedor/Crear",
        label: "Agregar proveedor",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "proveedor/Modificar",
        label: "Modificar proveedor",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "proveedor/Eliminar",
        label: "Eliminar proveedor",
        tipoUsuario: ['empleado'],
      }
    ]
  },


    {
    routeLink: "mesa",
    icon: "fa-solid fa-chair",
    label: "Mesa",
    tipoUsuario: ['empleado'],
    logueado: 'true',
     items: [
      {
        routeLink: "mesa/Lista",
        label: "Lista de mesas",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "mesa/Crear",
        label: "Agregar mesa",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "mesa/Modificar",
        label: "Modificar mesa",
        tipoUsuario: ['empleado'],
      },
      {
        routeLink: "mesa/Eliminar",
        label: "Eliminar mesa",
        tipoUsuario: ['empleado'],
      }
    ]
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