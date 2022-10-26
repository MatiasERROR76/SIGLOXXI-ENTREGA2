export const createUser = (userForm)=>{
    return {
      "user": {
          "identification_document": {
              "number": userForm.number ?? null,
              "validator": userForm.validator ?? null
          },
          "name": userForm.name,
          "last_name": userForm.last_name ?? null,
          "second_last_name": userForm.second_last_name ?? null,
          "birthdate": userForm.birthdate ?? null,
          "contact": {
              "email": userForm.email
          },
          "credentials": {
            "password": userForm.password
        },
          "role": {
              "code": userForm.code
          }
      }
  }
  }