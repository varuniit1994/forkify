export default class Likes
{
    constructor()
    {
        this.likes=[];
    }
    addLike(id,title,author,img)
    {
        const like={
            id,title,author,img
        };

        this.likes.push(like);
        //persist the data in the local storage
        this.persistData();
        return like;
    }

    deleteLike(id)
    {
        const index=this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index,1);

        //persist the data in localstorage
        this.persistData();
    }

    isLiked(id)
    {
       // debugger;
        const like=this.likes.findIndex(el=>el.id===id);
        if(like==-1)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    getNumLikes()
    {
        return this.likes.length;
    }

    persistData()
    {
        localStorage.setItem("likes",JSON.stringify(this.likes));
    }

    readStorage()
    {
        const storage=JSON.parse(localStorage.getItem("likes"));
        if(storage)
        {
            this.likes=storage;
        }
    }
}