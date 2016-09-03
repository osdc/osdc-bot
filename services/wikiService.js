var request = require('request');

module.exports = function (cb,username,input) {
    'use strict';
    let apiOptions = {
        url :`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=4&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${input}`,
        method : 'GET',
        json : {}
    };
    request(apiOptions,(err,response,data)=>{
       if(!err && response.statusCode==200){
           let result = '',dataArr=[];
           if(data.query){
               for(var key in data.query.pages){
                   dataArr[data.query.pages[key].index-1 ]=data.query.pages[key]; //counting sort indexed at 0 .
               }
           }
           dataArr.forEach((curr,index)=>{
               result+=`\n ## ${index+1}[${curr.title}](https://en.wikipedia.org/?curid='${curr.pageId})\n ${curr.extract}\n`;
           });
           console.log(result);
           cb(result,username);
    }
    });
};