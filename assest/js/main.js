const getCategories = async () => {
try{
   const { data } = await axios.get("https://fakestoreapi.com/products/categories");
   return data;
}catch (error) {
  return[];
}
};

const getCategoryImage = async (category) => {
   try{
   const { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
   return data.length > 0 ? data[0].image : "fallback-image.jpg"; 
   }catch (error) {
      return[];
   }
};
const populateDropdown = async () => {
   
   const categories = await getCategories();
   const dropdownMenu = document.getElementById("categoryDropdown");

   const categoryItems = categories.map(category => 
       `<li><a href="./details.html?category=${category}">${category}</a></li>`
   ).join('');

   dropdownMenu.innerHTML = categoryItems;
   
};

populateDropdown();

const displayCategories = async () => {
   try{
   const categories = await getCategories();
   const categoryData = await Promise.all(categories.map(async (category) => {
       const image = await getCategoryImage(category);
       return { category, image };
   }));

   const result = categoryData.map(({ category, image }) => 
   `
   <div class="category">
       <img src="${image}" >
       <h2>${category}</h2>
       <a href="./details.html?category=${category}" class="shop-btn">Shop Now</a>
   </div>
   `
   ).join('');

   document.querySelector(".categories .row").innerHTML = result;
   
  
   } catch (error) {
      document.querySelector(".categories .row").innerHTML ="<p>Please try again later ...</p>"
      

   }
   finally{
      document.querySelector(".loading").classList.add("d-none");
      
   }
};

displayCategories();
