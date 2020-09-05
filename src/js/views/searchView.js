import { elements } from "./base";

export const getInput=()=>elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value="";
}

export const clearResults=()=>{
    elements.searchResultList.innerHTML="";
    elements.searchResPages.innerHTML="";

}

export const clearResButton=()=>{
    elements.searchResPages.innerHTML="";
}

export const highlightedSelected=(id)=>{

    const resultsArr=Array.from(document.querySelectorAll(".results__link"));
    console.log(resultsArr);
    resultsArr.forEach(el=>{
        el.classList.remove("results__link--active");
    });

    let ele=document.querySelector(`a[href="#${id}"]`);
    ele.classList.add("results__link--active");

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
    //render result of current page  //console.log(recipes);
    const start=(page-1)*resPerPage;
    const end=page*resPerPage;

    let recipesForThisPage=recipes.slice(start,end);
    recipesForThisPage.forEach((recipe)=>{
        renderRecipe(recipe);
    });
    //debugger;
    //render pagination buttons
    renderButton(page,recipes.length,resPerPage);
};

const renderButton=(page,numResults,resPerPage)=>
{
    //debugger;
    const pages=Math.ceil(numResults/resPerPage);
    let button;
    if(page===1 && pages>1)
    {
        //Button to go to next page
        button=createButton(page,"next");
    }
    else if(page===pages && pages>1)
    {
        //Button to go to prev page
        button=createButton(page,"prev");
    }
    else if(page<pages){
        //Button to go to prev and next both
        button=`${createButton(page,"prev")}
                ${createButton(page,"next")}
        `;
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin",button);
};

const createButton=(page,type)=>
{
    if(type==="prev")
    {
        const buttonPrev=`
        <button class="btn-inline results__btn--prev" data-goto=${page-1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-left"></use>
            </svg>
            <span>${page-1}</span>
        </button>
        `;
        return buttonPrev;
    }
    else if(type==="next")
    {
        const buttonNext=`
        <button class="btn-inline results__btn--next" data-goto=${page+1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
            <span>${page+1}</span>
        </button>
        `;
        return buttonNext;
    }
};
