
const getTotalProducts = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        return data.length;
    } catch (error) {
        return []; 
    }
};

const getProducts = async (page) => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        return data.slice((page - 1) * 5, page * 5); 
    } catch (error) {
        return [];
    }
};

const displayProducts = async (page = 1) => {
    try {
        const totalProducts = await getTotalProducts(); 
        const numberOfPages = Math.ceil(totalProducts / 5); 
       

        const products = await getProducts(page); 

        const result = products.map(product => 
            `<div class="product-card">
                <div class="product">
                    <img src="${product.image}" class="prdcts-img">
                    <div class="product-description">
                        <h2>${product.title}</h2>
                        <p>$${product.price}</p>
                        <a href="#" class="buynow-btn">Buy Now</a>
                    </div>
                </div>
            </div>`
        ).join('');
        
        document.querySelector(".all-prdcts .row").innerHTML = result;
        customModal();

        let paginationLinks=``;
        if(page>1){
            paginationLinks += `<li><button onclick=displayProducts(${parseInt(page-1)})>&lt;</button></li>`;
        }
        else{
            paginationLinks += `<li><button disabled>&lt;</button></li>`;
        }
      
        for (let i = 1; i <= numberOfPages; i++) {
            if (i === page) {
                paginationLinks += `<li><button class="active" onclick="displayProducts(${i})">${i}</button></li>`;
            } else {
                paginationLinks += `<li><button onclick="displayProducts(${i})">${i}</button></li>`;
            }
        }
     
        if(page<numberOfPages){
            paginationLinks += `<li><button onclick=displayProducts(${parseInt(page+1)})>&gt;</button></li>`;
        }
        else{
            paginationLinks += `<li><button disabled>&gt;</button></li>`;
        }
        document.querySelector(".pagination").innerHTML = paginationLinks;


    } catch (error) {
        document.querySelector(".all-prdcts .row").innerHTML = "<p>Please try again later ...</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
    
};

displayProducts();

function customModal(){
    const modal = document.querySelector('.my-modal');
const closebtn = document.querySelector('.close-btn');
const rightbtn = document.querySelector('.right-btn');
const leftbtn = document.querySelector('.left-btn');
const images = Array.from(document.querySelectorAll('.prdcts-img'));
let currentIndex = 0;

// Event listeners
images.forEach(function(img){
    img.addEventListener('click' , (e) => {
        modal.classList.remove('d-none');
       modal.querySelector('img').setAttribute("src", e.target.src) 

       const currentImg=e.target;
       currentIndex=images.indexOf(currentImg);
    });
});
closebtn.addEventListener('click', () => {
    modal.classList.add('d-none');
});
rightbtn.addEventListener('click', () => {
currentIndex++;
if(currentIndex>=images.length){
    currentIndex=0;
}
const src=images[currentIndex].getAttribute("src");
modal.querySelector('img').setAttribute("src", src);
});
leftbtn.addEventListener('click', () => {
    currentIndex--;
    if(currentIndex<0){
        currentIndex=images.length-1;
    }
    const src=images[currentIndex].getAttribute("src");
    modal.querySelector('img').setAttribute("src", src);
    });
// Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.code == "ArrowRight") {
            rightbtn.click();
        } else if (e.code =="ArrowLeft") {
            leftbtn.click();
        }
        else if (e.code == "Escape") {
            modal.classList.add('d-none');
        }
    });


}

