let nums = [1,2,3,4,5,6,7];
const k = 3;

function rotate(nums, k){
    let n = nums.length;
    let arr= [];
    for(let i = 0; i < n; i++){
        // get the new index ex. 0+ 3 % 7 = 3 so 1 at index 3 
        let index = (i + k) % n;
        arr[index] = nums[i];
    }
    console.log(arr);
    
}

rotate(nums, k)