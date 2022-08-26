<template>
  <v-menu right offset-x open-on-hover :rounded="false" nudge-width="200px" close-on-content-click close-delay="50"
    nudge-right="5" :disabled="!mini">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item :to="'/' + item.path" v-on="on" class="sidebar-item py-1">
        <v-icon v-bind="attrs" v-text="item.icon" />
        <div class="font-weight-medium pl-3" :class="classTitle ? classTitle : 'text-body-2 '" v-text="item.name" />
      </v-list-item>
    </template>
    <v-card tile class="ml-1">
      <v-list>
        <v-list-item dense :to="item.path">
          <div class="font-weight-medium text-body-2 pr-4" v-text="item.name" />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    classTitle: String,
    mini: Boolean,
    item: { required: true, type: Object },
  },
};
</script>
<style lang="scss">
</style>
