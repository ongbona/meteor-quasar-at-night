<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"    
        :width="200"
        :breakpoint="500"
        show-if-above
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" @click="btnPush(menuItem.link)">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"/>
              </q-item-section>
              <q-item-section>{{ menuItem.label }}</q-item-section>
            </q-item>

            <q-separator v-if="menuItem.separator"/>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const menuList = [
  {
    icon: "add",
    label: "Add Item",
    link: "/add-item",
    separator: true
  },
  {
    icon: "list",
    label: "List Item",
    link: "/list-item",
    separator: true
  },
  {
    icon: "person",
    label: "Customer",
    link: "/form-customer",
    separator: true
  },
 
  {
    icon: "group",
    label: "List Customer",
    link: "/list-customer",
    separator: false
  },
  {
    icon: "list",
    label: "Invoice",
    link: "/invoice",
    separator: false
  },
  {
    icon: "report",
    label: "Report",
    link: "/report",
    separator: false
  },
  {
    icon: "search",
    label: "Search Item",
    link: "/search-item",
    separator: false
  },
  {
    icon: "person",
    label: "User",
    link: "/user-form",
    separator: false
  },
  // {
  //   icon: "feedback",
  //   label: "Send Feedback",
  //   separator: false
  // },
  // {
  //   icon: "help",
  //   iconColor: "primary",
  //   label: "Help",
  //   separator: false
  // }
];

export default {
  data() {
    return {
      drawer: true,
      menuList
    };
  },
  methods: {
    btnPush(param) {
      this.$router.push(param);
    }
  }
};
</script>