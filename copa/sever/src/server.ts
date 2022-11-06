import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

//isso abaixo é para exibição de todas as querys que estao sendo executadas na minha api
// usamos tao somente para saber o que ta acontecendo nos nossos select's
// tecnicamente falando o prisma vai retornar o log das querys executadas no banco de dados
const prisma = new PrismaClient({
    log: ['query'],
})

//o professor comentou que como tava na versao 18 do node já poderia usar o top level await
async function bootstrap(){

    const fastify = Fastify({
        // logger é uma propriedade 
        logger: true, // o professor gosta de passar essa propriedade porque o fastify vai soltando logs
                      // de tudo que está acontecendo na nossa aplicação se der algum erro, cada requisição...
    })

    await fastify.register(cors, {
        origin: true, //em produção colocamos a rota onde esta hospedada a aplicação, agr so estamos testando
    })

    // se o meu enderço base da aplicação é localhost:3333/pools/count (o que vem depois da barra é a rota que estou criando)
    fastify.get('/pools/count', async () => {
        //transformamos essa função numa async porque toda query no banco de dados demora a reponder
        //chamamos de promise. pegamos todo a função em volta da rota, a arrow function, e colocamos o async
        // Adicionamoso await tambem para esperar o retorno para esecutar o restante do codigo
        const count =  await prisma.pool.count()

        return { count }
    })
    //achei muito interessante que depois de colocar a rota ele disse, isso retorna, ou seja, o fastify tem dois parametors, um é a rota o outro é que o que vamos fazer.
    // o vamos fazer acontece dirito por uma função anonima - tambem chamada de arrow function - que nesse caso apontamos que vamos retornar algo(return)
    await fastify.listen({ port: 3333, /*host: '0.0.0.0' */}) // passo a porta que eu quero minha aplicação executando
    // o host'o.o.o' é pra aplicação moble
}

bootstrap()