const search = document.querySelector('.search')
const inp = document.querySelector('.input')
const ans = document.querySelector('.ans')
const global_ans = document.querySelector('.global_ans')
const spiner = document.querySelector('.spiner')
const curent_inf_cont= document.querySelector('.curent_inf_cont')
let arr=[]
const eror_img = (source) => {
    source.src = 'no-image.png'
}
const draw = (div) => {
    div.innerHTML = ''
    const current_ans = []
    spiner.innerHTML = '<img class="load" src="loading-icon-transparent-background-12.gif">'
    //spiner style
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inp.value.trim().toUpperCase()}&limit=10&exchange=NASDAQ`)
        .then(e => e.ok ? e.json() : Promise.reject(e))
        .then(e => {
            if(e.length==0){
                document.querySelector('.eror').classList.add('active')
                document.querySelector('.remove').addEventListener('click',()=>{
                document.querySelector('.eror').classList.remove('active');
                })
                inp.value=''
            }
            Promise.all(e.map(element => fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${element.symbol}`)))
                .then(all_data =>
                    all_data.map(e => e.ok ? e.json() : Promise.reject(e))
                )
                .then(e=>{
                  get_all_symbol(e,div)
                })
                .finally(()=>{

                    document.querySelector('.load').remove()
                })

        

            })
            
}
function draw_comp(el,i){
    // console.log(el);
         return `
    <div class='company_cont'>
        <img src='${el?.profile?.image}' onerror="eror_img(this)">
        <p class='name_comp'>
            <a href='company.html?symbol=${el?.symbol}'>${el?.profile?.companyName}</a>
        </p>
        <div class='symbol_pers'>
            <p>(${el?.symbol})</p>
            <p class='persentage'   ${red_or_green(el?.profile?.changesPercentage)}>
                ${el?.profile?.changesPercentage}
            </p>
        </div>
        <button class='info' id='${i}' onclick='log_inf(${i})'>
            Log info
        </button>
    </div>
    `
   
}
function log_inf(el){
    console.log(arr[el]);
}

function get_all_symbol(data,div){
    arr=[]
    let bool=false
    for (const i of data) {
        i.then((el) => {
            arr.push(el)  
            if(arr.length==data.length){
                bool=true
                return bool  
            }  
                            
        })
        .then(e=>{
            
            if(e&&inp.value.trim()){
                if(div==global_ans){
                    curent_inf_cont.innerHTML=arr
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
                div.innerHTML=arr
                .filter(i=>i.symbol)
                .map((i,index)=>draw_comp(i,index)).join('')
            }
        })
    }
}

inp.addEventListener('input', e => {
    if(inp.value.trim()){
              let limit = 300
    let interval = setInterval(time, 100)
    const value = e.target.value

    function time() {
        limit -= 100

        if (value !== e.target.value) {
            return clearInterval(interval)
        }
        if (limit <= 0) {
            clearInterval(interval)
            
            draw(ans)
        }
    }  
    }
    else{
        ans.innerHTML=''
    }

})
search.addEventListener('click', e => {
    if(inp.value.trim()){
    draw(global_ans)
    ans.innerHTML = ''

    }
})
// 0:
// currency: "USD"
// exchangeShortName: "NASDAQ"
// name: "Target Hospitality Corp"
// stockExchange: "Nasdaq Capital Market"
// symbol: "TH"