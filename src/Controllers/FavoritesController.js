const knex = require("../database/knex/index");
const AppError = require("../utils/AppError");


class FavoritesController {

    async create(request, response){
        const {plate_id} =  request.params;
        const user_id = request.user.id;

        const checkFavoriteExist = await knex("favorites").where({plate_id, user_id}).first();

        const plates = await knex("plates").where({plate_id})


        if (plates < 1){
           throw new AppError ("Prato não encontrado.")
        }
        
        if(checkFavoriteExist){ 
            throw new AppError("Este prato já foi adicionado aos seus favoritos.")
        }

        

        


            const [fav_id] = await knex("favorites").insert({
                plate_id,
                 user_id
            
            })


        return response.json(fav_id);

    }


    async index(request, response){
        const user_id = request.user.id;


        const favorites =  await knex("favorites").where({user_id})

        const plate_id = favorites.map(plate => plate.plate_id)

        const plates = await knex("plates").whereIn("plate_id", plate_id)

        return response.json(plates)
        
}

    async delete(request, response){
        const {plate_id} =  request.params;
        const user_id = request.user.id;

        const favorites = await knex("favorites").where({plate_id, user_id}).first();

        if (!favorites){
           throw new AppError ("Favorito não encontrado.")
       }

        await knex("favorites").where({plate_id, user_id}).first().delete();
        

        return response.json(favorites)
    }
}

module.exports = FavoritesController;