- same as xmc module, I want another new package which is `ai`

- there are reusable tools in `xmc` that can be used by `ai`. Extract it out and make it another new private package (not public and will not released in npmjs) called `internal`. make sure only xmc and ai consume this.

- in `ai`. there will be method for skills. which the method will be ai.skills.{operation}. This is the schema file for skills (can rename the file into skills.json) C:\Users\azla\Downloads\openapi.json

- adjust cicd if needed

