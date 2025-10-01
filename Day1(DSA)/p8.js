let num = [1,2,[5,4],3,[5],[93,8,2]]

function flattenArray(num){
    let result = [];
    for(let i=0; i< num.length;i++){
        if(typeof(num[i]) == 'number'){
            // if type number 
            result.push(num[i]);
        }
        else{
            // if type array
            result = result.concat(num[i]);
        }
    }
    return result;
}

console.log(flattenArray(num));