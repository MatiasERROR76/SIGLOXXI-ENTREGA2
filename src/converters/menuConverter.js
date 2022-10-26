export const createMenu = (menuForm)=>{
    return {
   
            "menu": {
              
                "category": {
                    "code": menuForm.code,
                  
                },
                "name": menuForm.name,
                "description": menuForm.description,
                "price": {
                    "amount": menuForm.amount
                },
                "image": menuForm.image?? null,
                "preparation_time": menuForm.preparation_time,
                "is_available": true,
             
            }       

    }}


    