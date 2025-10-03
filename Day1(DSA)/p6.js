let x = 4, y = 1;

function decimalToBinary(num){
    let binary = num.toString(2);
    return binary;
}
function hammingDistance(x, y){
    let xbinary = decimalToBinary(x);
    let ybinary = decimalToBinary(y);
    let count =0;
    let maxLength = Math.max(xbinary.length, ybinary.length);
    for(let i=0; i < maxLength; i++){
        if(xbinary[i] !== ybinary[i]){
            count++;
        }
    }
    return count;
}

console.log(hammingDistance(x, y))