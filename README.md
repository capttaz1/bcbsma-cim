# bcbsma-cim

### Folder Structure

-   src
    server.js App entry point
    -   api Express route controllers for all the endpoints of the app
    -   config Environment variables and configuration related modules
    -   jobs Jobs definitions for agenda.js
    -   loaders Split the startup process into modules
    -   models Database models
    -   services All the business logic is here
    -   subscribers Event handlers for async tasks
    -   types Type declaration files (d.ts) for Typescript (not used here)
-   public website files (not structured at this time)
