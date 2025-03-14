const getCategoriesProducts = async () => {
    try {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    return data;
    } catch (error) {
        return[];
    }
};

const displayProducts = async () => {
    try{
    const products = await getCategoriesProducts();
   
        const result = products.map(product => 
            `<div class="product-card">
                <div class="product">
                    <img src="${product.image}">
                    <div class="product-description">
                        <h2>${product.title}</h2>
                        <p>$${product.price}</p>
                        <a href="productdetails.html?id=${product.id}" class="details-btn">Details</a>
                    </div>
                </div>
            </div>`
        ).join('');
    
    

    document.querySelector(".products .row").innerHTML = result;
    
} catch (error) {
    document.querySelector(".categories .row").innerHTML ="<p>Please try again later ...</p>"
    
 }
 finally{
    document.querySelector(".loading").classList.add("d-none");
    
 }

};

displayProducts();