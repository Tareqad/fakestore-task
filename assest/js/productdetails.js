const getProductsDetails = async () => {
    try{
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');  
    const { data } = await axios.get(`https://fakestoreapi.com/products/${productId}`); 
    return data;
    }catch (error) {
        return[];
    }
};
const starIcons = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return `
        ${'⭐'.repeat(fullStars)}
        ${halfStar ? '⭐½' : ''}
        ${'☆'.repeat(emptyStars)}
    `;
};

const displayProductDetails = async () => {
    try{
    const product = await getProductsDetails();
    const result = 
    `<div class="product-details-card">
       <div class="prdcts-img">
       <img src="${product.image}" />
       </div> 
            <div>
                <h2>${product.title}</h2>
                <p class="price">Price: $${product.price}</p>
                <p class="description">${product.description}</p>
                <div class="category">Category: <span>${product.category}</span></div>
                <div class="rating">
                    <p class="stars">${starIcons(product.rating.rate)}</p>
                    <p class="reviews">Based on <span>${product.rating.count}</span> reviews</p>
                </div>
                <div class="btns">
                <a href="#" class="buy-btn">Buy Now</a>
                <i class="fa-solid fa-cart-shopping" ></i>
                </div>
                
                
            </div>
   </div>`;

    document.querySelector('.prdcts .row').innerHTML = result; 
    
} catch (error) {
    document.querySelector('.categories .row').innerHTML ="<p>Please try again later ...</p>"
    
 }
 finally{
    document.querySelector(".loading").classList.add("d-none");
    
 }
};

displayProductDetails();
