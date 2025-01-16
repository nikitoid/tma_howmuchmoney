<template>
  <UCard class="w-full" :ui="{
    base: '',
    ring: '',
    divide: 'divide-y divide-gray-200 dark:divide-gray-700',
    header: { padding: 'px-4 py-5' },
    body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
    footer: { padding: 'p-4' }
  }">
    <!-- Title -->
    <!-- <template #header>
      <h2 class="font-semibold text-center text-xl text-gray-900 dark:text-white leading-tight">
        How much money?
      </h2>
    </template> -->

    <!-- Header and Action buttons -->
    <div class="flex items-center w-full px-4 py-2">
      <!-- <div class="grid justify-stretch grid-flow-col items-center w-full px-4 py-2"> -->
      <div class="flex justify-start flex-1 text-left gap-1.5">
        <UButton icon="i-material-symbols-add-row-below-rounded" size="sm" color="primary" variant="outline"
          @click="newRow" :ui="{ rounded: 'rounded-full' }" square />
        <UButton :disabled="!isSelectedRows" icon="i-material-symbols-delete-rounded" size="sm" color="red"
          :variant="isSelectedRows ? 'outline' : 'ghost'" @click="delRow" :ui="{ rounded: 'rounded-full' }" square />
      </div>

      <div class="flex justify-center flex-1 gap-1.5">
        <UButton label="Calc" icon="i-heroicons-calculator-16-solid" variant="solid" color="sky" @click="calc" />
      </div>

      <div class="flex justify-end flex-1 gap-1.5">
        <UButton icon="i-ic-round-cloud-download" variant="soft" color="emerald" />
        <UButton icon="i-ic-round-save" variant="soft" color="yellow" />
        <!-- <USelectMenu v-model="selectedColumns" :options="excludeSelectColumn" multiple>
          <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
            Columns
          </UButton>
        </USelectMenu> -->
      </div>
    </div>

    <!-- Table -->
    <UTable v-model="selectedRows" v-model:sort="sort" :rows="rows" :columns="columnsTable"
      sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" sort-mode="manual" class="w-full"
      :ui="{
        td: { base: 'max-w-[0] truncate text-center', padding: 'px-0.5 py-1' },
        th: { padding: 'px-0.5 py-2' },
        default: { checkbox: { color: 'gray' as any } },
        checkbox: { padding: 'ps-2' }
      }">
      <template #id-data="{ row, column }">
        <UBadge :label="row[column.key]" variant="soft" size="xs" />
      </template>
      <template #name-data="{ row, column }">
        <UInput :model-value="row[column.key]" :type="column.type" variant="none"
          @blur="handleBlur(row, column.key, $event)" size="sm" :ui="{ padding: { sm: 'px-0' } }" />
      </template>
      <template #rate-data="{ row, column }">
        <UInput :model-value="row[column.key]" :type="column.type" variant="outline" min="0"
          @blur="handleBlur(row, column.key, $event)" size="2xs" :ui="{ base: 'text-center' }" />
      </template>
      <template #amount-data="{ row, column }">
        <UInput :model-value="row[column.key]" :type="column.type" variant="outline"
          @blur="handleBlur(row, column.key, $event)" :ui="{ base: 'text-center' }" />
      </template>
    </UTable>
  </UCard>
</template>

<script lang="ts" setup>
const testMode: boolean = false;

// Columns
const columns = [{
  key: 'id',
  type: 'text',
  label: '#',
  class: 'w-8 text-center'
}, {
  key: 'select',
  class: 'w-8'
}, {
  key: 'name',
  type: 'string',
  label: 'Имя',
  class: '',
  sortable: true
}, {
  key: 'rate',
  type: 'number',
  label: 'Коэф',
  class: 'w-10 text-center'
}, {
  key: 'amount',
  type: 'number',
  label: 'Суммы',
  class: 'w-24 text-center'
}];
const selectedColumns = ref(columns);
const columnsTable = computed(() => columns.filter(column => selectedColumns.value.includes(column)));
const excludeSelectColumn = computed(() => columns.filter(v => v.key !== 'select'));

// Data
interface IRow {
  id: number
  name: string
  rate: number
  amount: number
}

const rows = ref<IRow[]>([]);
const localRows = ref<Record<number, Record<string, string | number>>>({});

// Selected Rows
const selectedRows = ref<any[]>([]);
const isSelectedRows = computed(() => selectedRows.value.length > 0);

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const });

const testNames: string[] = [
  "Никита Еремин",
  "Роман Яковлев",
  "Александр Юмакин",
  "Евгений Шигаев",
  "Александр Захаров",
  "Виктория Еремина",
  "Елена Гамзаева",
  "Анастасия Рязанова",
  "Дмитриев Николай",
  "Алеев Николай",
  "Сорокин Сергей"
];
testNames.forEach(e => {
  rows.value.push({
    id: rows.value.length + 1,
    name: e,
    rate: 1,
    amount: 10000
  });
});

// Инициализация локальных значений для тестирования
rows.value.forEach(row => {
  localRows.value[row.id] = {
    id: row.id,
    name: row.name,
    rate: row.rate,
    amount: row.amount
  };
});

const handleBlur = (row: IRow, key: keyof IRow, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value: any = target.value;

  if (key === 'name') {
    // (row[key] as string) = value;
    localRows.value[row.id][key] = String(value);
  } else if (key === 'rate') {
    // (row[key] as number) = Number(value);
    localRows.value[row.id][key] = Number(value);
  } else if (key === 'amount') {
    // (row[key] as number) = Number(value);
    localRows.value[row.id][key] = Number(value);
  }
};

// Test
const test = () => {
  console.log(rows.value);
  console.log(localRows.value);
  // console.log(columnsTable);
  // console.log(selectedColumns.value);
  // console.log(selectedRows.value);
  console.log(sort.value);
};

const updateLocalValues = () => {
  // Очищаем объект
  Object.keys(localRows.value).forEach(key => delete localRows.value[Number(key)]);

  rows.value.forEach((row: IRow) => {
    localRows.value[row.id] = {
      id: row.id,
      name: row.name,
      rate: row.rate,
      amount: row.amount
    };
  });
}

const updateIds = (array: any[]): any[] => {
  return array.map((obj, index) => ({
    ...obj,
    id: index + 1, // Обновляем id, начиная с 1
  }));
}

const newRow = () => {
  const defaultValue = {
    name: '' as string,
    rate: 1 as number,
    amount: 0 as number
  };

  rows.value.push({
    id: rows.value.length + 1,
    name: defaultValue.name,
    rate: defaultValue.rate,
    amount: defaultValue.amount
  });

  updateLocalValues();
};

const delRow = () => {
  const filterArray = rows.value.filter(row => !selectedRows.value.includes(row));
  rows.value = updateIds(filterArray);
  updateLocalValues();
  selectedRows.value.length = 0;
};

const calc = () => {

};
</script>

<style lang="scss" scoped></style>