let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
}
let generateLocationMessage=(from,longi,lati)=>{
return {from,
url:`http://google.com/maps/?q=${lati},${longi}`,
createdAt:new Date().getTime()
}
}
module.exports = {
    generateMessage,
    generateLocationMessage
}