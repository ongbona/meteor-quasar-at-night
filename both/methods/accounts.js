
import { Meteor } from 'meteor/meteor';

import {Accounts} from 'meteor/accounts-base'
  Meteor.methods({
   insertUser(user){
      if(Meteor.isServer){
         const userId = Accounts.createUser({
            username: user.username,
            email: user.email,
            password: user.password,
            profile: {
              telephone:user.phone,
              name: user.username,
            },
          })
          return userId
      }

    },
    findUser(user){
       if (Meteor.isServer) {
        const data=  Accounts.findUserByUsername(user.username)
        console.log(data); 
        return data;      
       }
    },
    // loginByPassword(user) {
    //   return new Promise((resolve, reject) => {
    //     Meteor.loginWithPassword(user.username, user.password, error => {
    //       if (error) {
    //         reject(error)
    //       } else {
    //         resolve('success')
    //       }
    //     })
    //   })
  
    // }
  })