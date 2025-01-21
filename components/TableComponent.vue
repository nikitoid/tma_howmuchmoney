<template>
  <UCard class="w-full" :ui="{
    base: '',
    ring: '',
    divide: 'divide-y divide-gray-200 dark:divide-gray-700',
    header: { padding: 'px-4 py-5' },
    body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
    footer: { padding: 'p-4' }
  }">
    <!-- Header and Action buttons -->
    <div class="flex items-center w-full px-4 py-2">
      <div class="flex justify-start flex-1 text-left gap-1.5">
        <UButton icon="i-material-symbols-add-row-below-rounded" size="sm" color="primary" variant="outline"
          @click="addRow" :ui="{ rounded: 'rounded-full' }" square />
        <UButton :disabled="!isSelectedRows" icon="i-material-symbols-delete-rounded" size="sm" color="red"
          :variant="isSelectedRows ? 'outline' : 'ghost'" @click="delRow" :ui="{ rounded: 'rounded-full' }" square />
        <UButton v-if="testMode" icon="i-ic-baseline-app-settings-alt" size="sm" color="rose" variant="soft"
          @click="test" :ui="{ rounded: 'rounded-full' }" square />
      </div>

      <div class="flex justify-center flex-1 gap-1.5">
        <UButton label="Calc" icon="i-heroicons-calculator-16-solid" variant="solid" color="sky" @click="startCalc" />
      </div>

      <div class="flex justify-end flex-1 gap-1.5">
        <UButton icon="i-ic-round-cloud-download" variant="soft" color="emerald" @click="" />
        <UButton icon="i-ic-round-save" variant="soft" color="yellow" @click="" />
      </div>
    </div>

    <!-- Table -->
    <UTable v-model="selectedRows" v-model:sort="sort" :rows="sortedRows" :columns="columns"
      sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" class="w-full" :ui="{
        td: { base: 'max-w-[0] truncate text-center', padding: 'px-0.5 py-1' },
        th: { padding: 'px-0.5 py-2' },
        default: { checkbox: { color: 'gray' as any } },
        checkbox: { padding: 'ps-2' }
      }">
      <template #id-data="{ row }">
        <UBadge :label="row.id" variant="soft" size="xs" />
      </template>
      <template #name-data="{ row, column }">
        <UInput v-model="row.name" :type="column.type" variant="none" placeholder="Введите имя"
          @change="updateName(row, $event)" size="sm" :ui="{ padding: { sm: 'px-0' } }" required />
      </template>
      <template #rate-data="{ row, column }">
        <UInput v-model="row.rate" :type="column.type" variant="outline" min="0" @change="updateRate(row, $event)"
          size="2xs" :ui="{ base: 'text-center' }" required />
      </template>
      <template #amount-data="{ row, column }">
        <UInput v-model="row.amount" :type="column.type" variant="outline" placeholder="0"
          @change="updateAmount(row, $event)" :ui="{ base: 'text-center' }" required />
      </template>
    </UTable>
  </UCard>
</template>

<script lang="ts" setup>
import ResultComponent from '~/components/ResultComponent.vue'

// import { useModal } from '#imports';

const testMode: boolean = true;

const modal = useModal();

const init = () => {
  // const testNames: string[] = [
  //   "Никита Еремин",
  //   "Роман Яковлев",
  //   "Александр Юмакин",
  //   "Евгений Шигаев",
  //   "Александр Захаров",
  //   "Виктория Еремина",
  //   "Елена Гамзаева",
  //   "Анастасия Рязанова",
  //   "Дмитриев Николай",
  //   "Алеев Николай",
  //   "Сорокин Сергей"
  // ];
  // testNames.forEach(v => {
  //   rows.value.push({
  //     id: defaultValue.id.value,
  //     name: v,
  //     rate: defaultValue.rate,
  //     amount: Math.floor(Math.random() * (10000 - 100 + 1)) + 100
  //   });
  // });
};

// Columns
const columns = [{
  key: 'id',
  type: 'number',
  label: '#',
  class: 'w-8 text-center',
  sortable: false
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
  class: 'w-24 text-center',
  sortable: true
}];

// Data
interface IRow {
  id: number
  name: string
  rate: number
  amount: number | null
}
const rows = ref<IRow[]>([]);
const selectedRows = ref<IRow[]>([]);
const isSelectedRows = computed(() => selectedRows.value.length > 0);

const defaultValue = {
  id: computed(() => rows.value.length + 1),
  name: '' as string,
  rate: 1.0 as number,
  amount: null as number | null
};

const sort = ref<{ column: string; direction: 'asc' | 'desc' }>({ column: '', direction: 'asc' });
const previousSort = { column: '', direction: 'asc' };

init();

// Methods

const addRow = () => {
  rows.value.push({
    id: defaultValue.id.value,
    name: defaultValue.name,
    rate: defaultValue.rate,
    amount: defaultValue.amount
  });
};

const delRow = () => {
  selectedRows.value.forEach(row => {
    const index = rows.value.findIndex(r => r.id === row.id);
    if (index !== -1) {
      rows.value.splice(index, 1);
    }
  });
  rows.value = updateIds(rows.value);
  selectedRows.value.length = 0;
};

const updateName = (row: IRow, newValue: string) => {
  const index = rows.value.findIndex(r => r.id === row.id);
  if (index !== -1) {
    rows.value[index].name = newValue;
  }
};

const updateRate = (row: IRow, newValue: number) => {
  const parsedValue = Number(newValue);
  const index = rows.value.findIndex(r => r.id === row.id);
  if (index !== -1) {
    rows.value[index].rate = isNaN(parsedValue) ? defaultValue.rate : parsedValue;
  }
};

const updateAmount = (row: IRow, newValue: number) => {
  const parsedValue = Number(newValue);
  const index = rows.value.findIndex(r => r.id === row.id);
  if (index !== -1) {
    rows.value[index].amount = isNaN(parsedValue) ? defaultValue.amount : parsedValue;
  }
};

const sortedRows = computed(() => {
  let sortedRows = [...rows.value];
  if (sort.value.column) {
    sortedRows.sort((a, b) => {
      const aValue = a[sort.value.column as keyof IRow];
      const bValue = b[sort.value.column as keyof IRow];
      if (aValue !== null && bValue !== null && aValue < bValue) return sort.value.direction === 'asc' ? -1 : 1;
      if (aValue !== null && bValue !== null && aValue > bValue) return sort.value.direction === 'asc' ? 1 : -1;
      return 0;
    });

    if (sort.value.column !== previousSort.column || sort.value.direction !== previousSort.direction) {
      selectedRows.value.length = 0;
    }
    previousSort.column = sort.value.column;
    previousSort.direction = sort.value.direction;
  }
  return sortedRows.map((row, index) => ({
    ...row,
    id: index + 1
  }))
});

const updateIds = (array: IRow[]): IRow[] => {
  return array.map((obj, index) => ({
    ...obj,
    id: index + 1, // Обновляем id, начиная с 1
  }));
};

const startCalc = () => {
  const resultCalc = calculate(rows.value);
  console.log('resultCalc', resultCalc);
  const resultCalcSorted = resultCalc.sort((a, b) => a.from.localeCompare(b.from));
  console.log('resultCalcSorted', resultCalcSorted);
  const sumResult = resultCalc.reduce((sum, row) => sum + row.amount, 0);
  console.log('sumResult:', sumResult);
  openModal(resultCalcSorted);
};

const calculate = (array: IRow[]) => {
  const transactions: { from: string; to: string; amount: number }[] = [];
  const totalAmount = array.reduce((sum, row) => sum + (row.amount || 0), 0);
  const averageAmount = totalAmount / array.length;

  console.log('totalAmount:', totalAmount);

  const balances = array.map(row => ({
    name: row.name,
    balance: (row.amount || 0) - averageAmount
  }));

  const creditors = balances.filter(b => b.balance > 0).sort((a, b) => b.balance - a.balance);
  const debtors = balances.filter(b => b.balance < 0).sort((a, b) => a.balance - b.balance);

  while (creditors.length && debtors.length) {
    const creditor = creditors[0];
    const debtor = debtors[0];
    const amount = Math.min(creditor.balance, -debtor.balance);

    transactions.push({ from: debtor.name, to: creditor.name, amount });

    creditor.balance -= amount;
    debtor.balance += amount;

    if (creditor.balance === 0) creditors.shift();
    if (debtor.balance === 0) debtors.shift();
  }

  return transactions;
};

function openModal (result: Array<{ from: string; to: string; amount: number }>) {
  console.log('Modal open');
  modal.open(ResultComponent, {
    result: result,
    onClose() {
      modal.close();
    }
  })
}

// Test
const test = () => {
  // console.log("rows→");
  console.log(rows.value);
  // console.log(columnsTable);
  // console.log(selectedColumns.value);
  console.log(selectedRows.value);
  // console.log(sort.value);
};
</script>

<style lang="scss" scoped></style>