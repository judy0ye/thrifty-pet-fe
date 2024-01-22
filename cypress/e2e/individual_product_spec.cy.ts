describe('individual product', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('dashboard_url')}/_next/static/development/_devMiddlewareManifest.json`, {
      statusCode: 200
    });
    cy.intercept('GET', `${Cypress.env('base_url')}/api/v1/products/get`, {
      statusCode: 200,
      fixture: 'mock_products'
    }).as('products');
    cy.intercept('GET', `${Cypress.env('base_url')}/api/v1/notes/get`, {
      statusCode: 200,
      fixture: 'mock_notes'
    }).as('notes');
    cy.intercept('GET', ` ${Cypress.env('base_url')}/api/v1/products/get/${Cypress.env('product_id')}`, {
      statusCode: 200,
      body: {
        "product": {
          "_id": "65ae0d908f2c18264d587084",
          "url": "https://www.chewy.com/weruva-mack-jack-mackerel-grilled/dp/34484",
          "image": "https://image.chewy.com/is/image/catalog/49303_MAIN._AC_SL600_V1643071023_.jpg",
          "title": "Weruva Mack & Jack with Mackerel & Grilled Skipjack Grain-Free Canned Cat Food",
          "currentPrice": 39.84,
          "originalPrice": 42.96,
          "miscInfo": [
            "Flavor: Mack and Jack",
            "Size: 3-oz can, case of 24"
          ],
          "priceHistory": [
            {
              "price": 39.84,
              "date": "2024-01-22T06:39:12.458Z",
              "_id": "65ae0d908f2c18264d587085"
            }
          ],
          "lowestPrice": 39.84,
          "highestPrice": 39.84,
          "averagePrice": 0,
          "createdAt": "2024-01-22T06:39:12.749Z",
          "updatedAt": "2024-01-22T06:39:12.749Z"
        }
      }
    }).as('product')
    cy.visit(`${Cypress.env('dashboard_url')}`)
  });
  it('should be able to show specific product on click', () => {
    cy.wait('@products')
    cy.get('.mantine-Card-root').first().click()
    cy.wait('@product')
    cy.get('[style="--group-gap: var(--mantine-spacing-md); --group-align: center; --group-justify: space-around; --group-wrap: wrap; padding-top: calc(2rem * var(--mantine-scale));"]').should('contain', 'Weruva Mack & Jack with Mackerel & Grilled Skipjack Grain-Free Canned Cat Food')
  })
  it('should be able to go back to the home page upon clicking title', () => {
    cy.get('.m-8a5d1357 > .mantine-focus-auto').click()
      .url().should('eq', `${Cypress.env('dashboard_url')}/`)
  });
})