import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://github.com/philipegomes.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id, // user que eu criei logo acima

            //declarações encadiadas criando o pool e criando e atrelando o owner
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            //sempre enviar a data com timestemp digitar no console new Date().toISOString()
            date: '2022-11-02T12:00:00.447Z',
            firstTeamCountryCode: 'DE',
            SecondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            //sempre enviar a data com timestemp digitar no console new Date().toISOString()
            date: '2022-11-03T12:00:00.447Z',
            firstTeamCountryCode: 'BR',
            SecondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    SecondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        },
    })
}

main()