/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {

        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Digitando em campos e clicando em elementos - exercício extra 1, Digitando em campos e clicando em elementos - exercício extra 1'
        cy.get('#firstName').type('Edson')
        cy.get('#lastName').type('Pita')
        cy.get('#email').type('pita.test@test.com'),
            cy.get('#open-text-area').type(longText, {
                delay: 0
            })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Edson')
        cy.get('#lastName').type('Pita')
        cy.get('#email').type('pita.test.test.com')
        cy.get('#open-text-area').type('testando')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Validar compo telefone continua vazio ao digitar valor não-numérico ', function () {
        cy.get('#phone')
            .type('abcdefghijlkmnopq')
            .should('have.value', '')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Edson')
        cy.get('#lastName').type('Pita')
        cy.get('#email').type('pita.test@est.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('testando')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Edson')
            .should('have.value', 'Edson')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Pita')
            .should('have.value', 'Pita')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('pita.test@est.com')
            .should('have.value', 'pita.test@est.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', {
                action: 'drag-drop'
            })
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('testFile')
        cy.get('#file-upload')
            .selectFile('@testFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })

    })
    it('seleciona multiplos arquivos da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile([
                'cypress/fixtures/example.json',
                'cypress/fixtures/file.txt'
            ])
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
                expect(input[0].files[1].name).to.equal('file.txt')
            })
    });
})