const knex = require("../database/knex/index");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");


class PlatesController {
    async create(request, response){
        const {name, category, ingredients, price, description} = request.body;
        const user_id = request.user.id

        const plateImg = request.file.filename;

        const diskStorage = new DiskStorage();


        const filename = await diskStorage.saveFile(plateImg)


        const [plate_id] = await knex("plates").insert({
            name, 
            category, 
            price,
            description, 
            user_id, 
            img : filename
        })


        const ingredientsInsert = ingredients.map( name => {
            return{
                name, 
                plate_id,
                user_id
            }
        }
        )

        await knex("tags").insert(ingredientsInsert);



       return response.json({plate_id, name, category, ingredients, price, description, user_id});

    }

    async update(request, response){
        let {name, category, ingredients, price, description} = request.body;
        const {plate_id} = request.params;
        
        
        const plates = await knex("plates").where({plate_id})

        if(plates.length === 0){
            throw new AppError("Prato não encontrado")
        }

        const tags = await knex("tags").where("plate_id", plate_id)

        
            
        

        if(plates.name){plates.name = plates.name}

        if(plates.category){plates.category = plates.category}

        if(plates.price){plates.price = plates.price }

        if(plates.description){plates.description = plates.description}

        if(tags.name){tags.name = tags.name}

        


        const updatedPlates = {
            name, 
            category, 
            price, 
            description
        }
        
        await knex("plates")
        .update(updatedPlates)
        .where({plate_id})


        

        if(ingredients){

        await knex("tags")
        .where({ plate_id })
        .del();
      
        const tagData = ingredients.map((ingredient) => {
        return {
          plate_id,
          name: ingredient,
        };
      });
      
      await knex("tags").insert(tagData);
    
    }



        

        

        return response.status(200).json({plates})


    }


    async show(request, response){
        const {plate_id} = request.params;

        const plates = await knex("plates").where({plate_id});
         
        if(plates.length === 0){
            throw new AppError("Prato não encontrado")
        }

        const tags = await knex("tags").where({plate_id});


        return response.json({plates, tags})
    }



    async index(request, response){
        let {name, ingredients} = request.query;
        const dish = await knex("plates")

        let plates;

        
        plates = await knex("tags").select(
                "plates.plate_id",
                "plates.name",
                "plates.category", 
                "plates.price",
                "plates.description", 
                "plates.user_id",
                "plates.img"
                )
                .whereLike("tags.name", `%${name}%`)
                .orWhereLike("plates.name",  `%${name}%`)
                .innerJoin("plates", "plates.plate_id", "tags.plate_id")
                .groupBy("plates.name")
                .orderBy('plates.name')
        
            
            const tags = await knex("tags")
            .select(
                 "name",
                 "plate_id", 
             )


    const platesWithIngredients = plates.map(plate =>{
        const plateTags = tags.filter(tag => tag.plate_id === plate.plate_id)

        return {
            ...plate,
            plateTags
        };
    }
        
        )
        if(!name && !ingredients) {
            return response.json(dish)
        }
    
    
    return response.json(platesWithIngredients);
}
    
   




    async delete(request, response){
        const {plate_id} = request.params;

        const plates = await knex("plates").where({plate_id})

        if(plates.length === 0){
            throw new AppError("Prato não encontrado")
        }

        await knex("plates").where({plate_id}).delete();

        return response.json(plate_id);
    }
}

module.exports = PlatesController;