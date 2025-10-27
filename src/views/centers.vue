<template>
  <div id="centers">
    <v-data-table
      :items="filteredCenters"
      :headers="headers"
      :items-per-page="15"
    >
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Center"
            variant="solo" 
            maxLength="150"
            autocomplete="off"
            flat
            hide-details
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </template>

      <template v-slot:item.center_img="{ item }">
        <div class="card-img-table">
          <img :src="item.center_img" alt="Img">
        </div>
      </template>


      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="() => $router.push(`/home/view-center/${item.id}`)">mdi-eye-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="() => $router.push(`/home/edit-center/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="() => openDelete(item)">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/new-center')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDeleteCenter" content-class="dialogDeleteCenter" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this Center?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">{{ selectedCenterName }}</span></span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation" :loading="loadingDelete">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="closeDelete">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationCenter" content-class="dialogConfirmationCenter" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the center <span class="w600" style="color: #7583D9;">{{ selectedCenterName }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="dialogConfirmationCenter = false">Centers</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/new-center')">New Center</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import axiosInstance from '@/plugins/axios';

const page = ref(1);
const dialogDeleteCenter = ref(false);
const dialogConfirmationCenter = ref(false);
const selectedCenterId = ref(null);
const selectedCenterName = ref('');
const loadingDelete = ref(false);
const showAlert = inject('showAlert');
const dataCenters = ref([]);
const searchQuery = ref('');

const closeDelete = () => {
  dialogDeleteCenter.value = false;
  selectedCenterId.value = null;
};

const openDelete = (item) => {
  selectedCenterId.value = item.id;
  selectedCenterName.value = item.name;
  dialogDeleteCenter.value = true;
};

const openConfirmation = async () => {
  loadingDelete.value = true;
  try {
    await axiosInstance.delete(`/campus/${selectedCenterId.value}`);
    dialogDeleteCenter.value = false;
    dialogConfirmationCenter.value = true;
    loadingDelete.value = false;
    getCenters();
  } catch (error) {
    console.error('Failed to delete center', error);
    showAlert('Failed to delete center. Please try again.', 'error');
    dialogDeleteCenter.value = false;
    loadingDelete.value = false;
  }
};

const headers = ref([
    { title: '', key: 'center_img', align:'center', sortable: false },
    { title: 'Id', key: 'id_center', align:'center', sortable: false },
    { title: 'Name', key: 'name', align:'center', sortable: false },
    { title: 'Address', key: 'address', align: 'center', sortable: false },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false },
]);

const filteredCenters = computed(() => {
  if (!searchQuery.value) return dataCenters.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataCenters.value.filter(center =>
    center.name.toLowerCase().includes(query) ||
    center.address.toLowerCase().includes(query) ||
    center.id_center.toString().includes(query)
  );
});

const getCenters = async () => {
  try {
    const response = await axiosInstance.get('/campus');
    
    dataCenters.value = response.data.result.map((center, index) => {
      return {
        id: center.id,
        id_center: index + 1,
        center_img: center.image,
        name: center.name,
        address: center.address,
        actions: '',
      }
    });
  } catch (error) {
    showAlert('Error fetching centers', 'error');
  }
};

onMounted(() => {
  getCenters();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/centers.scss';
</style>


