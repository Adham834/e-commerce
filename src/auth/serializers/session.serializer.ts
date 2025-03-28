// import { Injectable } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import passport from 'passport';

// declare global {
//   namespace passport {
//     interface initializeOptions {
//       userProperty?: 'userId';
//     }
//   }
// }

// @Injectable()
// export class SessionSerializer extends PassportSerializer {
//   serializeUser(user: any, done: Function) {
//     done(null, { id: user.id });
//   }

//   deserializeUser(payload: any, done: Function) {
//     done(null, payload);
//   }
// }
