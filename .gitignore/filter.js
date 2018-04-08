function isMessage(message) {
    return message.message.length < 50;
}

function getShortMessages(messages) {
    var result = []
    messages.filter(isMessage).map((message) => {
        result.push(message.message);
    });
    return result;
}

module.exports = getShortMessages;