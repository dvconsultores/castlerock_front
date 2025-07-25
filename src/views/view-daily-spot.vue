<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      {{ class_name }} - <span>{{ program.charAt(0).toUpperCase() + program.slice(1).toLowerCase() }}</span>
    </h3>
    <!-- <h5 class="font2 tleft" style="color: #4E444B;">
      {{ day }}, {{ dayNumber }} - ({{ campus_name }})
    </h5> -->

    <v-row class="fullw mt-10">
      <v-col cols="12" sm="12">
        <div class="big-div big-div-spot">
          <h5 class="font2 f24 tleft mb-0" style="color: #262262;">Weekly Spots</h5>
          <hr>

          <div class="students-selected-container spots-container">
            <v-card v-for="(item, index) in dailySchedules" :key="index" flat>
              <span class="f17 font2 tcenter" style="color: #4E444B;">
                {{ item.day }}
              </span>
              <span class="f16 mt-2 w400 tcenter" style="color: #4E444B;">
                Max Capacity: {{ maxCapacity }}
              </span>
              <span class="f16 mt-2 w400 tcenter" style="color: #4E444B;">
                Filled spots: {{ item.studentsLength }}
              </span>
              <span class="f16 mt-2 w400 tcenter" style="color: #4E444B;">
                Available spots: {{ item.studentsCount }}
              </span>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';
import imgAvatar from '@/assets/sources/images/avatar.svg';

const class_name = ref('');
const program = ref('');
const notes = ref('');
const route = useRoute();
const scheduleId = ref(null);
const day = ref('');
const dayNumber = ref('');
const month = ref('');
const year = ref('');
const showAlert = inject('showAlert');
const dataStudents = ref([]);
const all = ref(true);
const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);
const campus_name = ref('');
const sheetTeacherSelected = ref([]);
const maxCapacity = ref(0);
const program_id = ref(null);
const dailySchedules = ref([]);

const formatDays = (days) => {
  const dayAbbreviations = {
    "Monday": "Mon",
    "Tuesday": "Tue",
    "Wednesday": "Wed",
    "Thursday": "Thu",
    "Friday": "Fri",
    "Saturday": "Sat",
    "Sunday": "Sun"
  };
  
  return days.map(day => dayAbbreviations[day]).join(', ');
};

watch([all, monday, tuesday, wednesday, thursday, friday, saturday, sunday], () => {
  checkDayAvailability();
}, { deep: true });



const transformDatesYear = async () =>{
  if (year.value >= 2023 && year.value <= 2030) {
    year.value = year.value - 2000;
  }
};

const transformDatesMonth = async () => {
  month.value = String(month.value).padStart(2, '0');
};

const scheduleData = ref([]);

const getDailySchedule = async () => {
  try {
    const response = await axiosInstance.get(`/daily-schedules/${scheduleId.value}`);
    const scheduleData = response.data.result;
    
    if (scheduleData) {
      maxCapacity.value = scheduleData.planning.class.maxCapacity;
      campus_name.value = scheduleData.planning.campus.name;
      class_name.value = scheduleData.planning.class.name;
      program.value = scheduleData.planning.class.program;
      program_id.value = scheduleData.planning.id;
      notes.value = scheduleData.notes || '';
      day.value = scheduleData.day;
      dayNumber.value = dayjs(scheduleData.date).format('DD/MM/YY');

      console.log('Fetching planning for program_id:', program_id.value);
      const planningResponse = await axiosInstance.get(`/planning/${program_id.value}`);
      console.log('Full planning response:', planningResponse);
      
      if (planningResponse?.data?.result?.dailySchedules?.length) {
        console.log('Found dailySchedules:', planningResponse.data.result.dailySchedules);
        dailySchedules.value = planningResponse.data.result.dailySchedules.map(schedule => ({
          id: schedule.id,
          day: schedule.day,
          date: schedule.date,
          studentsLength: schedule.students?.length || 0,
          studentsCount: maxCapacity.value - schedule.students?.length,
        }));
      } else {
        console.warn('No dailySchedules found in response');
        dailySchedules.value = [];
      }
    }
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};


onMounted(() => {
  scheduleId.value = route.params.id;

  if (scheduleId.value) {
    getDailySchedule();
  }
  
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>