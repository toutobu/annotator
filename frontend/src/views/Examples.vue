<template>
  <div class="examples">
  </div>
</template>

<script>
export default {
  name: 'Examples',

  mounted() {
    this.$store.dispatch('examples/index');
  },
};
</script>
