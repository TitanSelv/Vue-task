

<template>
  <header>
    <h1 class="header_h1">
      Таблица заявок
    </h1>
  </header>
  <div id="app">
    <LeadsTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeadsTable from './components/LeadTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    LeadsTable,
  },
});
</script>

<style>
/* Добавьте стили по необходимости */
</style>