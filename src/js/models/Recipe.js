import axios from "axios";
//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
export default class Recipe
{
    constructor(id)
    {
        this.id=id;
    }

    async getRecipe()
    {
        try
        {
            const res=await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.image_url=res.data.recipe.image_url;
            this.ingredients=res.data.recipe.ingredients;
            this.publisher=res.data.recipe.publisher;
            this.social_rank=res.data.recipe.social_rank;
            this.source_url=res.data.recipe.source_url;
            this.title=res.data.recipe.title;
            this.publisher_url=res.data.recipe.publisher_url;
        }
        catch(e)
        {
            console.log(e);
            alert("something went worng while fetching the recipe... ");
        }
    }

    calcTime()
    {
        //Assuming that we need 15 min for each 3 ingredient
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*numIng;
    }

    calcServing()
    {
        this.serving=4;
    }

    parseIngredients()
    {
        const unitsLong=["tablespoons","tablespoon","ounces","ounce","teaspoons","teaspoon","cups","pounds"];
        const unitsShort=["tbsp","tbsp","oz","oz","tsp","tsp","cup","pound"];

        let newIngrdients=[];

        newIngrdients=this.ingredients.map(el=>{
            //uniform units
            //debugger;
            let ingridient=el.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingridient=ingridient.replace(unit,unitsShort[i]);
            });
            //console.log(ingridient);

            //remove perenthesis
            ingridient=ingridient.replace(/ *\([^)]*\) */g," ");
            //console.log(ingridient);
            //Parse ingredient into count , unit and ingridient

            return ingridient;
        });

        this.ingredients=newIngrdients;      
    }
}

