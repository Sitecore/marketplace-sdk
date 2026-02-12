paths:
  /applications:
    x-sc-sdk:
        generate: false
    get:
      x-sc-sdk:
        generate: true //override
        operationName: listApplications
    post:
      summary: Create Application
      x-sc-sdk:
        generate: false //inheritted to false
 



 /api/v1/languages:
    get:
      tags:
        - Languages
      summary: List languages
      description: Retrieves the list of languages added to the environment.
      operationId: ListLanguages //Replace this with operationName if found
      x-sc-sdk:
       operationName: ListActiveLanguages
      responses:
        "200":
          description: Successful operation
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Language"


let say this is the example of 