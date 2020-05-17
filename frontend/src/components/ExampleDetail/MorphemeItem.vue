<template>
  <li
    class="morpheme-item"
    :class="{ predicate: isPredicate }"
    :title="{ pos, subpos1, originalForm } | formatMorphemeTitle"
  >{{ surface | trim }}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { formatMorphemeTitle, trim } from './filters';

@Component({
  filters: {
    formatMorphemeTitle,
    trim,
  },
})
export default class MorphemeItem extends Vue {
  @Prop() surface!: string;

  @Prop() pos!: string;

  @Prop() subpos1!: string;

  @Prop() originalForm!: string;

  get isPredicate() {
    return ['動詞', '形容詞'].indexOf(this.pos) !== -1;
  }
}
</script>

<style lang="less">
.morpheme-item {
  display: inline-block;
  padding: .1rem;
  margin: .2rem;

  &.predicate {
    background-color: #dc143c20;
    border: 1px solid #dc143c50;
    border-radius: 5%;
  }
 }
</style>
