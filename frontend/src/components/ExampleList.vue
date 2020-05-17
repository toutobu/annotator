<template>
  <ul class="examples-list">
    <router-link
      v-for="datum in index"
      :key="datum.id"
      :to="{ name: 'AnnotationEditor', params: { id: datum.id } }"
      tag="li"
    >
      <a>{{ datum.title }}</a>
    </router-link>
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
