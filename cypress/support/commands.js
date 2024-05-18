Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Edson')
    cy.get('#lastName').type('Pita')
    cy.get('#email').type('pita.test@test.com')
    cy.get('#open-text-area').type('teste')
     cy.contains('button', 'Enviar').click()
})