<!-- sidebar -->
<template>
    <aside class="flex flex-col justify-between" :class="{sidebar: true, expanded: sidebarExpanded}" aria-label="Sidebar">
        <div>
            <v-icon class="openSidebar" @click="sidebarExpanded = !sidebarExpanded">mdi-menu</v-icon>
            <NuxtLink to="/" class="sidebar-btn">
                <span class="sidebarIco">
                    <v-icon color="#5b9fd1">mdi-home</v-icon>
                </span>
                <span class="sidebar-text">Dashboard</span>
            </NuxtLink>
            <NuxtLink to="/expenses" class="sidebar-btn">
                <span class="sidebarIco">
                    <v-icon color="#26870f">mdi-cash</v-icon>
                </span>
                <span class="sidebar-text">Expenses</span>
            </NuxtLink>
        </div>

        <NuxtLink to="/user" class="sidebar-btn">
            <div class="flex items-center">
                <span class="sidebarIco">
                    <v-icon color="#26870f">mdi-account</v-icon>
                </span>
                <div class="flex flex-col">
                    <p class="sidebar-text" style="margin-bottom: 0px">3 i pol luzera</p>
                    <p class="sidebar-text" style="margin-bottom: 0px">logout</p>
                </div>
            </div>
        </NuxtLink>
    </aside>
</template>

<script>
export default {
  data() {
      return {
          sidebarExpanded: true
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