describe('dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('base_url')}/api/v1/products/get`, {
      statusCode: 200,
      fixture: 'mock_products'
    }).as('products');
    cy.intercept('GET', `${Cypress.env('base_url')}/api/v1/notes/get`, {
      statusCode: 200,
      fixture: 'mock_notes'
    }).as('notes');
    cy.intercept('GET', `${Cypress.env('dashboard_url')}/_next/static/development/_devMiddlewareManifest.json`, {
      statusCode: 200
    });
    cy.visit(`${Cypress.env('dashboard_url')}`);
  });
  it('should show a header, carousel, notes, and products', () => {
    cy.wait('@products');
    cy.get('header').should('exist')
      .get('h1').should('contain', 'Thrifty Pet')
      .get('.mantine-visible-from-sm').should('exist')
      .get('form').within(() => {
        cy.get('label').should('have.attr', 'for', 'chewy-link')
          .get('label').should('contain', 'Enter a Chewy product link and check back periodically to see its price ranges')
          .get('input').should('have.attr', 'id', 'chewy-link')
          .get('input').should('have.attr', 'placeholder', 'Enter Chewy Link Here')
      })
      .get('.mantine-Carousel-container').within(() => {
        cy.get('.mantine-Carousel-slide').first().should('contain', 'Get the Best Prices for Your Fur Babies')
          .get('.mantine-Carousel-slide').last().should('contain', 'Get the Best Prices for Your Fur Babies')
          .get('img').first().should('have.attr', 'alt', 'dog-and-cat')
          .get('img').last().should('have.attr', 'alt', 'dry-pet-food')
      })
      .get('.m-45252eee').within(() => {
        cy.get('button').first().should('contain', 'Add Notes')
          .get('button').last().should('contain', 'snacks with rabbit')
      })
      .get('.m-8983817 > .m-7485cace').within(() => {
        cy.get('.mantine-Card-root').first().should('contain', 'Weruva Mack & Jack with Mackerel & Grilled Skipjack')
          .get('.mantine-Card-root').last().should('contain', 'Revolution Plus Topical Solution for Cats')
      })
  });
  it('should be able to post a product', () => {
    cy.intercept('POST', `${Cypress.env('base_url')}/api/v1/products/create`, {
      statusCode: 201,
      body: {
        product: {
          "_id": "65ae0e128f2c18264d58709c",
          "url": "https://www.chewy.com/dr-elseys-ultra-unscented-clumping/dp/28977",
          "image": "https://image.chewy.com/is/image/catalog/301489_MAIN._AC_SL600_V1701452145_.jpg",
          "title": "Dr. Elsey's Ultra Unscented Clumping Clay Cat Litter",
          "currentPrice": 12.98,
          "originalPrice": 15.99,
          "miscInfo": [
            "Scent: Unscented",
            "Size: 20-lb bag"
          ],
          "priceHistory": [
            {
              "price": 12.98,
              "date": "2024-01-22T06:41:22.233Z",
              "_id": "65ae0e128f2c18264d58709d"
            }
          ],
          "lowestPrice": 12.98,
          "highestPrice": 12.98,
          "averagePrice": 0,
          "createdAt": "2024-01-22T06:41:22.500Z",
          "updatedAt": "2024-01-22T06:41:22.500Z"
        }
      }
    }).as('product');
    cy.get('#chewy-link').type('https://www.chewy.com/dr-elseys-ultra-unscented-clumping/dp/28977')
    cy.get('.m-82577fc2 > .mantine-focus-auto').click()
    cy.wait('@product')
    cy.get('.m-7485cace > .m-8bffd616').last().should('contain', 'Dr. Elsey\'s Ultra Unscented Clumping Clay Cat Litter')
  });
})