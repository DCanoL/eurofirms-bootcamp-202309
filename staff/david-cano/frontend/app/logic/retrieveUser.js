function retrieveUser(email){
    validateEmail(email)

    var foundUser = find(users, function (user){
        return user.email === email
    })

    //If user not found then error

    if(foundUser === undefined)
        throw new Error('Wrong credentials')

    return foundUser
}