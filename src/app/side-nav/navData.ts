type navData = {
  routeLink: string;
  icon: string;
  label: string
}

export const navDataImport: navData[] = [
  {
    routeLink: "home",
    icon: "fal fa-home",
    label: "Inicio"
  },

  {
    routeLink: "carta",
    icon: "fa-solid fa-utensils",
    label: "Carta"
  },

  {
    routeLink: "pedido",
    icon: "fa-regular fa-bookmark",
    label: "Pedidos"
  },

  {
    routeLink: "cliente",
    icon: "fa-solid fa-user",
    label: "Cuenta"
  }

];