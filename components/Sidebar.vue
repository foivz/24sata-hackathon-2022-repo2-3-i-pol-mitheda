<!-- sidebar -->
<template>
    <aside class="flex-initial flex-col justify-between" :class="{sidebar: true, expanded: sidebarExpanded}" aria-label="Sidebar">
        <div>
            <v-icon class="openSidebar" @click="sidebarExpanded = !sidebarExpanded">mdi-menu</v-icon>
        </div>
         <v-list-item v-show="sidebarExpanded">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{$nuxt.$route.name}}
            </v-list-item-title>
            <!-- <v-list-item-subtitle>
              Logged in as: {{$store.state.user}}
            </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
  
        <v-divider></v-divider>
        <v-list
            class="mt-8"
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
           <NuxtLink :to="item.route" class="flex w-full">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
        
                    <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </NuxtLink>
            
          </v-list-item>
        </v-list>
    </aside>
</template>

<script>
export default {
  data() {
      return {
          sidebarExpanded: true,
          items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
            { title: 'Expenses', icon: 'mdi-image', route: '/expenses' },
            { title: 'Settings', icon: 'mdi-account', route: '/user' },
        ],
      }
   
  }
};
</script>

<style lang="scss">
.sidebar {
    background: #fff;
    height: 100vh;
    box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);

    transition: width .3s linear;

    .openSidebar {
        float: right;
        margin: 10px;
    }

    width: 50px;

    .sidebar-btn {
        white-space: normal;
    }
    .sidebar-text {
        display: none;
        vertical-align: middle;
    }

    .sidebarIco {
        vertical-align: middle;
    }

}


.sidebar {
    &.expanded {
        width: 250px;

        .sidebar-btn {
            white-space: nowrap;
        }
        .sidebar-text {
            display: inline;
        }
    }
    
}
.sidebar-btn {
    display: block;
    text-align: left;
    font-family: "Open Sans";
    padding: 10px 15px;
    


    .sidebarIco {
        color: #fff;
        margin-right: 5px;
        display: inline-block;
        width: 28px;
    }
}
</style>