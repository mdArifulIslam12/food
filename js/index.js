const meuns = [{
        id: 1,
        title: "buttermilk pancakes",
        category: "breakfast",
        price: 15.99,
        img: "../images/item-1.jpeg",
        desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
        id: 2,
        title: "diner double",
        category: "lunch",
        price: 13.99,
        img: "../images/item-2.jpeg",
        desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
        id: 3,
        title: "godzilla milkshake",
        category: "shakes",
        price: 6.99,
        img: "../images/item-3.jpeg",
        desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
        id: 4,
        title: "country delight",
        category: "breakfast",
        price: 20.99,
        img: "../images/item-4.jpeg",
        desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
        id: 5,
        title: "egg attack",
        category: "lunch",
        price: 22.99,
        img: "../images/item-5.jpeg",
        desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
        id: 6,
        title: "oreo dream",
        category: "shakes",
        price: 18.99,
        img: "../images/item-6.jpeg",
        desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
        id: 7,
        title: "bacon overflow",
        category: "breakfast",
        price: 8.99,
        img: "../images/item-7.jpeg",
        desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
        id: 8,
        title: "american classic",
        category: "lunch",
        price: 12.99,
        img: "../images/item-8.jpeg",
        desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
        id: 9,
        title: "quarantine buddy",
        category: "shakes",
        price: 16.99,
        img: "../images/item-9.jpeg",
        desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
];

const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=beef`)
    .then((response) => response.json())
    .then((data) => {
        let html = "";
        if (data.meals) {
            data.meals.slice(0, 9).forEach((meal) => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Other Details</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove("notFound");
        } else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
    });

function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim();
    if (searchInputTxt) {
        fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`
            )
            .then((response) => response.json())
            .then((data) => {
                let html = "";
                if (data.meals) {
                    data.meals.slice(0, 12).forEach((meal) => {
                        html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Other Details</a>
                        </div>
                    </div>
                `;
                    });
                    mealList.classList.remove("notFound");
                } else {
                    html = "Sorry, we didn't find any meal!";
                    mealList.classList.add("notFound");
                }

                mealList.innerHTML = html;
            });
    } else {}
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
            )
            .then((response) => response.json())
            .then((data) => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <div class = "recipe-meal-img">
                <img src = "${meal.strMealThumb}" alt = "">
         </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
            <h2 class = "recipe-title">${meal.strMeal}</h2>
            <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}

const container = document.getElementById("today-food");
meuns.forEach((meun) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="card h-100 today-food-section">
                  <img src=${meun.img} class="card-img-top" alt="..."/>
                  <div class="card-body">
                    <h5 class="">${meun.title}</h5>                    
                    <p class="card-text">${meun.desc}</p>
                    <div class='d-flex align-items-center today-food-details'>
                        <button>Add To Cart</button>
                        <p class=''>$${meun.price}</p>
                    </div>
                  </div>
                </div>
           `;
    container.appendChild(div);
});

function loader() {
    document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut;