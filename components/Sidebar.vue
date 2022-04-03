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
        <v-list-item v-for="item in items" :key="item.title" link>
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
          <span class="text-h5">User Profile</span>
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
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
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
            @click="dialog = false"
          >
            Save
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
            sidebarExpanded: true,
            items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/', color:"green darken-2" },
            { title: 'Expenses', icon: 'mdi-image', route: '/expenses', color:"red darken-2" },
            { title: 'Shopping List', icon: 'mdi-playlist-edit', route: '/shopping-list', color:"red darken-2" }
        ],
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
