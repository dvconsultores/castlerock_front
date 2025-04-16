import { ref } from 'vue';

export const isDrawerVisible = ref(true);

export const toggleDrawer = () => {
  isDrawerVisible.value = !isDrawerVisible.value;
};