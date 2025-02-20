import 'cypress-real-events/support'

describe('Proveedor', () => {
  it('Listar proveedores', () => {
    //Ingresamos a la página e iniciamos sesión
    cy.visit('/')
    cy.contains('AC').click()
    cy.contains('Iniciar Sesión').click()
    cy.contains('AC').click()

    //Ingresamos los datos de inicio de sesión
    cy.get('[label=Email]').type('example@gmail.com')
    cy.get('[label=Contraseña]').type('123123')
    cy.contains('Iniciar Sesión').click()

    //Nos movemos a la página Pedido  =>  Nuevo Pedido
    cy.contains('AC').click()
    cy.contains('Pedido').click()
    cy.contains('Nuevo pedido').click()
    cy.contains('AC').click()

    //Ingresamos el nro de mesa y creamos el pedido
    cy.get('[data-cy=nroMesaInput]').type('7')
    //cy.contains('Crear Pedido').click()

    //Nos movemos a la página Carta de comida  =>  Carta de comidas para ver los platos disponibles
    cy.contains('AC').click()
    cy.contains('Carta de comida').click()
    cy.contains('Carta de comidas').click()
    cy.contains('AC').click()

    //Posicionamos el mouse sobre el plato que queremos agregar al pedido ("Hamburguesa") y presionamos el botón "Agregar al pedido"
    //NO FUNCIONA
    cy.contains('Hamburguesa').trigger('mouseover')
    cy.contains('Agregar al pedido').should('be.visible').click()
  })
})
