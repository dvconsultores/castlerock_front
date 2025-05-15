<template>
  <div id="programs">
    <v-data-table :items="filteredDataPrograms" :headers="headers" :items-per-page="15">
      <template v-slot:top>
        <v-text-field
          v-model="searchQuery"
          class="login-textfield"
          placeholder="Search Additional Programs"
          variant="solo" 
          flat
          hide-details
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <template v-slot:item.program_img="{ item }">
        <div class="card-img-table">
          <img :src="item.program_img" alt="Img">
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/edit-additional-program/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete(item)">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>

    <v-btn flat class="btn-floating" @click="$router.push('/home/additional-program')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>

    <v-dialog v-model="dialogDelete" content-class="dialogDelete" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this program?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">{{ programName }},</span> {{ centerName }} </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation" :loading="loadingConfirmation">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="dialogDelete = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" content-class="dialogConfirmation" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The record of the program <span class="w600" style="color: #7583D9;">{{ programName }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="refreshData">Programs Management</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/additional-program')">New Program</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';

const dialogDelete = ref(false);
const dialogConfirmation = ref(false);
const dataPrograms = ref([]);
const showAlert = inject('showAlert');
const searchQuery = ref('');
const programName = ref('');
const centerName = ref('');
const loadingConfirmation = ref(false);
const idProgram = ref(null);


const openDelete = (item) => {
  dialogDelete.value = true;
  idProgram.value = item.id;
  programName.value= item.name;
  centerName.value = item.center;
};

const headers = ref([
    { title: '', key: 'program_img', sortable: false },
    { title: 'Id.', key: 'id_program', align:'center', sortable: false },
    { title: 'Activity Type', key: 'name', align:'center', sortable: false },
    { title: 'Days', key: 'days', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const filteredDataPrograms = computed(() => {
  if (!searchQuery.value) return dataPrograms.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataPrograms.value.filter(programs => {
    const safeToString = (value) => value ? value.toString().toLowerCase() : '';
    return (
      safeToString(programs.name).includes(query) ||
      safeToString(programs.days).includes(query) ||
      safeToString(programs.center).includes(query)
    );
  }
  );
});

const getDataPrograms = async () => {
  try {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const response = await axiosInstance.get('/additional-programs');
    dataPrograms.value = response.data.result.map((programs, index) =>{

      const sortedDays = programs.days.sort((a, b) => 
        dayOrder.indexOf(a) - dayOrder.indexOf(b)
      );
      
      const formattedDays = sortedDays.map(day => 
        day.substring(0, 3)
      ).join(' - ');

      return {
        id: programs.id,
        id_program: index + 1,
        name: programs.name,
        days: formattedDays,
        center: programs.campus.name,
        program_img: programs.image,
      }
    });
  } catch (error) {
    showAlert('Error fetching classrooms', 'error');
  }
};

const openConfirmation = async () => {
  loadingConfirmation.value = true;

  try{
    const response = await axiosInstance.delete(`/additional-programs/${idProgram.value}`);
    loadingConfirmation.value = false;
    dialogDelete.value = false;
    dialogConfirmation.value = true;
  }catch(error){
    loadingConfirmation.value = false;
    showAlert('Error deleting classroom', 'error');
  }
};

const refreshData = () => {
  dialogConfirmation.value = false;
  getDataPrograms();
};  

onMounted(() => {
  getDataPrograms();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/programs.scss';
</style>


