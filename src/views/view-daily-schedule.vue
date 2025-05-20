<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      {{ class_name }} - <span>{{ program.charAt(0).toUpperCase() + program.slice(1).toLowerCase() }}</span>
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      {{ day }}, {{ dayNumber }}/{{ month }}/{{ year }}  - ({{ campus_name }})
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
            Students {{dataStudentSelected.length}}/ {{ maxCapacity }}
          </span>

          <div class="students-selected-container">
            <v-card v-for="(item, index) in dataStudentSelected" :key="index" flat>
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
          placeholder="You can add a note here (optional)" variant="solo"
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

const notes = ref('');
const route = useRoute();
const planningId = ref(0);
const day = ref('');
const dayNumber = ref('');
const month = ref('');
const year = ref('');
const showAlert = inject('showAlert');
const dataTeachers = ref([]);
const dataStudents = ref([]);
const all = ref(true);
const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);
const dataPlanning= ref([]);
const id_planning = ref('');
const class_name = ref('');
const program = ref('');
const campus_name = ref('');
const stateAvailable = ref(false);
const sheetTeacherSelected = ref([]);
const dataStudentSelected = ref([]);
const loadingCreate = ref(false);
const scheduleId = ref(null);
const maxCapacity = ref(0);

const getTeachers = async () => {
  try {
    const response = await axiosInstance.get('/teachers');

    dataTeachers.value = response.data.result.map((teacher) => {
      return {
        teacher_id: teacher.id,
        teacher_name: teacher.user.firstName + ' ' + teacher.user.lastName,
        teacher_img: teacher.user.image,
        teacher_type: 'Teacher',
      };
    });
  } catch (error) {
    showAlert('Error', 'error');
  }
};

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

const getStudents = async () =>{
  try{
    const response = await axiosInstance.get('/students');

    dataStudents.value = response.data.result.map((student) =>{
      return{
        student_id: student.id,
        student_img: student.image,
        student_name: student.firstName + ' ' + student.lastName,
        desc_program: student.program,
        days_enrolled: student.daysEnrolled ? formatDays(student.daysEnrolled) : "No days"
      }
    });
    checkDayAvailability();
  }catch(error){
    showAlert('Error', 'error')
  }
};

watch([all, monday, tuesday, wednesday, thursday, friday, saturday, sunday], () => {
  checkDayAvailability();
}, { deep: true });

const checkDayAvailability = () => {
  if (!dataStudents.value) return;
  
  stateAvailable.value = dataStudents.value.some(student => {
    if (!student.days_enrolled || student.days_enrolled === "No days") return false;
    
    const enrolledDays = student.days_enrolled.split(', ').map(day => day.trim());
    
    return (
      (all.value) ||
      (monday.value && enrolledDays.includes('Mon')) ||
      (tuesday.value && enrolledDays.includes('Tue')) ||
      (wednesday.value && enrolledDays.includes('Wed')) ||
      (thursday.value && enrolledDays.includes('Thu')) ||
      (friday.value && enrolledDays.includes('Fri')) ||
      (saturday.value && enrolledDays.includes('Sat')) ||
      (sunday.value && enrolledDays.includes('Sun'))
    );
  });
};

const getDailySchedule = async () => {
  try {
    const response = await axiosInstance.get(`/daily-schedules/${scheduleId.value}`);
    const scheduleData = response.data.result;
    
    if (scheduleData) {
      notes.value = scheduleData.notes || '';
      
      sheetTeacherSelected.value = [{
        id: scheduleData.teacher.id,
        teacher_name: 'Simulated Teacher Name',
        teacher_img: '',
        teacher_type: 'Teacher'
      }];
      
      dataStudentSelected.value = scheduleData.students.map(student => ({
        student_id: student.id,
        student_name: `${student.firstName} ${student.lastName}`,
        student_img: student.image,
        student_program: student.program || '',
        days_enrolled: student.daysEnrolled ? formatDays(student.daysEnrolled) : 'No days'
      }));
    }
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};

const fetchPlanningData = async () => {
  try {
    const response = await axiosInstance.get(`/planning/${planningId.value}`);

    dataPlanning.value = response.data.result;
    id_planning.value = dataPlanning.value.id;
    class_name.value = dataPlanning.value.class.name;
    program.value = dataPlanning.value.class.program;
    campus_name.value = dataPlanning.value.campus.name;
    maxCapacity.value = dataPlanning.value.class.maxCapacity
    year.value = dataPlanning.value.year;
    month.value = dataPlanning.value.month;
    transformDatesYear()
    transformDatesMonth()
  } catch (error) {
    console.error('Error fetching planning data:', error);
  }
};

const transformDatesYear = async () =>{
  if (year.value >= 2023 && year.value <= 2030) {
    year.value = year.value - 2000;
  }
};

const transformDatesMonth = async () => {
  month.value = String(month.value).padStart(2, '0');
};


onMounted(() => {
  getTeachers();
  getStudents();
  planningId.value = route.query.planningId || 0;
  scheduleId.value = route.params.scheduleId || null;
  day.value = route.query.day || '';
  dayNumber.value = route.query.dayNumber || '00';
  scheduleId.value = route.query.scheduleId || 0;
   if (scheduleId.value) {
    getDailySchedule();
  }
  
  if (planningId.value) {
    fetchPlanningData();
  }
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>