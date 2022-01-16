describe("questions", () => {
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


    // it("Get base questions screen", () => {
    //     cy.wait(150)
    //     cy.contains("Submit Question").click({force: true})
    //     cy.contains("Open question")
    //     cy.contains("Closed question")
    // });

    it("Get open question input forms", () => {
        cy.wait(150)
        cy.contains("Submit Question").click({force: true})
        cy.contains("Open question").click({force: true})
        cy.contains("Enter question")
        cy.contains("Enter answer")
    });

    it("Open question error handling", () => {
        cy.wait(150)
        cy.contains("Submit Question").click({force: true})
        cy.contains("Open question").click({force: true})
        cy.contains("Submit question").click({force: true})
        cy.contains("Question field can not be empty!")
        cy.contains("Answer field can not be empty!")
    });

    it("Get closed question input forms", () => {
        cy.wait(150)
        cy.contains("Submit Question").click({force: true})
        cy.contains("Closed question").click({force: true})
        cy.contains("Enter question")
        cy.contains("Enter correct answer")
    });

    it("Closed question error handling", () => {
        cy.wait(150)
        cy.contains("Submit Question").click({force: true})
        cy.contains("Closed question").click({force: true})
        cy.contains("Submit question").click({force: true})
        cy.contains("Some answer fields are empty!")
    });
});