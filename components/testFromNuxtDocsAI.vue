<script setup lang="ts">
import { ref, computed } from 'vue'

interface TableRow {
  internalId: number
  name: string
  amount: number | null
}

const rows = ref<TableRow[]>([])
let nextInternalId = 1

const columns = [
  {
    key: 'id',
    label: '#',
    sortable: false
  },
  {
    key: 'name',
    label: 'Имя',
    sortable: true
  },
  {
    key: 'amount',
    label: 'Сумма',
    sortable: true
  }
]

const sort = ref<{ column: string; direction: 'asc' | 'desc' }>({ column: '', direction: 'asc' })

const addRow = () => {
  rows.value.push({
    internalId: nextInternalId++,
    name: '',
    amount: null
  })
}

const updateName = (row: TableRow, newValue: string) => {
  const index = rows.value.findIndex(r => r.internalId === row.internalId)
  if (index !== -1) {
    rows.value[index].name = newValue
  }
}

const updateAmount = (row: TableRow, newValue: string) => {
  const parsedValue = parseFloat(newValue.replace(',', '.'))
  const index = rows.value.findIndex(r => r.internalId === row.internalId)
  if (index !== -1) {
    rows.value[index].amount = isNaN(parsedValue) ? null : parsedValue
  }
}

const formatAmount = (value: number | null): string => {
  return value !== null ? value.toString().replace('.', ',') : ''
}
const sortedRows = computed(() => {
  let sortedRows = [...rows.value]
  if (sort.value.column) {
    sortedRows.sort((a, b) => {
      const aValue = a[sort.value.column as keyof TableRow]
      const bValue = b[sort.value.column as keyof TableRow]
      if (aValue !== null && bValue !== null && aValue < bValue) return sort.value.direction === 'asc' ? -1 : 1
      if (aValue !== null && bValue !== null && aValue > bValue) return sort.value.direction === 'asc' ? 1 : -1
      return 0
    })
  }
  return sortedRows.map((row, index) => ({
    ...row,
    id: index + 1
  }))
})
</script>

<template>
  <div>
    <UButton @click="addRow">Добавить строку</UButton>
    <UTable :rows="sortedRows" :columns="columns" v-model:sort="sort">
      <template #id-data="{ row }">
        {{ row.id }}
      </template>
      <template #name-data="{ row }">
        <UInput
          v-model="row.name"
          placeholder="Введите имя"
          @change="updateName(row, $event)"
          required
        />
      </template>
      <template #amount-data="{ row }">
        <UInput
          v-model="row.amount"
          placeholder="Введите сумму"
          @change="updateAmount(row, $event)"
          :formatter="formatAmount"
        />
      </template>
    </UTable>
  </div>
</template>