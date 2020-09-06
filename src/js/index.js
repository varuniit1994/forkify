import Search from "./models/Search";
import * as searchView from "./views/searchView"
import { elements,renderLoader,clearLoader } from "./views/base";
import Recipe from "./models/Recipe";
import * as recipeView from "./views/recipeView";
import List from "./models/List";
import { renderItem,deleteItem } from "./views/listView"

/*Global state of the app
--Search object
--Current recipe object
--Shooping list object
--Liked recipes
*/
const state={};
window.state=state;
const controlSearch=async ()=>{
    //1) Get the query from the view
    const query=searchView.getInput();  //TODO
   // const query="pizza";
   //console.log(query);
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
Recipe Controller
*/

const controlRecipe=async ()=>{
    const id=window.location.hash.replace("#","");
    //console.log(id);

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
            //console.log(state.recipe.ingredients);
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

["hashchange","load"].forEach(e=>window.addEventListener(e,controlRecipe));


/*
List Controller
*/
const controlList=()=>{
    //create a new List if there is no existing list 
    if(!state.list)
    {
        state.list=new List();
    }

    //add each ingredient to the List
    state.recipe.ingredients.forEach(el=>{
        //console.log(el);
        const item=state.list.addItem(el.count,el.unit,el.ingridient);
        //console.log(item);
        renderItem(item);
    });
};


//handling delete and update list item events
elements.shopping.addEventListener("click",e=>{
    const id=e.target.closest(".shopping__item").dataset.itemid;

    //Handle the delete button
    if(e.target.matches(".shopping__delete, .shopping__delete *"))
    {
        //Delete from state object
        state.list.deleteItem(id);

        //delete from UI
        deleteItem(id);
    }
    else if(e.target.matches(".shopping__count-value"))
    {
        const val=parseFloat(e.target.value,10);
        state.list.updateCount(id,val);
    }
});

//Handling recipe button Click
elements.recipeResult.addEventListener("click",e=>{
     if(e.target.matches(".btn-decrease, .btn-decrease *"))
     {
        //Decrease Button is clicked
        if(state.recipe.serving>1)
        {
            state.recipe.updateServing("dec");
            recipeView.updateServingIngredients(state.recipe);
        }
     }
     else if(e.target.matches(".btn-increase, .btn-increase *"))
     {
        //Increase button is clicked
        state.recipe.updateServing("inc");
        recipeView.updateServingIngredients(state.recipe);
     }
     else if(e.target.matches(".recipe__btn--add, .recipe__btn--add *"))
     {
        controlList();
     }
});

const l=new List();
window.l=l;


/*
window.addEventListener('hashchange',controlRecipe);
window.addEventListener("load",controlRecipe);
*/

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
