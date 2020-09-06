import uniqid from "uniqid";
import { elements } from "../views/base";

export default class List
{
    constructor()
    {
        this.items=[];
    }

    addItem(count,unit,ingredient)
    {
        const item={
            id:uniqid(),
            count:count,
            unit:unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id)
    {
        let indexToDelete;
        indexToDelete=this.items.findIndex(id=>elements.id===id);

        /*
        this.items.forEach((element,index)=>{
            if(element.id===id)
            {
                idToDelete= index;
            }
        });

        const index=this.items.map((element,index)=>{
            if(element.id===id)
            {
                return index;
            }
        });
        */
        this.items.splice(indexToDelete,1);

    }

    updateCount(id,newCount)
    {
        this.items.find(ele=>ele.id===id).count=newCount;
       
    }
}