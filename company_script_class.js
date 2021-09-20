class Company{
    constructor(div){
        this.div=document.querySelector(div)
    }
}

let param = new URLSearchParams(window.location.search);
let symbol=param.get('symbol')
let 