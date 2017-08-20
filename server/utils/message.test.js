const expect = require("expect");
const {generateMessage} = require("./message");

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