function checkUsersValid(goodUsers) {
    return function allUsersValid(submittedUsers) {
        return submittedUsers.every((user) => {
            return goodUsers.some(function(goodUser) {
                return goodUser.id === user.id;
            })
        })
    }
}

module.exports = checkUsersValid;