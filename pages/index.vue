<template>
  <header>
    <UToggle v-model="exampleSelected" v-if="false" label="example table" />
  </header>
  <div>
    <TableComponent v-if="!exampleSelected" />
    <testFromNuxtDocsAI v-else/>
  </div>

  <!-- <MainButton :disabled="!isCalculateEnabled" :text="textMainButton" color="rgba(0, 191, 111, 1)" @click="calculate" /> -->
  <!-- <BackButton @click="handleBackButton" /> -->
  <!-- <SettingsButton @click="handleSettingsButton" /> -->
</template>

<script lang="ts" setup>
import TableComponent from '~/components/TableComponent.vue'
import NewTableComponent from '~/components/NewTableComponent.vue'
// import ExampleTableComponent from '~/components/ExampleTableComponent.vue'
import testFromNuxtDocsAI from '~/components/testFromNuxtDocsAI.vue'

const exampleSelected = ref(false)

</script>

<style lang="scss" scoped>

</style>
