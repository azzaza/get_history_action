function red_or_green(str){ 
    str_style='style="color: '
    if(str=='0.0'||str=='0'||str=='(0%)') return ''
    return (str_style+ `${str.includes('-')?'red':'green'}` + '";');


}
const eror_img = (source) => {
    source.src = 'no-image.png'
}