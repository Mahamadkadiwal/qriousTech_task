function exclude_number(nums){
    let count = 0;
    let arr=[];
    for(let i=0; i< nums.length; i++){
        
        if(nums[i] !== nums[i+1]){
            count++;
            arr.push(nums[i]);
        }
        

    }

    if(arr.length !== nums.length){
        arr.push('_');
    }
    console.log('nums =', arr)
    return count;
}

let nums = [1,1,2]

console.log(exclude_number(nums))