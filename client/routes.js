
import AddItem from './page/AddItem.vue'
import ListItem from './page/ListItem.vue'
import FormCustomer from './page/FormCustomer.vue'
import ListCustomer from './page/ListCustomer.vue'
import SearchItem from './page/SearchItem.vue'
import Invoice from './page/Invoice.vue'
import Report from './reports/Report.vue'
import UserForm from './page/UserForm.vue'

import Login from './page/Login.vue'


//User
import Client from './LayoutClient.vue'
import Admin from './LayoutAdmin.vue'


const routes = [
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/client',
    component:Client,
  },
  {
    path:'/admin',
    component:Admin,
  },
  {
    path:'/user-form',
    component:UserForm,
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: Invoice
  },
  {
    path: '/add-item',
    name: 'itemForm',
    component: AddItem
  },
  {
    path: '/form-customer',
    name: 'customerForm',
    component: FormCustomer
  },
  {
    path: '/list-item',
    name: 'listItem',
    component: ListItem
  },
  {
    path: '/list-customer',
    name: 'listCustomer',
    component: ListCustomer
  },
  {
    path: '/search-item',
    name: 'searchItem',
    component: SearchItem
  }
]
export default routes