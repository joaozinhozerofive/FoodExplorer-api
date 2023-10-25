const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");


class FavoritesController {

    async create(request, response){
        const {plate_id} =  request.body;
        const user_id = request.user.id;

        return response.json({user_id, plate_id});

    }


    async index(request, response){

        return response.json()
        
}

    async delete(request, response){
        
        return response.json()

    }
}

module.exports = FavoritesController;