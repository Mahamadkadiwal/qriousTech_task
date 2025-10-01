let drinks = [{name: "lemonade", price: 50},{name: "lime", price: 10}, {name: "orange", price: 20}, {name: "watermelon", price: 15}];

// drinks.sort((a, b) => a.price - b.price);

function sortPrice(drinks){
    // use of bubble sort
    for(let i=0; i< drinks.length;i++){
        for(let j=i+1; j< drinks.length;j++){
            if(drinks[i].price > drinks[j].price){
                let temp = drinks[i];
                drinks[i] = drinks[j];
                drinks[j] = temp;
            }
        }
    }
    return drinks;
}
console.log(sortPrice(drinks));