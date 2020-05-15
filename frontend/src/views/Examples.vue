<template>
  <div class="examples">
    <example-list :index="index">
    </example-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import ExampleList from '@/components/ExampleList.vue';
import { IndexItem } from '@/store/modules/examples';

const examples = namespace('examples');

@Component({
  components: {
    ExampleList,
  },
})
export default class Examples extends Vue {
  @examples.State index?: Array<IndexItem>;

  async mounted() {
    this.$store.dispatch('examples/index');
  }
}
</script>
