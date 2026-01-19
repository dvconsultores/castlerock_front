<template>
  <div id="new-plan">
    <h3 class="font2" style="color: #262B63">Reports</h3>

    <v-row class="form-div" no-gutters>
      <v-col cols="12" sm="12" class="pb-0 pl-1 pr-0 pt-1">
        <v-autocomplete
          v-model="select_class"
          placeholder="Classroom"
          flat
          autocomplete="off"
          class="autocomplete-register mb-2"
          model
          hide-details
          menu-icon="mdi-chevron-up"
          :items="selectedClassItems"
          item-value="id"
          item-title="displayName"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        >
          <template v-slot:selection="{ item }">
            {{ item.raw.displayName }}
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" sm="6" class="pb-0 pl-1 pr-1 pt-1">
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field v-model="formattedDateStart" autocomplete="off"class="autocomplete-register" placeholder="Report Start Date" variant="solo"
              flat readonly hide-details append-inner-icon="mdi-calendar" v-bind="props"
              @click:append-inner="props.onClick"></v-text-field>
          </template>

          <v-date-picker v-model="dateOfStart" @update:model-value="formatDateStart" :max-date="new Date()"
            :close-on-click="false" :close-on-content-click="false"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" sm="6" class="pb-0 pl-1 pr-0 pt-1">
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field v-model="formattedDateEnd" autocomplete="off"class="autocomplete-register" placeholder="Report End Date" variant="solo"
              flat readonly hide-details append-inner-icon="mdi-calendar" v-bind="props"
              @click:append-inner="props.onClick"></v-text-field>
          </template>

          <v-date-picker v-model="dateOfEnd" @update:model-value="formatDateEnd" :max-date="new Date()"
            :close-on-click="false" :close-on-content-click="false"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="6" align="left" class="mt-4">
        <v-checkbox 
        color="#6EC8AC" 
        density="compact" 
        hide-details 
        label="Export a PDF Document"
        v-model="pdfReport"
        ></v-checkbox>
      </v-col>

      <v-col cols="6" align="right" class="mt-4">
        <v-btn class="btn btn-create" flat @click="getReport()" :loading="loadingCreate">Get Report</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="showStateReport" no-gutters class="form-div mt-4">
      <v-col cols="12" sm="4" class="pr-2">
        <v-card class="card-title" flat>
          <span class="first-span">Total Montly Amount</span>
          <br>
          <span>{{ totalMonthlyAmount }}$</span>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="pr-2">
        <v-card class="card-title" flat>
          <span class="first-span">Total Weekly Amount</span>
          <br>
          <span>{{ totalWeeklyAmount }}$</span>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="card-title" flat>
          <span class="first-span">Students Count</span>
          <br>
          <span>{{ totalStudents }}</span>
        </v-card>
      </v-col>
    </v-row>

    <v-data-table
      v-if="showStateReport"
      :items="filteredData"
      :headers="headers"
      :items-per-page="100"
      class="mt-6"
    >
      <template v-slot:top>
        <div class="flex gap4 center" style="background-color: #F0F0F0 ;">
          <v-text-field
            v-model="searchQuery"
            class="login-textfield"
            placeholder="Search Student"
            variant="solo" 
            maxLength="150"
            autocomplete="off"
            flat
            hide-details
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </div>
      </template>

      <template v-slot:item.weeklyAmount="{ item }">
        <div>
          <span>{{ item.weeklyAmount }}$</span>
        </div>
      </template>

      <template v-slot:item.monthlyAmount="{ item }">
        <div>
          <span>{{ item.monthlyAmount }}$</span>
        </div>
      </template>

    </v-data-table>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import locale from 'dayjs/locale/en';
import imgUser from '@/assets/sources/images/user.png';
import imgStudent from '@/assets/sources/images/avatar.svg';
import { useRouter } from 'vue-router';
dayjs.extend(weekOfYear);
dayjs.extend(isLeapYear);
dayjs.locale(locale);

const dataResponseReport = ref([]);
const searchQuery = ref('');

const headers = ref([
    // { title: 'Student ID', key: 'studentId', align:'center', sortable: false },
    { title: 'Student Name', key: 'studentName', align:'center', sortable: false },
    // { title: 'Active Days', key: 'activeDays', align: 'center', sortable: false },
    // { title: 'Total Days', key: 'totalDays', align: 'center', sortable: false },
    { title: 'Weekly Amount', key: 'weeklyAmount', align: 'center', sortable: false },
    { title: 'Monthly Amount', key: 'monthlyAmount', align: 'center', sortable: false },
    // { title: 'Calculated Weekly', key: 'calculatedWeekly', align: 'center', sortable: false },
    // { title: 'Calculated Monthly', key: 'calculatedMonthly', align: 'center', sortable: false },
]);

const filteredData = computed(() => {
  if (!searchQuery.value) return dataResponseReport.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataResponseReport.value.filter(details =>
    details.studentName.toLowerCase().includes(query) ||
    details.studentId.toString().includes(query)
  );
});

const formattedDateEnd = ref('');
const dateOfEnd = ref(null);
const dateOfStart = ref(null);
const formattedDateStart = ref('');
const dialogOpenDeletePlanning = ref(false);
const loadingDeletePlanning = ref(false);
const weekIndexToDelete = ref(null);
const centerError = ref('');
const classError = ref('');
const yearError = ref('');
const monthError = ref('');
const dialogOpenDelete = ref(false);
const dialogConfirmationDaily = ref(false);
const loadingDelete = ref(false);
const dailyScheduleToDelete = ref(null);
const totalMonthlyAmount = ref(null);
const totalWeeklyAmount = ref(null);
const totalStudents = ref(null);
const pdfReport = ref(false);

const formatDateStart = (date) => {
  if (!date) {
    formattedDateStart.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedDateStart.value = '';
    return;
  }
  formattedDateStart.value = dayjs(jsDate).format('MM-DD-YYYY');
};

const formatDateEnd = (date) => {
  if (!date) {
    formattedDateEnd.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedDateEnd.value = '';
    return;
  }
  formattedDateEnd.value = dayjs(jsDate).format('MM-DD-YYYY');
};


const openDeleteDialog = (day) => {
  if (!day.dailyScheduleId) {
    showAlert('This day has no schedule to delete', 'warning');
    return;
  }
  dailyScheduleToDelete.value = day.dailyScheduleId;
  dialogOpenDelete.value = true;
};

const showAlert = inject('showAlert');
const router = useRouter();
const showStateReport = ref(false);
const dataReport = ref([]);
const month_selected = ref('')
const loadingCreate = ref(false);
const dataCenters = ref([]);
const selectCenterItems = ref([]);
const select_center = ref(null);
const dataClasses = ref([]);
const selectedClassItems = ref([]);
const select_class = ref(null);

const getClasses = async () =>{
  try{
    const response = await axiosInstance.get('/classes');
    
    dataClasses.value = response.data.result.map(classes => ({
      id: classes.id,
      name: classes.name,
      campus: classes.campus?.name,
      displayName: `${classes.name} - ${classes.campus?.name}`
    }));

    selectedClassItems.value = dataClasses.value;
  }catch(error){
    showAlert('Error fetching classes', 'error');
  }
}

const getReport = async () =>{
  const pdf = pdfReport.value;
  showStateReport.value = false;
  loadingCreate.value = true;
  try{
    const response = await axiosInstance.post('/reports', {
      classId: select_class.value,
      startDate: formattedDateStart.value,
      endDate: formattedDateEnd.value,
      pdf: pdf,
    }, {
      responseType: pdf ? 'blob' : 'json'
    });

    if (pdf) {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      dataResponseReport.value = response.data.details;
      totalMonthlyAmount.value = response.data.totalMonthly;
      totalWeeklyAmount.value = response.data.totalWeekly;
      totalStudents.value = response.data.studentsCount;
      showStateReport.value = true;
    }
  }catch(error){
    showAlert('Error fetching report', 'error');
  }finally{
    loadingCreate.value = false;
  }
}

const openDeletePlanningDialog = (weekIndex) => {
  weekIndexToDelete.value = weekIndex;
  dialogOpenDeletePlanning.value = true;
};


onMounted(() =>{
  getClasses();
  // getCentersTable();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-weekly-schedule.scss';
</style>
