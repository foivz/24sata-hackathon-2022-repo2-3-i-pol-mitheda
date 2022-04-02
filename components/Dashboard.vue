<template>
    <div class="flex">
        <!-- sidebar -->
        <aside :class="{sidebar: true, expanded: sidebarExpanded}" aria-label="Sidebar">
            <v-icon class="openSidebar" @click="sidebarExpanded = !sidebarExpanded">mdi-menu</v-icon>
           <NuxtLink to="/expenses" class="sidebar-btn">
                <span class="sidebarIco">
                    <v-icon color="white">mdi-cash</v-icon>
                </span>
                <span class="sidebar-text">Expenses</span>
           </NuxtLink>
        </aside>
        <DoughnutChart />
    </div>
</template>

<script>
export default {
  data: function() {
      return {
          sidebarExpanded: true
      }
   
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.sidebar {
    width: 250px;
    background: #fff;
    height: 100vh;
    box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);

    transition: width .3s linear;

    .openSidebar {
        float: right;
        margin: 10px;
    }
}


.sidebar {
    &.expanded {
        width: 50px;
        .sidebar-text {
            display: none;
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