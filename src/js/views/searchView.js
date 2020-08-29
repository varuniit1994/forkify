import { elements } from "./base";

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value="";
}

export const clearResults=()=>{
    elements.searchResultList.innerHTML="";
}

// pasta with tamato and spanish
const limitRecipeTitle=(title,limit=17)=>{
    const newLetter=[];
    if(title.length>limit)
    {
        title.split(" ").reduce((acc,current)=>{
            if(acc+current.length<=limit)
            {
                newLetter.push(current);
            }
            return acc+current.length;
        },0);
       
        //return the result
        return `${newLetter.join(" ")}...`;
    }
    return title;
}


const renderRecipe=(recipe)=>{
    const markup=`
    <li>
        <a class="results__link results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>           
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML("beforeend",markup);
};

export const renderResults=(recipes,page=1,resPerPage=10)=>
{
    //console.log(recipes);
    const start=0;
    const end=10;

    

    recipes.forEach((recipe)=>{
        renderRecipe(recipe);
    });

};
