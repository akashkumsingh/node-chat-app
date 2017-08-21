const expect = require("expect");
const {generateMessage,generateLocationMessage} = require("./message");

describe("generate Message", () => {
    it("should generate new messages", () => {
        let from = "Admin";
        let text = "Hi there";
        let message = generateMessage(from, text);
        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({
            from,
            text
        });
    });
});
describe("generateLocationMsg",()=>{
    it("should generate location",()=>{
        let from="Admin";
        let longi="1";
        let lati="1";
        let url="http://google.com/maps/?q=1,1"
        let message=generateLocationMessage(from,longi,lati);
        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({
            from,
            url
        })

    })
})