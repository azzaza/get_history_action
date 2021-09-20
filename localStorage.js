const set_input_compare = (i)=>{
    localStorage.setItem('i_compare_val',i)
}
const get_input_compare=()=>{
    return localStorage.getItem('i_compare_val')?localStorage.getItem('i_compare_val'):4
}
const set_arr_compare=(i)=>{
    localStorage.setItem('arr_compare_',JSON.stringify(i))
}
const get_arr_compare=()=>{
    return localStorage.getItem('arr_compare_')?JSON.parse(localStorage.getItem('arr_compare_')):[]
}
const set_input_main = (i)=>{
    localStorage.setItem('i_main_val',i)
}
const get_input_main=()=>{
    return localStorage.getItem('i_main_val')?localStorage.getItem('i_main_val'):''
}
const set_theme_val=(i)=>{
    localStorage.setItem('them',i)
}
const get_theme_val=()=>{
    localStorage.getItem('them')
        &&document.body.classList.toggle( localStorage.getItem('them'))
}

get_theme_val()