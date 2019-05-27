
import { Meteor } from 'meteor/meteor';
import Invoice from '../collection/invoices'
  Meteor.methods({
    findInvoiceById(id){
      return Invoice.findOne(id)
    },
    insertInvoice(doc){
      return Invoice.insert(doc)
    },
    findInvoice(){
      if(Meteor.isServer){
        let data=Invoice.aggregate(
          [
              {
                  $unwind: '$items'
              },
              {
                  $lookup: {
                      from: "items",
                      localField: "items.itemId",
                      foreignField: "_id",
                      as: "itemDoc"
                  }
              },
              {
                  $unwind: '$itemDoc'
              },
              {
                  $lookup: {
                      from: "customers",
                      localField: "customerId",
                      foreignField: "_id",
                      as: "customerDoc"
                  }
              },
              {
                  $unwind: '$customerDoc'
              },
              {
                  $group: { 
                      _id: "$_id" ,
                      date:{
                          $last: "$date"
                      },
                      customerId:{
                          $last: "$customerId"
                      },
                      customerName:{
                          $last: "$customerDoc.name"
                      },
                      items:{
                          $addToSet:{
                              itemId:'$items.itemId',
                              itemName:'$itemDoc.name',
                              qty:'$items.qty',
                              price:'$items.price',
                              amount:'$items.amount',
                              
                          }
                      },
                      total:{
                          $sum: '$items.amount'
                      }
                      // customerName:'$customerDoc.name'
                  }
              }
      
          ]
      )
      return data;
      }
    },
    removeInvoice(id){
      return Invoice.remove({_id:id})
    },
    updateInvoice(doc){
      return Invoice.update({_id:doc._id},{$set:doc})
    }
  })