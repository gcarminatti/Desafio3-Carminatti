README

##Para traer todos los productos :

Invoke-RestMethod -Method Get -Uri "http://localhost:3000/products"


##Para traer un producto con ID :

Invoke-RestMethod -Method Get -Uri "http://localhost:3000/products/1"



##Para agregar productos usando POST podemos usar el siguiente comando :

$body = @{
     "title"= "Producto 10"
    "description"= "Descripción del producto 10"
    "price"= 18
    "thumbnail"= "/path/to/thumbnail10.jpg"
    "code"= "ABC125"
    "stock"= 10
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/products" -Body $body -ContentType "application/json"


##Para modificar productos usando PUT podemos usar el siguiente comando con los campos deseados :
$body = @{
    "title"= "Producto 10 pasa a ser el 11"
    "description"= "Descripción del producto 10 a 11"
    "price"= 22
} | ConvertTo-Json

Invoke-RestMethod -Method Put -Uri "http://localhost:3000/products/1" -Body $body -ContentType "application/json"


##Para borrar un producto usando DELETE y le pasamos el ID del producto:

Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/productos/1"
