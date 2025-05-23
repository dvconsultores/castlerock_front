<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      {{ class_name }} - <span>{{ program.charAt(0).toUpperCase() + program.slice(1).toLowerCase() }}</span>
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      {{ day }}, {{ dayNumber }}/{{ month }}/{{ year }}  - ({{ campus_name }})
    </h5>

    <v-row class="fullw mt-10">
      <v-col cols="12" sm="3">
        <div class="custom-toggle">
          <v-btn value="teachers" flat class="toggle-btn" @click="activeTeachers" :class="{ 'active-toggle': teachers_btn }"> 
            Teachers 
          </v-btn>
          <v-btn value="students" flat class="toggle-btn" @click="activeStudents" :class="{'active-toggle': students_btn}"> 
            Students 
          </v-btn>
        </div>

        <div class="users-div">
          <template v-if="teachers_btn">
            <v-text-field
              v-model="searchQueryTeachers"
              class="login-textfield"
              placeholder="Search Teacher"
              bg-color="#F0F0F0 "
              variant="solo" 
              flat
              hide-details
              append-inner-icon="mdi-magnify"
            ></v-text-field>

            <hr>

            <div class="scroll-div">
              <v-sheet v-for="(item, index) in filteredTeachers" :key="index" class="sheet-absences pointer" @click="selectedTeacher(item)">
                <div class="absences-info-div"> 
                  <div class="img-absences-card">
                    <img :src="item.teacher_img" alt="user">
                  </div>

                  <div class="flexcol">
                    <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.teacher_name }}</span>
                    <span class="f10 tleft" style="color: #4E444B;">{{ item.teacher_type }}</span>
                  </div>
                </div>

                <v-icon>mdi-chevron-right</v-icon>
              </v-sheet>
            </div>
          </template>

          <template v-else="students_btn">
            <v-text-field
              v-model="searchQueryStudents"
              class="login-textfield"
              placeholder="Search Student"
              bg-color="#F0F0F0 "
              variant="solo" 
              flat
              hide-details
              append-inner-icon="mdi-magnify"
            ></v-text-field>

            <hr>

            <span class="f16 font2 tcenter" style="color: #262262;">Available students today</span>

            <div class="days-div">
              <v-checkbox 
                v-model="all" 
                compact 
                hide-details
                class="checkbox " 
                label="All" 
                :class="{'checkbox-active': all}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="monday" 
                compact 
                hide-details
                class="checkbox " 
                label="Mon" 
                :class="{'checkbox-active': monday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="tuesday" 
                compact 
                hide-details
                class="checkbox " 
                label="Tue" 
                :class="{'checkbox-active': tuesday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="wednesday" 
                compact 
                hide-details
                class="checkbox " 
                label="Wed" 
                :class="{'checkbox-active': wednesday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="thursday" 
                compact 
                hide-details
                class="checkbox " 
                label="Thu" 
                :class="{'checkbox-active': thursday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="friday" 
                compact 
                hide-details
                class="checkbox " 
                label="Fri" 
                :class="{'checkbox-active': friday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="saturday" 
                hide-details
                compact 
                class="checkbox" 
                label="Sat" 
                :class="{'checkbox-active': saturday}"
              ></v-checkbox>
              
              <v-checkbox 
                v-model="sunday" 
                compact 
                hide-details
                class="checkbox" 
                label="Sun" 
                :class="{'checkbox-active': sunday}"
              ></v-checkbox>
            </div>

            <div class="scroll-div scroll-div-student">
              <v-sheet v-if="stateAvailable" v-for="(item, index) in filteredStudents" :key="index" class="sheet-absences pointer" @click="selectedStudent(item)">
                <div class="absences-info-div"> 
                  <div class="img-absences-card">
                    <img :src="item.student_img" alt="user">
                  </div>

                  <div class="flexcol">
                    <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.student_name }}</span>
                    <div>
                      <span class="f10 tleft" style="color: #4E444B;">{{ item.desc_program }}</span>
                      <span class="f10 tleft ml-1 w500" style="color: #6BBDAE;">{{ item.days_enrolled }}</span>
                    </div>
                  </div>
                </div>

                <v-icon>mdi-chevron-right</v-icon>
              </v-sheet>
            </div>
          </template>
        </div>
      </v-col>

      <v-col cols="12" sm="9">
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

            <v-icon class="pointer" @click="deleteSelectedTeacher()">mdi-trash-can-outline</v-icon>
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

              <v-icon @click="deleteStudent(index)">mdi-trash-can-outline</v-icon>
            </v-card>
          </div>

          <v-textarea
          v-model="notes"
          density="compact"
          placeholder="You can add a note here (optional)" variant="solo"
          flat
          hide-details
          bg-color="#F0F0F0"
          class="text-area mt-8 mb-4 fullw"
          ></v-textarea>

          <v-row class="fullw" no-gutters>
            <v-col sm="2" cols="12" class="pr-1">
              <!-- <v-btn flat class="btn1">
                <v-icon class="mr-1">mdi-arrow-left-circle-outline</v-icon> Back to Day
              </v-btn> -->
            </v-col>
            <v-col sm="8" cols="12">
              <v-btn flat class="btn2" @click="validDialog">
                Save
              </v-btn>
            </v-col>
            <v-col sm="2" cols="12" class="pl-1">
              <!-- <v-btn flat class="btn3">
                Next Day <v-icon class="ml-1">mdi-arrow-right-circle-outline</v-icon>
              </v-btn> -->
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAddPlanning" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to save this daily schedule?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400">
          <span class="w500" style="color: #7583D9;">{{ day }}, {{ dayNumber }}/{{ month }}/{{ year }}</span>
        </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createNewDailySchedule()" :loading="loadingCreate">Yes, save</v-btn>
          <v-btn flat class="btn2" @click="dialogAddPlanning = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationDaily" content-class="dialogConfirmationDaily" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully created!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The daily schedule has been successfully created.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/new-weekly-schedule')">New Planning</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import avatarImg from '@/assets/sources/images/avatar.svg';

const dialogConfirmationDaily = ref(false);
const dialogAddPlanning = ref(false);
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
const teachers_btn = ref(true);
const students_btn = ref(false);
const searchQueryTeachers = ref('');
const searchQueryStudents = ref('');
const dataStudentSelected = ref([]);
const loadingCreate = ref(false);
const maxCapacity = ref(0);

const validDialog = () => {
  if (sheetTeacherSelected.value.length === 0) {
    showAlert('You must select at least 1 Teacher.', 'error');
  } else if (dataStudentSelected.value.length === 0) {
    showAlert('You must select at least 1 Student.', 'error');
  } else {
    dialogAddPlanning.value = true;
  }
};

const selectedTeacher = (item) => {
  const alreadySelected = sheetTeacherSelected.value.length

  if (alreadySelected === 0) {
    sheetTeacherSelected.value.push({
      id: item.teacher_id,
      teacher_name: item.teacher_name,
      teacher_img: item.teacher_img,
      teacher_type: 'Teacher',
    });
  } else {
    showAlert('The teacher has already been selected.', 'error');
  }
};

const deleteStudent = (index) =>{
  dataStudentSelected.value.splice(index,1)
};

const selectedStudent = (item) => {
  const exists = dataStudentSelected.value.some(student => student.student_id === item.student_id);

  if (exists) {
    showAlert('This student has already been selected.', 'error');
    return;
  }

  if (dataStudentSelected.value.length < maxCapacity.value) {
    dataStudentSelected.value.push({
      student_id: item.student_id,
      student_name: item.student_name,
      student_img: item.student_img,
      student_program: item.program,
      days_enrolled: item.days_enrolled
    });
  } else {
    showAlert('This class does not accept more students.', 'error');
  }
};

const deleteSelectedTeacher = () => {
  sheetTeacherSelected.value = [];
};

const filteredTeachers = computed(() => {
  return dataTeachers.value.filter(teacher =>
    teacher.teacher_name.toLowerCase().includes(searchQueryTeachers.value.toLowerCase())
  );
});

const filteredStudents = computed(() => {
  return dataStudents.value.filter(student => {
    const nameMatch = student.student_name.toLowerCase().includes(searchQueryStudents.value.toLowerCase());
    let dayMatch = true;
    if (!all.value) {
      const selectedDays = [];
      if (monday.value) selectedDays.push('Mon');
      if (tuesday.value) selectedDays.push('Tue');
      if (wednesday.value) selectedDays.push('Wed');
      if (thursday.value) selectedDays.push('Thu');
      if (friday.value) selectedDays.push('Fri');
      if (saturday.value) selectedDays.push('Sat');
      if (sunday.value) selectedDays.push('Sun');

      if (selectedDays.length > 0) {
        const studentDays = student.days_enrolled.split(', ');
        dayMatch = selectedDays.some(day => studentDays.includes(day));
      }
    }

    return nameMatch && dayMatch;
  });
});

const activeTeachers = () =>{
  teachers_btn.value = true;
  students_btn.value = false;
};

const activeStudents = () =>{
  students_btn.value = true;
  teachers_btn.value = false;
};

const getTeachers = async () => {
  try {
    const response = await axiosInstance.get('/teachers');

    dataTeachers.value = response.data.result.map((teacher) => {
      return {
        teacher_id: teacher.id,
        teacher_name: teacher.user.firstName + ' ' + teacher.user.lastName,
        teacher_img: teacher.user.image || avatarImg,
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

    dataStudents.value = response.data.result
      .filter(student => student.program === program.value)
      .map((student) =>{
      return{
        student_id: student.id,
        student_img: student.image || avatarImg,
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

const createNewDailySchedule = async () =>{
  loadingCreate.value = true;
  // if(!sheetTeacherSelected.value){
  //   showAlert('You must select at least 1 Teacher.')
  // }else if (!dataStudentSelected.value){
  //   showAlert('You must select at least 1 Student')
  // }else{
    
  // }
  try{
      const response = await axiosInstance.post('/daily-schedules', {
      planningId: planningId.value,
      day: day.value,
      teacherId: sheetTeacherSelected.value[0].id,
      studentIds: dataStudentSelected.value.map(student => student.student_id),
      notes: notes.value,

      });
      showAlert('New Planning created succesfully!', 'success');
      loadingCreate.value = false;
      dialogConfirmationDaily.value = true;
    }catch(error){
      showAlert(error, 'error')
      loadingCreate.value = false;
    }
};

onMounted(async () => { 
  await getTeachers();    
  planningId.value = route.query.planningId || 0;
  day.value = route.query.day || '';
  dayNumber.value = route.query.dayNumber || '00';
  
  if (planningId.value) {
    await fetchPlanningData();
    await getStudents(); 
  } else {
    await getStudents(); 
  }
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>