describe('Note App', () => {
  let user;

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    user = {
      username: 'javloptest',
      name: 'Javier',
      password: 'testing1234'
    };

    cy.request('POST', 'http://localhost:3001/api/users/', user);
  });

  it('frontpage can be opened', () => {
    cy.contains('Notes');
  });

  it('user can login', () => {
    cy.contains('Show Login').click();
    cy.get('[name="Username"]').first().type(user.username);
    cy.get('[name="Password"]').last().type(user.password);
    cy.get('#form-login-button').click();

    cy.contains('New note');
  });

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click();
    cy.get('[name="Username"]').first().type('wronguser');
    cy.get('[name="Password"]').last().type('wrongpassword');
    cy.get('#form-login-button').click();

    cy.get('.error').should('contain', 'Wrong credentials');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ ...user })
    });

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress';
      cy.contains('New note').click();
      cy.get('input').type(noteContent);
      cy.contains('Add note').click();
      cy.contains(noteContent);
    });

    describe('and a note exist', () => {
      const note1 = {
        content: 'This is the first note',
        important: false
      };

      const note2 = {
        content: 'This is the second note',
        important: false
      }

      const note3 = {
        content: 'This is the third note',
        important: false
      }
    
      beforeEach(() => {
        cy.createNote(note1);
        cy.createNote(note2);
        cy.createNote(note3);
      });

      it('can be made important', () => {
        cy.contains(note2.content).as('theNote')
        
        cy.get('@theNote')
          .contains('Mark as important')
          .click();

        // cy.debug()

        cy.get('@theNote')
          .contains('Mark as not important');
      });
    })
  });
});

