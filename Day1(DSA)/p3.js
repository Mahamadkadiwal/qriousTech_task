let s = "IceCreAm";
let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

function reverse_vowels(s, vowels){
    let st = s.split('');
    let vw = [];
    st.map((s, i) => {
        if(vowels.includes(s)){
            vw.push(s);
        }
    })
    // console.log(vw)

    for(let i = 0; i < st.length; i++){

        if(vowels.includes(st[i])){
             st[i] = vw.pop();
            
        }
    }
    console.log(st.join(''))
}

reverse_vowels(s, vowels);