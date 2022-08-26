<template>
  <v-menu right offset-x v-if="mini" open-on-hover :rounded="false" nudge-width="200px" close-on-content-click
    close-delay="50" nudge-right="5">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-on="on" link inactive :ripple="false" class="sidebar-item">
        <v-list-item-icon>
          <v-icon v-bind="attrs" v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <div class="text-body-2 font-weight-medium" v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card tile>
      <v-list-item dense class="indigo" dark>
        <v-list-item-content>
          <div class="text-body-2 text-truncate" v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="subItem in children" :key="subItem.name" :to="subItem.path" :title="subItem.name"
        class="sidebar-item ">
        <v-icon size="20" v-text="subItem.icon"></v-icon>
        <div class="text-body-2 font-weight-medium pl-4 pr-4" v-text="subItem.name" />
      </v-list-item>
    </v-card>
  </v-menu>
  <v-list-group v-model="p_model" no-action :to="item.path" v-else class="sidebar-item">
    <template v-if="item.icon" #appendIcon>
      <v-icon>
        {{ p_model ? 'mdi-menu-up' : 'mdi-menu-down' }}
      </v-icon>
    </template>

    <template v-slot:activator>
      <v-list-item-content>
        <v-layout align-center class="py-1">
          <v-icon v-text="item.icon" />
          <div class="font-weight-medium text-body-2 pl-3" v-text="item.name" style="flex: 1" />
        </v-layout>
      </v-list-item-content>
    </template>

    <v-list-item v-for="subItem in children" :key="subItem.name" :to="subItem.path" :title="subItem.name"
      class="pl-7 sidebar-item" dense>
      <v-icon size="20" v-text="subItem.icon"></v-icon>
      <div class="font-weight-medium text-body-2 pl-4" v-text="subItem.name" />
    </v-list-item>
  </v-list-group>
</template>

<script>
export default {
  data: () => ({ p_model: false }),
  watch: {
    item: {
      handler(value) {
        this.p_model = value.model
      },
      immediate: true,
    }
  },
  props: {
    mini: Boolean,
    item: { required: true, type: Object },
    children: { required: true, type: Array },
  },
};
</script>

