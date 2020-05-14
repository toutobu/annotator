<template>
  <ul class="examples-list">
    <li v-for="datum in index" :key="datum.id">
      <a :href="datum.url">
        {{ datum.title }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { IndexItem } from '@/store/modules/examples';

@Component
export default class ExampleList extends Vue {
  @Prop() private index!: Array<IndexItem>;
}
</script>
