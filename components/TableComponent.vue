<template>
  <div class="table-container">
    <!-- <UButton @click="addRow">Добавить строку</UButton> -->
    <UTable :rows="rows" :columns="columns" :loading="loading" @update:model-value="handleUpdate">
      <template #id-header>
        <UButton @click="addRow">Д</UButton>
        <UButton @click="delRow">У</UButton>
        <UButton @click="test">Т</UButton>
      </template>
      <template #name-data="{ row, column }">
        <!-- <div v-if="column.key === 'id'">{{ row.id }}</div> -->
        <UInput v-model="row[column.key]" :error="errors[row.id]?.[column.key]"
          @blur="validateField(row, column.key)" @input="debouncedSave" />
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
const { ref, computed, onMounted } = await import('vue')
const { useWebAppPopup } = await import('vue-tg')
const { showAlert } = useWebAppPopup()

interface Row {
  id: number
  name: string
  rate: number
  amount: number
}

const rows = ref<Row[]>([])
const errors = ref<Record<number, Record<string, string>>>({})
const loading = ref(false)

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Имя' },
  { key: 'rate', label: 'Коэф', default: 1.0 },
  { key: 'amount', label: 'Сумма', default: 0 }
]

// Загрузка данных из localStorage
onMounted(() => {
  try {
    const savedRows = localStorage.getItem('tableRows')
    if (savedRows) {
      rows.value = JSON.parse(savedRows)
    }
  } catch (error) {
    showAlert('Ошибка загрузки данных из localStorage')
  }
})

// Добавление новой строки
const addRow = () => {
  const newRow: Row = {
    id: rows.value.length + 1,
    name: '',
    rate: columns.find(i => i.key === 'rate')?.default as number,
    amount: columns.find(i => i.key === 'amount')?.default as number,
  }
  rows.value.push(newRow)
  saveData()
}

const delRow = () => {
  rows.value.pop()
  saveData()
}

const test = () => {
  console.log(rows.value)
}

// Валидация поля
const validateField = (row: Row, field: string) => {
  // const errorMessages: Record<string, string> = {}

  // if (field === 'name' && (row.name.length < 3 || row.name.length > 50)) {
  //   errorMessages.name = 'Имя должно содержать от 3 до 50 символов'
  // }

  // if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
  //   errorMessages.email = 'Некорректный формат email'
  // }

  // if (field === 'phone' && row.phone && !/^\+7\d{10}$/.test(row.phone)) {
  //   errorMessages.phone = 'Некорректный формат телефона'
  // }

  // errors.value[row.id] = { ...errors.value[row.id], ...errorMessages }
}

// Сохранение данных с debouncing
let debounceTimer: ReturnType<typeof setTimeout>
const debouncedSave = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(saveData, 500)
}

// Сохранение данных в localStorage
const saveData = () => {
  try {
    localStorage.setItem('tableRows', JSON.stringify(rows.value))
    console.log('Данные сохранены:', rows.value)
  } catch (error) {
    showAlert('Ошибка сохранения данных в localStorage')
  }
}

// Обработка обновления данных в таблице
const handleUpdate = (updatedRows: Row[]) => {
  rows.value = updatedRows
  debouncedSave()
}
</script>

<style lang="scss" scoped>
.table-container {
  // padding: 3px;
  min-width: 700px;
  overflow-x: auto;

  .u-table {
    // width: 100%;
    // border-collapse: collapse;

    th,
    td {
      padding: 4px;
      border: 1px solid #afb918;
    }

    .u-input {
      width: 100%;
    }
  }

  // .u-button {
  //   margin-bottom: 16px;
  // }
}
</style>