
let them_b=document.querySelector('.them_button')




// let body=document.querySelector('body')
// let them_col=get_theme_val()
// const b_m_span=document.querySelector('.menu_opt')

// const change_body = () => {
//     document.body.classList.toggle('black')
//     // b_m_span.classList.toggle('black')

// }

// function them_ch() {
//     if(them_col=='white'){
//         body.classList.add('black')
        
//         document.querySelector('.right_men').classList.add('black')



//          them_b.textContent='White'
//         them_col='black'
//         set_theme_val('white')
//         return
//     }
//     console.log(them_col);
//     if(them_col=='black'){
//         body.classList.remove('black')
//         b_m_span.classList.remove('black')
//         document.querySelector('.right_men').classList.remove('black')
        
//         them_b.textContent='Black'
//         them_col='white'
//         set_theme_val('black')
//         return
//     }
// }
// // them_ch()
// change_body()
them_b.addEventListener('click',e=>{
    document.body.classList.toggle('black')
    set_theme_val(document.body.className)
   
})