export const createProduct = (ProductForm)=>{
    return {
        "product": {
            "name": ProductForm.name,
            "measure": {
                "code": ProductForm.code
            },
            "stock": ProductForm.stock,
            "minimum_stock": ProductForm.minimum_stock,
            
        }}
}