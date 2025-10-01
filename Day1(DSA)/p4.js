let flowerbed = [1,0,0,0,1]
let n=1;

function canFlowers(flowerbed, n){
    let count_zero =0;
    let count_one=0;
    for(let i=0; i< flowerbed.length; i++){
        if(flowerbed[i] === 0){
            count_zero++;
        }
        else{
            count_one++;
        }
        
    }
    if((count_zero-n) >= 2){
            console.log(true);
        }
        else{
            console.log(false);
        }
    // console.log(count_zero, count_one);
}

canFlowers(flowerbed, n)