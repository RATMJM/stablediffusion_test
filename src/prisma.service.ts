import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Note: this is optional
    await this.$connect()
  }
}


// import { INestApplication, OnModuleInit } from "@nestjs/common";
// import { PrismaClient } from "@prisma/client";

// export class PrismaService extends PrismaClient implements OnModuleInit{
//     async onModuleInit() {
//         await this.$connect();
//     }

//     async enableShutdownHooks(app: INestApplication){
//         // this.$on('beforeExit',async () => {
//             await app.close();
//         // });
//     }
// }

