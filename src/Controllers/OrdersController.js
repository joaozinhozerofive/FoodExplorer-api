const knex = require ("../database/knex");
const AppError = require("../utils/AppError");


class OrdersController{
    async create(request, response){
        const user_id  = request.user.id
        const { status, totalPrice, plates} = request.body;


    
        const [order_id] = await knex("orders").insert({
            user_id, 
            totalPrice, 
            status, 
        });
    
        const cartsInsert = [];

        for (let i = 0; i < plates.length; i++) {
            const plate_id = plates[i].plate_id;
            const quantity = plates[i].quantity;
    
            const cartItem = {
                order_id : order_id, 
                user_id: user_id, 
                plate_id : plate_id, 
                quantity : quantity
            };
    
            cartsInsert.push(cartItem);
        }
    
        await knex("carts").insert(cartsInsert);
    
        response.json({
            order_id, 
            cartsInsert
        });
    }
    
    
    async index(request, response){

        const user_id = request.user.id

        // Este método index tem o objetivo de mostrar as ordems/pedidos juntamente com seus itens.

        //Aqui estou acessando todas as linhas da tabela orders que contenham o user_id enviado na requisição. 
        const orders = await knex("orders").where({user_id}).orderBy("order_id", "desc");


        //Aqui estou acessando todas as linhas da tabela carts, porém selecionando também name e price na tabela plates
        const ordersItems = await knex("carts")
      .select([
        "plates.name",
        "carts.order_id",
        "carts.quantity",
        "plates.price"
      ])
      .innerJoin("plates", "carts.plate_id", "plates.plate_id") //Aqui estou me conectando com a tabela plates e fazendo uma espécie de "where" --- .where("cars.plate_id", "plates.plate_id").

      const newData = new Date()

      // aqui estou criando uma variavel que percorre cada objeto de orders
      const ordersWithItems = orders.map(order => { //o map está percorrendo cada objeto de orders e os nomeando como order 
        const orderItem = ordersItems.filter(item => item.order_id === order.order_id )// aqui a variavel orderItem esta percorrendo cada linha da tabela carts e as nomeando como item e retornando
        //na variavel ordersWithItems estou executando uma função que separa os objetos na tabela cart que correspondem a order_id da tabela orders que esta sendo mapeado no momento
        return {
            order, 
            items: orderItem, 
            newData
        }
      })



        response.json(
            ordersWithItems
    )

    }


    async show(request, response){



        return response.json("Tudo certo!")
    }
         

}

module.exports = OrdersController;