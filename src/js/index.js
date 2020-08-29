import Search from "./models/Search";
import * as searchView from "./views/searchView"
import { elements,renderLoader,clearLoader } from "./views/base";
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
    console.log(query);
    if(query)
    {
        //2) Create a New search object and add it to the state object
        state.search =new Search(query);

        //3)prepare UI for the result
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4)search for recipes
        await state.search.getResults();

        //5)Render results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener("submit",e=>{
    e.preventDefault();
    controlSearch();
});





