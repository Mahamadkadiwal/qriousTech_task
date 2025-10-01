let nums = [1,2,3,4,5,6,7];
const k = 3;

function rotate(nums, k){
    let n = nums.length;
    let arr= [];
    
    for(let i = 0; i < n; i++){
        let index = (i + k) % n;
        console.log(index)
        arr[index] = nums[i];
    }
    console.log(arr);
    
}

rotate(nums, k)