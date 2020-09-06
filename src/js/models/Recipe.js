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
        const units=[...unitsShort,"kg","g"]
        let newIngrdients=[];

        newIngrdients=this.ingredients.map(el=>{
            //uniform units
            //debugger;
            let ingridient=el.toLowerCase();
            unitsLong.forEach((unit,i)=>{
                ingridient=ingridient.replace(unit,unitsShort[i]);
            });

            //remove perenthesis
            ingridient=ingridient.replace(/ *\([^)]*\) */g," ");
            
            //Parse ingredient into count , unit and ingridient
            const arrIng=ingridient.split(" ");
            const unitIndex=arrIng.findIndex(element=>units.includes(element));

            let objIng;
            if(unitIndex>-1)
            {
                //There is a unit 
                //ex 4 1/2 cups 
                const arrCount=arrIng.slice(0,unitIndex);
                let count;
                if(arrCount.length===1)
                {
                    count= eval(arrIng[0].replace("-","+"));
                }
                else
                {
                    count=eval(arrIng.slice(0,unitIndex).join("+"));
                }
                objIng={
                    count,
                    unit:arrIng[unitIndex],
                    ingridient:arrIng.slice(unitIndex+1).join(" ")
                }
                
            }
            else if(parseInt(arrIng[0],10))
            {
               //There is No unit, but 1st element is a number
               objIng={
                    count:parseInt(arrIng[0],10),
                    unit: "",
                    ingridient:arrIng.slice(1).join(" ")
               };
            }
            else if(unitIndex===-1)
            {
               //There is No unit and No number at first position
                objIng={
                    count:1,
                    unit:"",
                    ingridient:ingridient
                }
            }
            return objIng;
        });
        this.ingredients=newIngrdients;      
    }

    updateServing(type)
    {
        //serving
        const newServing=type==="dec"?(this.serving-1):(this.serving+1);
        //Ingridient
        this.ingredients.forEach(el=>{
            el.count=el.count*(newServing/this.serving);
        });
        this.serving=newServing;
    }
}

