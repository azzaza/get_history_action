let param = new URLSearchParams(window.location.search);
let symbol=param.get('symbol')
let div=document.querySelector('.company_inf_cont')
fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
.then(e=>e.ok? e.json(): Promise.reject(e))
.then(e=>{
    console.log(e);
    
    div.innerHTML=`
    <div class='company_head_cont'>
        <img src='${e.profile.image}'>
        <h2>
            ${e.profile.companyName}
        </h2>
    </div>
        <div class='price'>
            <h4>
            Stock price $${e.profile.price} 
            </h4>
            <p class='persentage' ${red_or_green(e.profile.changesPercentage)}>
            
                (${(+e?.profile?.changesPercentage).toFixed(2)})
            </p>
        </div>
        <div class='main_info'>
            <p>
            ${e.profile.description}
            </p>
        </div>
    
    `
   // document.querySelector('.persentage').style.color= e.profile.changesPercentage.slice(1).slice(0,4)>0?'green':'red'
})
fetch( `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line `)
.then(e=>e.ok? e.json(): Promise.reject(e))
.then(e=>{
    let mas=[]
    let mas_2=[]
    for (const i of e.historical) {
        mas.push(i.date)
        mas_2.push(i.close)
    }
    mas.reverse()
    mas_2.reverse()
      const data = {
        labels: mas,
        datasets: [{
          label: 'Stock price History',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: mas_2,
          fill:'start'
        }]
      };
      const config = {
        type: 'line',
        data,
        options: {
            plugins: {
                filler: {
                    propagate: true
                }
            }
        }
      };
      var myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
})