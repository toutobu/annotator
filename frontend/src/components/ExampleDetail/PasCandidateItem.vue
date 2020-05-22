<template>
  <li
    class="pas-candidate-item"
    :class="{ predicate: isPredicate }"
    :title="morphemes | formatMorphemeTitle"
  >{{ text | trim }}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Morpheme, UnitType } from '@/persister';
import { formatMorphemeTitle, trim } from './filters';

@Component({
  filters: {
    formatMorphemeTitle,
    trim,
  },
})
export default class MorphemeItem extends Vue {
  @Prop() text!: string;

  @Prop() unit!: string;

  @Prop() morphemes!: Array<Morpheme>;

  get isPredicate() {
    return this.unit === UnitType.PREDICATE;
  }
}
</script>

<style lang="less">
.pas-candidate-item {
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
