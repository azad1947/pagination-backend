const elastic = require("elasticsearch");
const movies = require("../db/csvjson (1).json");
const client = new elastic.Client({
    host:'http://localhost:9200'
})


client.indices.create({
    index:'movies'
})

//uncomment below lines of code and run this script once. after that comment them again

/*
var bulk=[];
movies.forEach(movie=>{
    bulk.push({index:{
        _index:'movies',
        _type:'movie'
    }})
    bulk.push(movie)
})
client.bulk({body:bulk},(err,response)=>{
    if(err){
        console.log('something went wrong---->',err);
    } else{
        console.log('bulk upload successful---->',response)
    }
})
*/

module.exports = client;
