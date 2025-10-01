let haystack = "sadbutsad", needle = "sad";

function strop(haystack, needle){
    if(haystack.includes(needle)){
        
        console.log(haystack.indexOf(needle));
    }
    else{
        console.log(-1);
    }
}

strop(haystack, needle);