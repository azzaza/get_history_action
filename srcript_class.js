class Hisrory{
    constructor(div){
        this.main=document.querySelector(div)
        this.arr=[]
        this.arr_compare = get_arr_compare()
    }
    draw_html(){
        this.main.innerHTML=
        `
        <div class='oner'>
        </div>
        <div class="menu">
            <input class='input' type="text">
            <button class="search">Search</button>
        </div>   
        <div class="spiner"></div> 
        <div class="ans"></div>
        <div class=global_ans></div>
        <div class="container_error none">

        <div class="eror">

        <button class="remove">
                X
         </button>

               <div class="text_error"></div>
            </div>
               
        </div>
        `
        this.all_event()
    }
    get_item(...clas){
        for (const it of clas) {
            this[it]=document.querySelector(`.${it}`)
        }   
    }
    
    draw(div){
        div.innerHTML = ''
        this.spiner.innerHTML = '<img class="load" src="loading-icon-transparent-background-12.gif">'
        fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input.value.trim().toUpperCase()}&limit=10&exchange=NASDAQ`)
        .then(e => e.ok ? e.json() : Promise.reject(e))
        .then(e => {
            if(e.length==0){
                eror_op('eror 404 company not found')
                
                this.input.value=''
            }
            Promise.all(e.map(element => fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${element.symbol}`)))
                .then(all_data =>
                    all_data.map(e => e.ok ? e.json() : Promise.reject(e))
                )
                .then(e=>{
                   
                    // this.get_all_symbol(e,div)
                    this.get_all_symbol_cop(e,div)
                })
                .finally(()=>{

                    if(document.querySelector('.load'))document.querySelector('.load').remove()
                })

        

            })
    }
    draw_comp(el,i){
        let dis=false
        
        if(this.arr_compare.find(elem=>elem==el.symbol)){
            dis=true
        }
             return `
        <div class='company_cont'>
            <img src='${el?.profile?.image}' onerror="eror_img(this)">
            <p class='name_comp'>
                <a href='company.html?symbol=${el?.symbol}'>${el?.profile?.companyName}</a>
            </p>
            <div class='symbol_pers'>
                <p>(${el?.symbol})</p>
                <p class='persentage'   ${red_or_green(el?.profile?.changesPercentage)}>
                    ${(+el?.profile?.changesPercentage).toFixed(2)}
                </p>
            </div>
            <button class='info ${el.symbol}' ${dis ? 'disabled':''}  id='${i}' onclick='log_inf(${i},this)'>
                Compare
            </button>
        </div>
        `
       
    }
    // get_arr(data){


    //     data.forEach(it=>{
    //         it.then( (e) => arr.push(e))
    //     })



    //     console.log(
    //         data.map(async it=>{
    //                 let d;

    //           await  it.then(e=>{
                
    //               d = e
    //               console.log(d);
    //           } )
    //             return d
    //         })
    //     );
    // }


    get_all_symbol_cop(data,div){
        this.arr=[]
        let bool=false
        let k=data.length
        for (const i of data) {
            i.then((el) => {
                if(el.symbol){
                    this.arr.push(el) 
                }
                else{
                    k--
                }
                if(this.arr.length==k){
                    bool=true
                    return bool  
                }  
            })
            .then(e=>{
                
                if(e&&this.input.value.trim()){
                    if(div==this.global_ans){
                        this.curent_inf_cont.innerHTML=this.arr
                        .filter(i=>i.symbol)
                        .map(i=>
                            `
                            <div class='symbol_pers_slider'>
                                <p>${i.symbol}</p>
                                <p class='persentage'   ${red_or_green(i.profile.changesPercentage)}>
                                    (${i.profile.changesPercentage})
                                </p>
                            </div>
                            `
                        )
                        .join('')
                    }
                    console.log(this.arr);
                    div.innerHTML=this.arr
                    .filter(i=>i.symbol)
                    .map((i,index)=>this.draw_comp(i,index)).join('')
                    if(c_to_c.children.length>0){
                        
                    }
                }
            })
        }
    }

get_all_symbol(data,div){
  

    //   const arr = []
    //      await   data.forEach(it=>{
    //             it.then( async(e) =>await arr.push(e))
    //         })

    // this.get_arr(data)
        this.arr=[]
        let bool=false
        
        for (const i of data) {
            i.then((el) => {
                if(el.symbol){
                    this.arr.push(el) 
                }
                 
                if(this.arr.length==data.length){
                    bool=true
                    return bool  
                }  
            })
            .then(e=>{
                if(e&&this.input.value.trim()){
                    if(div==this.global_ans){
                        this.curent_inf_cont.innerHTML=this.arr
                        .filter(i=>i.symbol)
                        .map(i=>
                            `
                            <div class='symbol_pers_slider'>
                                <p>${i.symbol}</p>
                                <p class='persentage'   ${red_or_green(i.profile.changesPercentage)}>
                                    (${i.profile.changesPercentage})
                                </p>
                            </div>
                            `
                        )
                        .join('')
                    }
                    console.log(this.arr);
                    div.innerHTML=this.arr
                    .filter(i=>i.symbol)
                    .map((i,index)=>this.draw_comp(i,index)).join('')
                }
            })
        }
    }
    input_time(){
        if(!this.input.value.trim()){
            this.ans.innerHTML=''
            return
        }
        let limit = 300;
        let value=this.input.value
        const interval = setInterval(()=>{
                limit -=100;
                
                if(this.input.value !== value){
                    return clearInterval(interval)
                }

                if(limit <= 0){
                    clearInterval(interval)
                    set_input_main(this.input.value)
                    window.history.pushState({},'','?'+this.input.value)
                    this.draw(this.ans)
                }
            }  
        ,100)
    }
    event_input(){
        this.input.oninput=(e)=>{
            let rg=/[a-z]{1,10}/gi
            if(!e.target.value.trim()) return
            const test = e.target.value.match(rg)
            // return 
            if(test){
                e.target.value=test[0]
                this.input_time()
            }
            else{
                eror_op('use english leng')
            
                
                this.input.value=''
            }
            }
        }
    event_button(){
        this.search.onclick=()=> {
            if(this.input.value.trim()){
            this.draw(this.global_ans)
            this.ans.innerHTML = ''
        
            }
        }
    }



    all_event(){
        this.get_item('search','ans','input','global_ans','spiner','curent_inf_cont')
        this.input.value=window.location.search.slice(1)?window.location.search.slice(1):get_input_main() 
        this.draw(this.ans)
        this.event_input()
        this.event_button()
        
    }
}
const main=new Hisrory('main')

const c_to_c=document.querySelector('.company_to_compare')
c_to_c.innerHTML=main.arr_compare.map(i=>`<p class='compare_symbol' ondblclick="deleted_symbol(this)" id='${i}'>${i}, </p>`).join('')
const i_c=document.querySelector('.imput_compare')
i_c.value=get_input_compare()
const b_c=document.querySelector('.compare')
let c_arr=['']

// for (let i=0;i<main.arr.length;i++) {
//         if(!main.arr[i].symbol){
//            main.arr= main.arr.splice(i,1)
//         }
//     }



    const limit_in = (e) => {
        const lim = e.target
        if(lim.value[0]==0){
        
           lim.value=+lim.value
        }
        if(lim.value<2){
            lim.value=2
        }
        if(lim.value>99){
            lim.value=99
        }
        if(lim.value<main.arr_compare.length){
            lim.value=main.arr_compare.length
        }
        set_input_compare(lim.value)
        
    }

    i_c.onblur=limit_in



 if(c_arr.length>i_c.value){

            // document.querySelector('.container_error').classList.remove('none')
            //     document.querySelector('.text_error').innerHTML=`<p>Too much companys to compare. Incrace value on input</p> <input type="number" value='${i_c.value}' class="imput_compare_eror">`
            //     document.querySelector('.imput_compare_eror').onblur=function(){
            //         let i=this
            //         console.log(this);
            //         if(i.value[0]==0){
            //             i.value=+i.value
            //         }
            //         if(i.value<2){
            //             i.value=2
            //         }
            //         if(i.value>99){
            //             i.value=99
            //         }
            //     }
            //     document.querySelector('.remove').onclick=()=>{
            //     i_c.value= document.querySelector('.imput_compare_eror').value
            //     document.querySelector('.container_error').classList.add('none');
            //     }
            
        }
function deleted_symbol(i) {
    i.remove();

    main.arr_compare=main.arr_compare.filter(e=>e!==i.id)
    set_arr_compare(main.arr_compare)
    document.querySelector(`.${i.id}`).disabled=false
}
function eror_close(){
    document.querySelector('.container_error').classList.add('none');
}
function eror_op(i) {
    document.querySelector('.container_error').classList.remove('none')
    document.querySelector('.text_error').innerHTML=i
    document.querySelector('.remove').onclick=()=>{
        eror_close()
    
    }
}
b_c.onclick=function(){
        open(`compare.html?companys=${c_to_c.textContent.trim()}`)
    
    } 
function log_inf(el,item){
    // console.log(item);
    

const symbol = main.arr[el].symbol

if(!main.arr_compare.find(item =>item ===symbol )&&main.arr_compare.length<i_c.value){
    main.arr_compare.push(symbol)
    set_arr_compare(main.arr_compare)
    item.disabled=true
    c_to_c.innerHTML+=`<p class='compare_symbol' ondblclick="deleted_symbol(this)" id='${symbol}'>${symbol}, </p>`



}
else if(main.arr_compare.length==i_c.value){
    eror_op(`<p>Too much companys to compare. Incrace value on input</p> <input type="number" value='${i_c.value}' class="imput_compare_eror">`)
    document.querySelector('.imput_compare_eror').onblur=e=>{
        limit_in(e)
        i_c.value= document.querySelector('.imput_compare_eror').value
        
        eror_close()
    }
}

      

}

main.draw_html()




// try{
//     lkasd.asdasdsa.asd()


// } catch(e){
//     console.log(e + 'asdasdasd');
// }
