const knex = require ("../database/knex");
const AppError = require("../utils/AppError");


class OrdersController{
    async create(request, response){
        const user_id  = request.user.id
        const { status, totalPrice, plates, quantity } = request.body;
    
        const [order_id] = await knex("orders").insert({
            user_id, 
            totalPrice, 
            status
        });
    
        const cartsInsert = [];

        for (let i = 0; i < plates.length; i++) {
            const plate_id = plates[i];
            const quant = quantity[i];
    
            const cartItem = {
                plate_id,
                user_id,
                order_id,
                quantity: quant
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
        const orders = await knex("orders").where({user_id});

        //Aqui estou acessando todas as linhas da tabela carts, porém selecionando também name na tabela plates
        const ordersItems = await knex("carts")
      .select([
        "plates.name",
        "carts.order_id",
        "carts.quantity",
        "plates.price"
      ])
      .innerJoin("plates", "carts.plate_id", "plates.plate_id"); //Aqui estou juntando a tabela plates e carts através do plate_id, desta forma seleciono plates.name e plates.price em que o plate_id esteja contido na tabela carts.


      // aqui estou criando uma variavel que percorre cada objeto de orders
      const ordersWithItems = orders.map(order => { //o map está percorrendo cada objeto de orders e os nomeando como order 
        const orderItem = ordersItems.filter(item => item.order_id === order.order_id )// aqui a variavel orderItem esta percorrendo cada linha da tabela carts e as nomeando como item e retornando
        //na variavel ordersWithItems estou executando uma função que separa os objetos na tabela cart que correspondem a order_id da tabela orders que esta sendo mapeado no momento
        return {
            order, 
            items: orderItem
        }
      })

      //obs: map é um loop que percorre cada um dos objetos/elementos de um array até que os mesmos acabem


        response.json({
            ordersWithItems
        })

    }


    async show(request, response){



        return response.json("Tudo certo!")
    }
         

}

module.exports = OrdersController;