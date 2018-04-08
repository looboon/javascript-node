function loadUsers(userIds, load, done) {
    var users = []
    for (var i = 0; i < userIds.length; i++) {
      var result = load(userIds[i], (result) => {
          return callback(result);
      })
      users.push(result);
    }
    return users
  }

module.exports = loadUsers;