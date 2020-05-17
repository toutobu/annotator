<template>
  <li
    class="morpheme-item"
    :class="{ predicate: isPredicate }"
  >
    {{ surface }}
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
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
  display: inline;
  padding: .5rem;
  margin: .3rem;
  line-height: 2rem;

  &.predicate {
    background-color: #dc143c30;
  }
 }
</style>
