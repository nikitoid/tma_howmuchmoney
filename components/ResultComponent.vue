<template>
  <UModal>
    <div :style="modalStyle" class="bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      <UCard :ui="{
        base: 'h-full w-full flex flex-col', ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800', header: { padding: 'py-2' }, body: {
          base: 'flex-grow overflow-auto'
        }
      }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-900 dark:text-white">
              Результаты
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="w-4 h-4 mr-1.5 flex-shrink-0" @click="onClose" />
          </div>
        </template>

        <!-- <UTable :rows="rows" /> -->
        <UVerticalNavigation :links="items" :ui="{
          base: 'group relative flex items-center pointer-events-none gap-1 px-2.5 py-0 w-full rounded-md font-medium text-sm',
          wrapper: 'space-y-0',
          padding: 'py-0'
        }">
          <template #default="{ link }">
            <div class="flex items-center">
              <UIcon v-if="link.leftIcon" :name="link.leftIcon.name" class="w-5 h-5 mr-2"
                :class="link.leftIcon.color" />
              {{ link.label }}
            </div>
            <UIcon v-if="link.rightIcon" :name="link.rightIcon.name" class="w-5 h-5 ml-2"
              :class="link.rightIcon.color" />
          </template>
          <template #icon>
            <!-- Пустой слот для отключения автоматического отображения иконок -->
          </template>
        </UVerticalNavigation>

        <!-- <div class="p-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ rows.value }}
            excample text from nuxt docs
          </p>
        </div> -->

        <Placeholder class="h-32" />
      </UCard>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  result: IRow[]
}>();

const emit = defineEmits(['close']);

function onClose() {
  emit('close');
}

const marginX = '2em' // Отступ от краев экрана по горизонтали
const marginY = '1em' // Отступ от краев экрана по вертикали
const modalStyle = computed(() => ({
  position: 'fixed',
  top: marginY,
  left: marginX,
  right: marginX,
  bottom: marginY,
  // width: 'calc(100% - ${marginX} * 2)',
  // height: 'calc(100% - ${marginY} * 2)',
} as const));

interface IRow {
  from: string
  to: string
  amount: number
}
const rows = ref<IRow[]>([]);

interface Icon {
  name: string;
  color: string;
}
interface IItem {
  label: string;
  leftIcon?: Icon;
  rightIcon?: Icon;
}
let items: Array<IItem[]> = [];

props.result.forEach(o => {
  const item: Array<IItem> = [
    {
      label: o.from,
      leftIcon: { name: 'i-mdi-arrow-down-left-bold', color: 'text-red-500' },
      // rightIcon: { name: 'i-mdi-arrow-down-left-bold', color: 'text-red-500' }

    },
    {
      label: (o.amount).toFixed(2),
      leftIcon: { name: 'i-cryptocurrency-rub', color: 'text-blue-500' },
      // rightIcon: { name: 'i-mdi-arrow-down-thick', color: 'text-blue-500' }
    },
    {
      label: o.to,
      leftIcon: { name: 'i-mdi-arrow-right-bottom-bold', color: 'text-green-500' },
      // rightIcon: { name: 'i-mdi-arrow-right-bottom-bold', color: 'text-green-500' }
      // customIcon: 'i-cuida-login-outline',
    }
  ];
  // item.push({
  //   label: o.from,
  //   icon: 'i-heroicons-user'
  // });
  // item.push({
  //   label: String(o.amount),
  //   icon: 'i-heroicons-user'
  // });
  // item.push({
  //   label: o.to,
  //   icon: 'i-heroicons-user'
  // });

  items.push(item);

  // rows.value.push({
  //   from: o.from,
  //   to: o.to,
  //   amount: o.amount
  // });
});
</script>

<style lang="scss" scoped></style>