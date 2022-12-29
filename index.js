//lexical scope is an imp part of closure,defines how variables in a nested func resolved
//nested function(chid) has access to scope of parent func

//global scope
let x=1;

const parentFunc=()=>{
    //local scope
    let myvalue=2;
    console.log(x);//1
    console.log(myvalue+1);//2+1=3

    const childFunc=()=>{
        console.log(x+=3);//4
        console.log(myvalue+=4);//2+4=6
    }
    return childFunc;
}
parentFunc()();//closure :child function has access to its localscope and parent func's localscope nd globalscope
                // even if the parent func has been closed
                //1 3 4 6
parentFunc()();//4 3 7 6 bcoz parent func is a private class nd x is a public value
console.log(x);//last value of x =7
//console.log(myvalue);//reference error bcoz myvalue is private value

//IIFE immediately invoked func expression
const privateCounter=(()=>{
    let count=0;
    console.log(`Initial value: ${count}`);
    return ()=>{                            //anonymous func
        count+=1;
        console.log(count);
    }
})();//initial value:0
privateCounter();//1
privateCounter();//2    

const credit=((num)=>{
    let credits=num;
    console.log(`Initial credit value: ${credits}`);
    return ()=>{
        credits-=1;
        if(credits>0)console.log(`playing game, ${credits} credits remaining`);
        if(credits<=0)console.log("not enough credits");
    }
})(3);//Initial credit value: 3
credit();//playing game, 2 credits remaining
credit();//playing game, 1 credits remaining
credit();//not enough credits

//__proto__
//object literal
const person={
    alive:true
}
const musician={
    plays:true
}
console.log(musician.plays);//true
console.log(musician.alive);//undefined bcoz alive is not a prop of musician

Object.setPrototypeOf(musician,person);   //or musician.__proto__=person;
console.log(musician.alive);//true
console.log(musician);

console.log(Object.getPrototypeOf(musician));

//extending prototype chain
const guitarist={
    string:6,
    __proto__:musician
}
console.log(guitarist.string);//6
console.log(guitarist.plays);//true
console.log(guitarist.alive);//true
console.log(guitarist);

//objects with getter and setter method
const car={
    doors:2,
    seats:"vinyl",
    get seatMaterial(){
        return this.seats;
    },
    set seatMaterial(material){
        this.seats=material;
    }

}
const luxuryCar={};
Object.setPrototypeOf(luxuryCar,car);
luxuryCar.seatMaterial="leather";
console.log(luxuryCar);
console.log(luxuryCar.doors);//2

console.log(luxuryCar.valueOf());

//getting keys of object
console.log(Object.keys(luxuryCar));//[seats]

//loop through each object key
Object.keys(luxuryCar).forEach(key=>{
    console.log(key);    //seats
})

//for in loop includes inherited prop 
for(let k in luxuryCar){
    console.log(k);   //seats doors seatmaterial
}

//Object constructor
function Animal(species){
    this.species=species;
    this.eats=true;
}
//adding walks props to Animal
Animal.prototype.walks=function(){     
    return `A ${this.species} is walking`;
};

const Bear=new Animal("bear");
console.log(Bear.species);//bear
console.log(Bear.walks());//A bear is walking

console.log(Bear.__proto__);
console.log(Bear.__proto__==Animal.prototype);//true
console.log(Bear);

//ES6 classes eg of inheritance
class Vehicle{
    constructor(){
        this.wheels=4,
        this.motorized=true
    }
    ready(){
        return "Ready to go!";
    }
}

class Motorcycle extends Vehicle{
    constructor(){
        super();
        this.wheels=2;
    }
    wheelie(){
        return "On One Wheel Now!";
    }
}

const bike=new Motorcycle();
console.log(bike);//Motorcycle {wheels: 2, motorized: true}
console.log(bike.ready());//Ready to go!

//Recursion occurs when func calls itself
const recurToTen=(num=1)=>{
    if (num>10) return;
        console.log(num);       //1 2..10;
        num++;
        recurToTen(num);
}
recurToTen();


//fibonacci sequence 0,1,1,2,3,5,8,13..
fib=(n)=>{
    let a=[];
     a[0]=0;
     a[1]=1;
    for(let i=0;i<n;i++){
        if(i>1){
            a[i]=a[i-1]+a[i-2];
        }
    }
    return a;
}
console.log(fib(10));//[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

//using recursion
fibonacci=(n,ar=[0,1])=>{
    if(n<=2) return ar;
    const [nlast,last]=ar.slice(-2);
    return fibonacci(n-1,[...ar,nlast+last]);
} 
console.log(fibonacci(10));//[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]


//find fib no in the specific pos
fobonacciPos=(pos)=>{
    if(pos<=1) return pos;
    const seq=[0,1];
    for(let i=2;i<=pos;i++){
        const [nextTolast,last]=seq.slice(-2);
        seq.push(nextTolast+last);
    }
    return seq[pos];
}
console.log(fobonacciPos(9));//34

//using recursion
fibpos=(pos)=>pos<2?pos:fibpos(pos-1)+fibpos(pos-2);

console.log(fibpos(9));//34

//Decorator function:wrap a func in another func with new capabilities

let sum=(...args)=>{
    return [...args].reduce((acc,num)=>acc+num);
}
console.log(sum(1,2,3,4));//10


const callCounter=(fn)=>{
    let count=0;
    return (...args)=>{
        console.log(`sum has been called ${count += 1} times`);
        return fn(...args);
    }
}
sum=callCounter(sum);

console.log(sum(1,2,3,4,5));//sum has been called 1 times 15 
console.log(sum(1,2,4,5));//sum has been called 2 times 12
console.log(sum(1,2,3,4,5,6));//sum has been called 3 times 21

//Currying takes a function that receives more than one parameter
//and breaks it into a series of one parameter function

const buildSandwich=(ingredient1)=>{
    return(ingredient2)=>{
        return (ingredient3)=>{
            return `${ingredient1},${ingredient2},${ingredient3}`;
        }
    }
}
const mysandwich=buildSandwich("chicken")("lettuce")("tomato");

console.log(mysandwich);//chicken,lettuce,tomato

//refactoring above Eg.
const buildsandwich=ingred1=>ingred2=>ingred3=>`${ingred1},${ingred2},${ingred3}`;

console.log(buildsandwich("chicken")("lettuce")("tomato"));//chicken,lettuce,tomato

const multiply=(x,y)=>x*y;

const curriedMult=x=>y=>x*y;

console.log(multiply(4,5));//20
console.log(curriedMult(5)(6));//30

//partially applied func is a eg of currying
const multby5=curriedMult((5));//partial applied func
console.log(multby5(3));  //15 
console.log(multby5(2));  //10

//shallow copy deep copy

//passing value vs passing references
//primitive datatype passses value
let y=2;
let z=y;//passing value
z+=1;
console.log(z);//3  
console.log(y);//2

//in structural datatypes object, array it passes referncewhen assigning to another variable
let xarr=[1,2,3];
let yarr=xarr;   //passing refernces
yarr.push(4);
console.log(yarr);//[1,2,3,4]
console.log(xarr);//[1,2,3,4]

//mutable vs immutable
//primitives are immutable
let name1="john";
name1[0]="w";  //are immutable
console.log(name1);//john

//structures contain mutable data
yarr[0]=5;
console.log(yarr);//5,2,3,4
console.log(xarr);//5,2,3,4

//impure function
const addScoreToArr=(arr,score)=>{
     arr.push(score);
     return arr;
}
const scoreArr=[1,2,3,4];
console.log(addScoreToArr(scoreArr,5));//[1,2,3,4,5]
console.log(addScoreToArr(scoreArr,5));//[1,2,3,4,5,5]  impure function

//Shallow copy vs deep copy
//shallow
//with spread operator (...arr)
const zArr=[...yarr,10];
console.log(zArr);//523410
console.log(yarr);//5234

//Object.assign()
const assignArray=Object.assign([],zArr);

console.log(assignArray);//523410
console.log(zArr===assignArray);//false bcoz difft reference




