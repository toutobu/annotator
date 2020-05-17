<template>
  <div class="annotation-editor">
    <example-detail
      :id="current.id"
      :title="current.title"
      :content="current.content"
      :morphemes="current.morphemes"
    >
    </example-detail>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import ExampleDetail from '@/components/ExampleDetail';
import { CurrentExample } from '@/store/modules/examples';

const examples = namespace('examples');

@Component({
  components: {
    ExampleDetail,
  },
})
export default class AnnotationEditor extends Vue {
  @examples.State current!: CurrentExample;

  mounted() {
    this.$store.dispatch('examples/retrieve', { id: this.$route.params.id });
  }
}
</script>
