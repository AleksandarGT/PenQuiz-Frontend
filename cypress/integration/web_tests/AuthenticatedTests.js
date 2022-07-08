describe("AuthenticatedTests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:19006/");
        cy.intercept('Post', 'https://localhost:5003/api/account/refresh-token', {
            statusCode: 200,
            body: {
                id: 1,
                username: "testing",
                jwtToken: "testingtoken",
            },
        }).as("default renew-token");
    })

    it("Logged in initial screen", () => {
        cy.contains("PenQuiz")
        cy.contains("Find Game")
    });

    
    it("Switch to private game", () => {
        cy.wait(80)
        cy.contains("Private Game").click({force: true})
        cy.contains("Join Game")
        cy.contains("Create Game")
    });

    it("Get Game statistics", () => {
        cy.wait(80)
        cy.contains("Account").click({force: true})
        cy.contains("Total games: 0")
        cy.contains("Total wins: 0")
        cy.contains("Win percentage: 0%")
    });
});