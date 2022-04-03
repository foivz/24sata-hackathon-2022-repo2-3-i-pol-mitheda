<template>
  <v-card>
    <v-navigation-drawer permanent expand-on-hover>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ $nuxt.$route.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Logged in as: {{ userName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item class="my-2" v-for="item in items" :key="item.title" link>
          <NuxtLink :to="item.route" class="flex w-full">
            <v-list-item-icon>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </NuxtLink>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <NuxtLink to="/logout">
          <v-list dense nav>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </NuxtLink>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  computed: {
    userName() {
      return (
        this.$store.state.user.userObj?.accessToken?.payload?.username ??
        "ERROR"
      );
    },
  },
  data() {
    return {
      sidebarExpanded: true,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/",
          color: "green darken-2",
        },
        {
          title: "Expenses",
          icon: "mdi-image",
          route: "/expenses",
          color: "red darken-2",
        },
        {
          title: "Shopping List",
          icon: "mdi-playlist-edit",
          route: "/shopping-list",
          color: "blue darken-2",
        },
        {
          title: "Listing",
          icon: "mdi-paperclip",
          route: "/listing",
          color: "purple darken-2",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.sidebar {
  position: relative;
  background: #fff;
  height: 100vh;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);

  transition: width 0.3s linear;

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

  .sidebarBottom {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
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
