<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      {{ class_name }} - <span>{{ program.charAt(0).toUpperCase() + program.slice(1).toLowerCase() }}</span>
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      {{ day }}, {{ dayNumber }} - ({{ campus_name }})
    </h5>

    <v-row class="fullw mt-10">
      <v-col cols="12" sm="12">
        <div class="big-div">
          <h5 class="font2 f24 tleft mb-0" style="color: #262262;">Daily Plan</h5>
          <hr>

          <v-sheet v-for="(item, index) in sheetTeacherSelected" :key="index" class="sheet-teacher">
            <div class="absences-info-div"> 
              <div class="img-absences-card">
                <img :src="item.teacher_img" alt="user">
              </div>

              <div class="flexcol">
                <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.teacher_name }}</span>
                <span class="f10 tleft" style="color: #4E444B;">{{ item.teacher_type }}</span>
              </div>
            </div>
          </v-sheet>

          <span class="f16 font2 tleft mt-4 mb-4" style="color: #262262;">
            Students {{dataStudents.length}}/ {{ maxCapacity }}
          </span>

          <div class="students-selected-container">
            <v-card v-for="(item, index) in dataStudents" :key="index" flat>
              <div class="rounde-div">
                <img :src="item.student_img" alt="Student">
              </div>
              <span class="f12 font2 tcenter" style="color: #4E444B;">
                {{item.student_name}}
              </span>
              <span class="f10 w400 tcenter" style="color: #4E444B;">
                {{item.student_program}}
              </span>
              <span class="f10 tcenter w500" style="color: #6BBDAE;">
                {{ item.days_enrolled }}
              </span>
            </v-card>
          </div>

          <v-textarea
          v-model="notes"
          density="compact"
          placeholder="There are no notes" variant="solo"
          flat
          readonly
          hide-details
          bg-color="#F0F0F0"
          class="text-area mt-8 fullw"
          ></v-textarea>
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
const scheduleId = ref(route.params.id);
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
      notes.value = scheduleData.notes || '';
      day.value = scheduleData.day;
      dayNumber.value = dayjs(scheduleData.date).format('DD/MM/YY');;
      sheetTeacherSelected.value = [{
        id: scheduleData.teacher.id,
        teacher_name: scheduleData.teacher.user.firstName + ' ' + scheduleData.teacher.user.lastName,
        teacher_img: scheduleData.teacher.user.image,
        teacher_type: 'Teacher'
      }];
      
      dataStudents.value = scheduleData.students.map(student => ({
        student_id: student.id,
        student_name: `${student.firstName} ${student.lastName}`,
        student_img: student.image || imgAvatar,
      }));
    }
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};


onMounted(() => {
   if (scheduleId.value) {
    getDailySchedule();
  }
  
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>