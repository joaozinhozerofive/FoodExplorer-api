const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const {hash} = require("bcryptjs")

class UsersController{

    async create(request, response){
        const {name, email, password } = request.body;
        
        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])


        if(checkUserExists){
            throw new AppError ("Este e-mail já está em uso")
        }


        const hashedPassword = await hash(password, 8)


       const user =  await database.run("INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, 0]);
        

        return response.status(201).json();
}
}

module.exports = UsersController


