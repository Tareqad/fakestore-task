const getCategoriesProducts = async () => {
    const {data} = await axios.get("https://fakestoreapi.com/products/category/electronics")
    return data ;
}
 const displayProducts =  async () => {

    const products = await getCategoriesProducts() ;
    console.log(products);
 }

 displayProducts() ;