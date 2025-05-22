<template>
  <div id="new-plan">
    <h3 class="font2" style="color: #262B63">New Weekly Enrollment</h3>

    <v-row class="form-div" no-gutters>
      <v-col cols="12" sm="6" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model.number="select_center"
          placeholder="Select Center"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="selectCenterItems"
          item-value="id"
          item-title="name"
          return-object
          @update:modelValue="val => select_center = val?.id"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <!-- <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="program"
          placeholder="Program"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['Primary', 'Toddler']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col> -->

      <v-col cols="12" sm="6" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model.number="select_class"
          placeholder="Classroom"
          flat
          class="autocomplete-register"
          model
          return-object
          menu-icon="mdi-chevron-up"
          :items="selectedClassItems"
          item-value="id"
          item-title="name"
          @update:modelValue="val => select_class = val?.id"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="year"
          placeholder="Select the Year"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="yearsArray"
          item-value="id"
          item-title="name"
          return-object
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="month"
          placeholder="Select the Month"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="monthsArray"
          item-value="id"
          item-title="name"
          return-object
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="week"
          placeholder="Select the Week"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="weeksArray"
          item-value="id"
          item-title="name"
          :disabled="!year || !month"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" align="right">
        <v-btn class="btn btn-create" flat @click="createNewPlanning" :loading="loadingCreate">Create planning</v-btn>
      </v-col>
    </v-row>

    <v-card v-if="showStatePlanning" flat class="card-rounded">
      <div v-for="(week, weekIndex) in monthlySchedule" :key="weekIndex" class="div-container-weeks-cards">
        <h3>{{ week.weekTitle }} {{ week.monthTitle }}</h3>
        <div class="slider-div">
          <v-card flat v-for="(day, dayIndex) in week.days" :key="dayIndex" @click="handleNewDay(day, weekIndex)">
            <div class="div-header">
              <span>{{ day.date }}</span>
            </div>

            <div class="techaer-div">
              <div v-if="day.imgUser" class="rounder-avatar">
                <img :src="day.imgUser" alt="User">
              </div>
              <div class="flexstart flexcol" style="color: #4E444B;">
                <span class="f12 tstart font2">{{ day.teacherName }}</span>
                <span class="f10 tstart">{{ day.teacherType }}</span>
              </div>
            </div>

            <div v-if="day.imgStudent" class="students-div">
              <div class="students-img-div">
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
                <div v-if="day.imgStudent2" class="img-student-card">
                  <img :src="day.imgStudent2" alt="Student">
                </div>
                <div v-if="day.imgStudent3" class="img-student-card">
                  <img :src="day.imgStudent3" alt="Student">
                </div>
                <div v-if="day.imgStudent4" class="img-student-card">
                  <img :src="day.imgStudent4" alt="Student">
                </div>
                <div v-if=day.imgStudent5 class="img-student-card">
                  <img :src="day.imgStudent5" alt="Student">
                </div>
              </div>

              <div class="attendance-div">
                <v-sheet>
                  <span class="f16" style="color: #4E444B;">+{{day.realStudent}}</span>
                </v-sheet>
              </div>
            </div>

            <div class="time-zone-div">
              <span class="f10 w600">{{ day.place }}</span>
              <span class="f10 w600" style="color: #7583D9;">{{ day.time }}</span>
            </div>

            <div class="hr-div"></div>

            <div class="flex center mt-2 div-icons" style="gap: 10px;">
              <v-icon color="#474649" @click.stop="handleViewDay(day, weekIndex)">mdi-{{ day.eye_icon }}</v-icon>
              <v-icon
                color="#474649"
                class="edit-day"
                @click.stop="handleEditDay(day, weekIndex)"
              >mdi-{{ day.icon_pencil }}</v-icon>
              <v-icon color="#474649" @click.stop="openDeleteDialog(day)">mdi-{{ day.trash_icon }}</v-icon>
            </div>
          </v-card>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="dialogOpenDelete" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Are you sure you want to delete this daily schedule?</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="deleteDaily()" :loading="loadingDelete">Yes, delete</v-btn>
          <v-btn flat class="btn2" @click="dialogOpenDelete = false">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationDaily" content-class="dialogConfirmationDaily" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The daily schedule has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="dialogConfirmationDaily = false">New Planning</v-btn>
        </div>
      </v-card>
    </v-dialog>
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

const dialogOpenDelete = ref(false);
const dialogConfirmationDaily = ref(false);
const loadingDelete = ref(false);
const dailyScheduleToDelete = ref(null);

const openDeleteDialog = (day) => {
  if (!day.dailyScheduleId) {
    showAlert('This day has no schedule to delete', 'warning');
    return;
  }
  dailyScheduleToDelete.value = day.dailyScheduleId;
  dialogOpenDelete.value = true;
};

const deleteDaily = async () => {
  loadingDelete.value = true;
  try {
    await axiosInstance.delete(`/daily-schedules/${dailyScheduleToDelete.value}`);
    dialogOpenDelete.value = false;
    dialogConfirmationDaily.value = true; 
    searchPlannings();
  } catch (error) {
    showAlert(error.response?.data?.message || 'Error deleting daily schedule', 'error');
  } finally {
    loadingDelete.value = false;
  }
};

const showAlert = inject('showAlert');
const router = useRouter();

const handleNewDay = (day, weekIndex) => {
  const weekData = monthlySchedule.value[weekIndex];
  if (!weekData?.planningId) {
    console.error('No planningId found for week', weekIndex + 1);
    return;
  }

  const dayName = day.date.split(',')[0].trim();
  
  router.push({
    name: 'daily-schedule',
    query: {
      planningId: weekData.planningId, // Usamos el ID correcto
      day: dayName,
      dayNumber: day.date.slice(-2),
    }
  });
};

const handleEditDay = (day, weekIndex) => {
  const weekData = monthlySchedule.value[weekIndex];
  if (!weekData?.planningId) {
    console.error('No planningId found for week', weekIndex + 1);
    return;
  }

  const dayName = day.date.split(',')[0].trim();
  
  router.push({
    name: 'edit-daily-schedule',
    query: {
      planningId: weekData.planningId,
      day: dayName,
      dayNumber: day.date.slice(-2),
      scheduleId: day.dailyScheduleId,
    }
  });
};

const handleViewDay = (day, weekIndex) => {
  const weekData = monthlySchedule.value[weekIndex];
  if (!weekData?.planningId) {
    console.error('No planningId found for week', weekIndex + 1);
    return;
  }

  const dayName = day.date.split(',')[0].trim();
  
  router.push({
    name: 'view-daily-schedule',
    query: {
      planningId: weekData.planningId,
      day: dayName,
      dayNumber: day.date.slice(-2),
      scheduleId: day.dailyScheduleId,
    }
  });
};

const showStatePlanning = ref(false);
const new_planning_data = ref([]);
const month_selected = ref('')
const loadingCreate = ref(false);
const dataCenters = ref([]);
const selectCenterItems = ref([]);
const select_center = ref(null);
const dataClasses = ref([]);
const selectedClassItems = ref([]);
const select_class = ref(null);
const year = ref(null);
const yearsArray = ref([
  { id: 2025, name: '2025' },
  { id: 2026, name: '2026' },
  { id: 2027, name: '2027' },
  { id: 2028, name: '2028' },
]);
const month = ref(null);
const monthsArray = ref([
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]);
const week = ref(null);
const weeksArray = ref([]);

// Get weeks from API response
  const calculateWeeks = () => {
    if (!year.value || !month.value) return;
    
    const weeks = [];
    const yearNum = year.value.id;
    const monthNum = month.value.id;
    
    // Get first day of month
    const firstDay = dayjs().year(yearNum).month(monthNum - 1).date(1);
    // Find first Monday of month
    let firstMonday = firstDay.day(1);
    if (firstMonday.date() > 7) {
      firstMonday = firstMonday.add(7, 'day');
    }
    
    // Generate 5 weeks starting from first Monday
    for (let weekNum = 1; weekNum <= 5; weekNum++) {
      const startDate = firstMonday.add((weekNum - 1) * 7, 'day');
      const endDate = startDate.add(4, 'day'); // Friday
      
      weeks.push({
        id: weekNum,
        name: `${weekNum}${getOrdinalSuffix(weekNum)} Week`
      });
    }
    
    weeksArray.value = weeks;
};

// Helper to get ordinal suffix (1st, 2nd, 3rd, etc)
const getOrdinalSuffix = (number) => {
  const j = number % 10;
  const k = number % 100;
  
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

// Watch for changes in year/month
watch([year, month], () => {
  calculateWeeks();
  week.value = null;
});

watch(week, () =>{
  console.log(week.value)
});

watch(month, () =>{
  month_selected.value = month.value.name
});

const createNewPlanning = async () =>{
  // if (!week.value) {
  //   showAlert('Please select a week', 'error');
  //   return;
  // }

  loadingCreate.value = true;
  try{
    const response = await axiosInstance.post('/planning', {
      year: year.value?.id,
      month: month.value?.id,
      week: week.value,
      campus: select_center.value,
      class: select_class.value,
    });
    showAlert('New Planning created succesfully!', 'success');
    searchPlannings();
    loadingCreate.value = false;
  }catch(error){
    showAlert(error, 'error')
    loadingCreate.value = false;
  }
};

const transformResponseToMonthlySchedule = (response) => {
  const weeks = [];
  const weekTitles = ["1st Week -", "2nd Week -", "3rd Week -", "4th Week -", "5th Week -"];

  // Ordenar las semanas por número de semana (por si el response no viene ordenado)
  const sortedPlannings = [...response.result].sort((a, b) => a.week - b.week);

  sortedPlannings.forEach((planning) => {
    const startDate = dayjs(planning.startDate);
    const endDate = dayjs(planning.endDate);

    // Verificar que startDate sea Lunes (1)
    if (startDate.day() !== 1) {
      console.warn(`La startDate (${startDate.format('YYYY-MM-DD')}) de la semana ${planning.week} no es Lunes.`);
    }

    // Crear array de días (Lunes a Viernes o Lunes a Domingo, según prefieras)
    const days = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Solo días laborables
    // Si necesitas incluir Sábado y Domingo:
    // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Iterar por cada día de la semana (Lunes a Viernes)
    daysOfWeek.forEach((dayName, index) => {
      const currentDate = startDate.add(index, 'day');
      const dayNumber = currentDate.date().toString().padStart(2, '0');
      const formattedDate = `${dayName}, ${dayNumber}`;

      // Buscar si hay datos para este día en dailySchedules
      const daySchedule = planning.dailySchedules.find(s => s.day === dayName);

      // Datos base del día
      const dayData = {
        date: formattedDate,
        imgUser: null, // Valor por defecto
        teacherName: '',
        teacherType: '',
        imgStudent: null,
        imgStudent2: null,
        imgStudent3: null,
        imgStudent4: null,
        imgStudent5: null,
        realStudent: '',
        time: '',
        place: '',
        icon_pencil: '',
        trash_icon: '',
        eye_icon: '',
      };

      // Sobrescribir con datos reales si existen
      if (daySchedule) {
        dayData.imgUser = daySchedule.teacher?.user?.image || imgUser;
        dayData.teacherName = daySchedule.teacher
          ? `${daySchedule.teacher.user.firstName} ${daySchedule.teacher.user.lastName}`
          : 'No teacher assigned';
        dayData.imgStudent = daySchedule.students?.[0]?.image || imgStudent;
        dayData.imgStudent2 = daySchedule.students?.[1]?.image || null;
        dayData.imgStudent3 = daySchedule.students?.[2]?.image || null;
        dayData.imgStudent4 = daySchedule.students?.[3]?.image || null;
        dayData.imgStudent5 = daySchedule.students?.[4]?.image || null;
        dayData.realStudent = daySchedule.students?.length || '0';
        dayData.teacherType = 'Teacher';
        dayData.time = '9:00 - 12:00';
        dayData.dailyScheduleId = daySchedule.id;
        dayData.icon_pencil = 'pencil-outline';
        dayData.trash_icon = 'trash-can-outline';
        dayData.eye_icon = 'eye-outline';
      }

      days.push(dayData);
    });

    weeks.push({
      weekTitle: weekTitles[planning.week - 1] || `Week ${planning.week}`,
      monthTitle: month_selected.value,
      days,
      planningId: planning.id,
      weekNumber: planning.week,
    });
  });

  return weeks;
};

const monthlySchedule = ref([]);

const getCenters = async () => {
  try {
    const response = await axiosInstance.get('/campus');
    
    dataCenters.value = response.data.result.map(center => ({
      id: center.id,
      name: center.name,
    }));

    selectCenterItems.value = dataCenters.value;
  } catch (error) {
    showAlert('Error fetching centers', 'error');
  }
};

const getClasses = async () =>{
  try{
    const response = await axiosInstance.get('/classes');
    
    dataClasses.value = response.data.result.map(classes => ({
      id: classes.id,
      name: classes.name,
    }));

    selectedClassItems.value = dataClasses.value;
  }catch(error){
    showAlert('Error fetching classes', 'error');
  }
}

const planningData = ref([]);

const searchPlannings = async () =>{
  try{
      const response = await axiosInstance.get(`/planning/search?campus=${select_center.value}&year=${year.value?.id}&month=${month.value?.id}&class=${select_class.value}`, {
    });
    if(response.data.result.length === 0){
      showStatePlanning.value = false;
      showAlert('Weekly Enrollment not created.', 'warning')
    }else{
      showStatePlanning.value = true;
      monthlySchedule.value = transformResponseToMonthlySchedule(response.data);
      planningData.value = response.data.result;
    }
    console.log(response.data.result, 'Planning')
  }catch(error){
    showAlert(error, 'error')
  }
};

const searchPlanningsWeeks = async () =>{
  try{
      const response = await axiosInstance.get(`/planning/search?campus=${select_center.value}&year=${year.value?.id}&month=${month.value?.id}&class=${select_class.value}&week=${week.value}`, {
    });
    if(response.data.result.length === 0){
      showStatePlanning.value = false;
      showAlert('Weekly Enrollment not created.', 'warning')
    }else{
      showStatePlanning.value = true;
      monthlySchedule.value = transformResponseToMonthlySchedule(response.data);
      planningData.value = response.data.result;
    }
  }catch(error){
    showAlert(error, 'error')
  }
};


watch(
  () => ({
    center: select_center.value,
    year: year.value,
    month: month.value,
    class: select_class.value,
  }),
  (newValues, oldValues) => {
    if (!oldValues) return;

    const allRequiredFilled = 
      newValues.center !== null && 
      newValues.year !== null && 
      newValues.month !== null && 
      newValues.class !== null;

    const hasChanged = (
      newValues.center !== oldValues.center ||
      newValues.year !== oldValues.year ||
      newValues.month !== oldValues.month ||
      newValues.class !== oldValues.class
    );

    if (allRequiredFilled && hasChanged) {
      searchPlannings();
    }
  },
  { deep: true }
);


watch(
  () => ({
    week: week.value,
  }),
  (newValues, oldValues) => {
    if (!oldValues) return;

    const allRequiredFilled = 
      newValues.week !== null;

    const hasChanged = (
      newValues.week !== oldValues.week
    );

    if (allRequiredFilled && hasChanged) {
      searchPlanningsWeeks();
    }
  },
  { deep: true }
);


const deleteDailySchedule = async (dailyScheduleId) => {
  try {
    await axiosInstance.delete(`/daily-schedules/${dailyScheduleId}`);
    showAlert('Daily schedule deleted successfully!', 'success');
    searchPlannings();
  } catch (error) {
    showAlert(error.response?.data?.message || 'Error deleting daily schedule', 'error');
  }
};

onMounted(() =>{
  getCenters();
  getClasses();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-weekly-schedule.scss';
</style>
