let value = {shape: "circle", value: "area", radius: 10};
let value1 = {shape: "rectangle", value: "area", length: 10, breadth: 5};

function calculate(value){
    // if(value.shape === "circle" && value.value === "area"){
    //     let area = 3.14 * value.radius * value.radius;
    //     return area;
    // }
    let shape = value.shape;
    switch(shape){
        case "circle":
            if(value.value === "area"){
                if(value.radius === undefined){
                    console.log("Radius is not defined");
                    return;
                }
                let area = 3.14 * value.radius * value.radius;
                return area;
            }
            
        case "square":
            if(value.value === "area"){
                if(value.side !== undefined){
                    let area = value.side * value.side;
                    return area;
                }
                console.log("Side is not defined");
                return;
            }   
            
         case "rectangle":
            if(value.value === "area"){
                if(value.length !== undefined && value.breadth !== undefined){
                    let area = value.length * value.breadth;
                    return area;
                }
                console.log("Length or Breadth is not defined");
                return;
            }  
            
          case "triangle":
            if(value.value === "area"){
                if(value.base !== undefined && value.height != undefined){
                    let area = 0.5 * value.base * value.height;
                    return area;
                }
                console.log("Base or Height is not defined");
                return;
            } 
            
         default:
            console.log("Shape not found");
            return;   
    }
}

console.log(calculate(value1))