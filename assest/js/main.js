const getCategories = async () => {
   const { data } = await axios.get("https://fakestoreapi.com/products/categories");
   return data;
}

const displayCategories = async () => {
   const categories = await getCategories();
   const result = categories.map(category => 
   `
   <div class="category">
       <h2>${category}</h2>
       <a href='./details.html?category=${category}'>details</a>
   </div>
   `
   ).join('');

   document.querySelector('.categories .row').innerHTML = result;
}

displayCategories();