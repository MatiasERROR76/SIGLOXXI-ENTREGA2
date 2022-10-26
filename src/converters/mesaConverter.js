export const createMesa = (MesaForm)=>{
    return {
         
       
            "table": {
              
                "number": MesaForm.number,
                "status": {
                    "code": MesaForm.code,
                    "name": MesaForm.name,
                }
            }
        }

    }