import Search from "./models/Search";
import * as searchView from "./views/searchView"
import { elements,renderLoader,clearLoader } from "./views/base";
import Recipe from "./models/Recipe";
import * as recipeView from "./views/recipeView";
/*Global state of the app
--Search object
--Current recipe object
--Shooping list object
--Liked recipes
*/
const state={};

const controlSearch=async ()=>{
    //1) Get the query from the view
    const query=searchView.getInput();  //TODO
   // const query="pizza";
    console.log(query);
    if(query)
    {
        //2) Create a New search object and add it to the state object
        state.search =new Search(query);

        //3)prepare UI for the result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try 
        {
            //4)search for recipes
            await state.search.getResults();

            //5)Render results on UI
            //console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
            
        } 
        catch (error) 
        {
            console.log("something went worng while serch result"+error);
        }
        
    }
}

elements.searchForm.addEventListener("submit",e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener("click",e=>{
    const btn=e.target.closest(".btn-inline");
   // console.log(e.target);
    console.log(btn.dataset.goto);
    if(btn)
    {
        const goToPage=btn.dataset.goto;
        searchView.clearResults();
        //debugger;
        searchView.clearResButton();
        searchView.renderResults(state.search.result,parseInt(goToPage,10));
    }
});


/*
elements.searchResultList.addEventListener("click",e=>{
    recipeViewController(e.target);
});

const recipeViewController=async (target)=>{
        const anchor=target.closest(".results__link");
        const id=anchor.href.split("#")[1];
       // console.log(anchor.href.split("#")[1]);

        state.recipe=new Recipe(id);

        //3)prepare UI for the result
        clearRecipeView();
        renderLoader(elements.recipeResult);

        //4)search for recipes
        await state.recipe.getRecipe();
        
        //5)Render results on UI
        clearLoader();
        renderRecipe(state.recipe);
};
*/

/*
Recipe Controller
*/

const controlRecipe=async ()=>{
    const id=window.location.hash.replace("#","");
    console.log(id);

    if(id)
    {
        //prepare the UI for the changes
        recipeView.clearRecipe();
        renderLoader(elements.recipeResult);

        //highlight selected seach item
        if(state.search)
        {
            searchView.highlightedSelected(id);
        }
        //Create new Recipe Object
        state.recipe=new Recipe(id);
        
            //testing 
           // window.r=state.recipe;
        try
        {
             //Get the recipe data
            await state.recipe.getRecipe();

            //calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServing();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            
            //render Recipe
            // console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch(e)
        {
            console.log("error while processing the recipe..."+e);
        }
       
    }
};

/*
window.addEventListener('hashchange',controlRecipe);
window.addEventListener("load",controlRecipe);
*/

["hashchange","load"].forEach(e=>window.addEventListener(e,controlRecipe));

