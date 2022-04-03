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

      <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-list dense nav>
            <v-list-item link v-bind="attrs" v-on="on">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Collaborate</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>


      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Enter username to add</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Username*"
                  required
                  v-model="usernameAdd"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false; addUser()"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



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
      usernameAdd: "",
      dialog: false,
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
  methods: {
      async addUser() {
          await this.$axios.post("/api/accounts/set-account", {
              token: this.$store.state.user.token,
              username: this.usernameAdd
          })
      }
  }
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
