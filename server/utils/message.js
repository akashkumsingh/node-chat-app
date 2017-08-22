const moment=require("moment");
let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}
let generateLocationMessage=(from,longi,lati)=>{
return {
    from,
    url:`http://google.com/maps/?q=${lati},${longi}`,
    createdAt:moment().valueOf()
}
}
module.exports = {generateMessage,generateLocationMessage}