<template>
  <div class="example-detail">
    <h3 class="example-detail__title">
      {{ title }}
    </h3>
    <ul class="pas-candidates-container">
      <li
        v-for="(pascandidate, index) in pascandidates"
        is="pas-candidate-item"
        :key="index"
        :text="pascandidate.text"
        :unit="pascandidate.unit"
        :morphemes="pascandidate.morphemes"
      >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { PASCandidate } from '@/persister';
import PasCandidateItem from './PasCandidateItem.vue';

@Component({
  components: {
    PasCandidateItem,
  },
})
export default class ExampleDetail extends Vue {
  @Prop() id!: number;

  @Prop() title!: string;

  @Prop() content!: string;

  @Prop() pascandidates!: Array<PASCandidate>;
}
</script>

<style lang="less">
.pas-candidates-container {
  text-align: start;
}
</style>
