<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 pb-2"
    v-if="$attrs.data"
  >
    <div style="opacity: 0.7; font-weight: 300">
      {{ $attrs.data.from }}-{{ $attrs.data.to }}
      {{ $attrs.ammount ? $attrs.ammount : "data" }} dari total
      {{ $attrs.data.total }} {{ $attrs.ammount ? $attrs.ammount : "data" }}
    </div>
    <div class="d-flex align-items-center mt-2 mt-md-0">
      <div v-for="(item, id) in $attrs.data.links" :key="id">
        <div
          :class="`p-1 rounded-2 ${
            $attrs.data.links[0].url
              ? 'bg-info-1 pointer'
              : 'bg-light text-dark'
          } me-1 d-flex align-items-center justify-content-center`"
          @click="navigationUrl($attrs.data.links[0].url)"
          v-if="id == 0"
        >
          <i class="fas fa-chevron-left"></i>
        </div>
        <div
          :class="`p-1 rounded-2 ${
            $attrs.data.links[$attrs.data.links.length - 1].url
              ? 'bg-info-1 pointer'
              : 'bg-light text-dark'
          } ms-1 d-flex align-items-center justify-content-center`"
          v-else-if="id == $attrs.data.links.length - 1"
          @click="
            navigationUrl($attrs.data.links[$attrs.data.links.length - 1].url)
          "
        >
          <i class="fas fa-chevron-right"></i>
        </div>
        <div class="d-flex align-items-center" v-else>
          <div
            :class="`p-1 rounded-2 px-1 mx-1 fw-bold ${
              item.active ? 'text-info-1' : 'text-secondary pointer'
            }`"
            @click="navigationUrl(item.url)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigationUrl(url) {
      this.$attrs.function(url);
    },
  },
};
</script>
