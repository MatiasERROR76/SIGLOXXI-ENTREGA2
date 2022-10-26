export const createClient = (clientForm)=>{
    return {
    
        "user": {
            "name": clientForm.name,
            "birthdate": clientForm.birthdate,
            "contact": {
                "email": clientForm.email
            },
            "credentials": {
                "password": clientForm.password
            },
            "role": {
                "code": clientForm.code
            }
        }}
  }