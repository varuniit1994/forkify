import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";
export const toggleLikeBtn=(isLiked)=>{
    //<use href="img/icons.svg#icon-heart-outlined"></use>
    const iconString=isLiked ?"icon-heart":"icon-heart-outlined";
    document.querySelector(".recipe__love use").setAttribute("href",`img/icons.svg#${iconString}`);
}

export const toggleLikeMenu=numlikes=>{
    elements.likeMenu.style.visibility= numlikes?"visible":"hidden";
};

export const addLikedRecipe=(like)=>{
    const markup=`
     <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likeList.insertAdjacentHTML("beforeend",markup);
};

//querySelector(`.results__link[href="#${id}"]`);
export const deleteLikeFromDOM=id=>{
    const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el)
    {
        el.parentElement.removeChild(el);
    }
};