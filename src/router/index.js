import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          name:"login",
          path:"/login",
          component:()=>import("@/views/Login")
      },{
          // name:"indexs",
          path:"/",
          component:()=>import("@/views/Index"),
          children:[
              {
                  name:"home",
                  path:"/",
                  component:()=>import("@/views/Home")
              },
              {
                  name:"order",
                  path:"/order",
                  component:()=>import("@/views/Order")
              },
              {
                  name:"my",
                  path:"/my",
                  component:()=>import("@/views/My")
              }
          ]
      },{
          name:"search",
          component:()=>import("@/views/Search"),
          path:"/search"
      },
      {
          name:"location",
          component:()=>import("@/views/Location"),
          path:"/location"
      },
      {
          name:"shop",
          path:"/shop",
          component:()=>import("@/views/Shop")
      },{
          name:"shopType",
          path:"/shopType/:id",
          component:()=>import("@/views/ShopType")
      }

  ]
})
