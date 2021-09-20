let param = new URLSearchParams(window.location.search);
let companys=param.get('companys').split(',')
const compare=document.querySelector('.compare')
companys.length=companys.length-1
let arr=[]
Promise.all(companys.map(element => fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${element}`)))
.then(all_data =>
    all_data.map(e => e.ok ? e.json() : Promise.reject(e))
)
.then(e=>{
    get_all_symbol(e,compare)
})
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
               
                if(e){
                    compare.innerHTML=
                    arr.map(i=>{
                        return`
                        <div class='compare_cont'>
                            <p class='name'>
                                ${i.profile.companyName}
                            </p>
                            <img src='${i.profile.image}' onerror="eror_img(this)">
                            <p>
                                ${i.symbol}
                            </p>
                            <p class='persentage'   ${red_or_green(i.profile.changesPercentage)}>
                                (${i.profile.changesPercentage})
                            </p>
                            <p>
                                ${i.profile.price}$
                            </p>
                        </div>
                        
                        
                        `
                    })
                    .join('')
                }
            })
        }
}