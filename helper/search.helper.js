module.exports = (query) => {
    let objFind = {
        keyword: ""
    }
    if(query.search_query){
        objFind.keyword = query.search_query;
        //console.log(query.search_query);
        const regex = new RegExp(objFind.keyword, 'i');
        objFind.regex = regex;
    }

    return objFind;
}