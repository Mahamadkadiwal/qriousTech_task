let strs = ["flower","flow","flight"];
// let strs = ["dog","racecar","car"];

function longestCommonPrefix(strs){
    let prefix = "";

    // get first string
    const fstr = strs[0];
    // get last string
    const lstr = strs[strs.length -1];
    
    for(let i=0; i< fstr.length;i++){
        if(fstr[i] === lstr[i]){
            prefix += fstr[i];
        }
        else{
            prefix += "";
        }
    }

    // strs.map((s, i) => {
    //     if(s[i] == fstr[i]){
    //         prefix += s[i];
    //     }
    // })
    console.log(prefix);
}

longestCommonPrefix(strs);