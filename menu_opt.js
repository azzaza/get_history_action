const button_men=document.querySelector('.menu_opt')
const b_slider=document.querySelector('.dis_slider')
button_men.onclick=()=>{
    document.querySelector('.right_men').classList.toggle('active')
    
    button_men.classList.toggle('active')
    
    
    
}

if(b_slider){
    b_slider.onclick=()=>{
        main.curent_inf_cont.classList.toggle('active')
    }
    
}

// try {

    
    
// } catch(e){

// }
