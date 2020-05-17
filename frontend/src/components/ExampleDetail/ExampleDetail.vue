<template>
  <div class="example-detail">
    <h3 class="example-detail__title">
      {{ title }}
    </h3>
    <ul class="morphemes-container">
      <li
        v-for="(morpheme, index) in morphemes"
        is="morpheme-item"
        :key="index"
        :surface="morpheme.surface"
        :pos="morpheme.pos"
        :subpos1="morpheme.subpos1"
        :originalForm="morpheme.originalForm"
      >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Morpheme } from '@/persister';
import MorphemeItem from './MorphemeItem.vue';

@Component({
  components: {
    MorphemeItem,
  },
})
export default class ExampleDetail extends Vue {
  @Prop() id!: number;

  @Prop() title!: string;

  @Prop() content!: string;

  @Prop() morphemes!: Array<Morpheme>;
}
</script>

<style lang="less">
.morphemes-container {
  text-align: start;
}
</style>
