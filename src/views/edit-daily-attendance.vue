<template>
  <div id="edit-daily-attendance">
    <h3 class="font2 tleft" style="color: #262B63;">
      {{ class_name }} - <span>{{ program.charAt(0).toUpperCase() + program.slice(1).toLowerCase() }}</span>
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      {{ day }}, {{ dayNumber }} - ({{ campus_name }})
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

        <div class="users-div pt-6">
          <template v-if="teachers_btn">
            <span class="f16 font2 tcenter" style="color: #262262;">Classroom Teacher</span>

            <div class="scroll-div mt-4">
              <v-sheet v-for="(item, index) in sheetTeacherSelected" :key="index" class="sheet-absences pointer">
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
            </div>
          </template>

          <template v-else="students_btn">
            <v-text-field
              v-model="searchQueryStudents"
              class="login-textfield mb-6"
              placeholder="Search Student"
              bg-color="#F0F0F0 "
              autocomplete="off"
              variant="solo" 
              flat
              hide-details
              append-inner-icon="mdi-magnify"
            ></v-text-field>

            <span class="f16 font2 tcenter" style="color: #262262;">Classroom Students</span>

            <div class="scroll-div scroll-div-student mt-6">
              <v-chip
                v-for="(item, index) in filteredStudents"
                :key="index"
                class="sheet-absences pointer"
                draggable
                @dragstart="startDrag(item, $event)"
              >
                <div class="absences-info-div"> 
                  <div class="img-absences-card">
                    <img :src="item.student_img" alt="user">
                  </div>

                  <div class="flexcol">
                    <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.student_name }}</span>
                  </div>
                </div>

                <v-icon>mdi-chevron-right</v-icon>
              </v-chip>
            </div>
          </template>
        </div>
      </v-col>

      <v-col cols="12" sm="9">
        <div class="div-for-attendance">
          <v-card  class="card-attendance" 
            flat
            @drop="onDrop($event, 'Present')"
            @dragover.prevent
            @dragenter.prevent
            >
            <span class="f24 font2 tcenter" style="color: #6BBDAE;">Attendance</span>
            <hr>
            <span class="f16 font2" style="color: #262262; align-self: flex-start;">Students {{ totalAttendances }} / {{ maxCapacity }}</span>

            <div class="student-container mt-4">
              <v-card v-for="(item, index) in dataStudentAttendance" :key="index" flat>
                <div class="rounde-div">
                  <img :src="item.student_img" alt="Student">
                </div>
                <span class="f12 font2 tcenter mt-2" style="color: #4E444B;">
                  {{item.student_name}}
                </span>
                <v-icon @click="deleteStudentAttendance(index)">mdi-trash-can-outline</v-icon>
              </v-card>
            </div>
          </v-card>

          <v-card 
          flat 
          class="card-attendance"
          @drop="onDrop($event, 'Late')"
          @dragover.prevent
          @dragenter.prevent
          >
            <span class="f24 font2 tcenter" style="color: #F36029;">Late arrival</span>
            <hr>
            <span class="f16 font2" style="color: #262262; align-self: flex-start;">Students {{ totalAttendances }} / {{ maxCapacity }}</span>

            <div class="student-container mt-4">
              <v-card v-for="(item, index) in dataStudentLate" :key="index" flat>
                <div class="rounde-div">
                  <img :src="item.student_img" alt="Student">
                </div>
                <span class="f12 font2 tcenter mt-2" style="color: #4E444B;">
                  {{item.student_name}}
                </span>
                <v-icon @click="deleteStudentLate(index)">mdi-trash-can-outline</v-icon>
              </v-card>
            </div>
          </v-card>

          <v-card 
          flat 
          class="card-attendance"
          @drop="onDrop($event, 'Absent')"
          @dragover.prevent
          @dragenter.prevent
          >
            <span class="f24 font2 tcenter" style="color: #BA1A1A;">Absence</span>
            <hr>
            <span class="f16 font2" style="color: #262262; align-self: flex-start;">Students {{ totalAttendances }} / {{ maxCapacity }}</span>

            <div class="student-container mt-4">
              <v-card v-for="(item, index) in dataStudentAbsence" :key="index" flat>
                <div class="rounde-div">
                  <img :src="item.student_img" alt="Student">
                </div>
                <span class="f12 font2 tcenter mt-2" style="color: #4E444B;">
                  {{item.student_name}}
                </span>
                <v-icon @click="deleteStudentAbsence(index)">mdi-trash-can-outline</v-icon>
              </v-card>
            </div>
          </v-card>

          <v-card 
          flat
          class="card-attendance"
          @drop="onDrop($event, 'Justified')"
          @dragover.prevent
          @dragenter.prevent
          >
            <span class="f24 font2 tcenter" style="color: #6DB0F3; line-height: 24px;">Excused <br> Absence</span>
            <hr>
            <span class="f16 font2" style="color: #262262; align-self: flex-start;">Students {{ totalAttendances }} / {{ maxCapacity }}</span>

            <div class="student-container mt-4">
              <v-card v-for="(item, index) in dataStudentExcused" :key="index" flat>
                <div class="rounde-div">
                  <img :src="item.student_img" alt="Student">
                </div>
                <span class="f12 font2 tcenter mt-2" style="color: #4E444B;">
                  {{item.student_name}}
                </span>
                <v-icon @click="deleteStudentExcused(index)">mdi-trash-can-outline</v-icon>
              </v-card>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row class="fullw">
      <v-col cols="12" sm="6" class="pa-0 fullw">
        <div class="big-div-textarea">
          <span class="f24 font2 tcenter" style="color: #262262; line-height: 24px;">Notes and Comments</span>
          <hr>

          <v-textarea
          v-model="notes"
          density="compact"
          placeholder="You can add a note here (optional)" variant="solo"
          flat
          hide-details
          rows="3"
          bg-color="#F0F0F0"
          class="text-area fullw"
          ></v-textarea>
        </div>
      </v-col>    

      <v-col cols="12" align="center" class="mt-4">
        <v-btn flat class="btn" @click="dialogAddPlanning = true">Save</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAddPlanning" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to save this daily attendances?</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" :loading="loadingAttendance" @click="submitAttendances">Yes, save</v-btn>
          <v-btn flat class="btn2" @click="dialogAddPlanning = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationDaily" content-class="dialogConfirmationDaily" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The daily attendances has been successfully saved.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home')">Home</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';
import imgAvatar from '@/assets/sources/images/avatar.svg';

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
const scheduleId = ref(route.params.id);
const maxCapacity = ref(0);
const dataStudentAttendance = ref([]);
const dataStudentLate = ref([]);
const dataStudentAbsence = ref([]);
const dataStudentExcused = ref([]);
const loadingAttendance = ref(false);
const draggedItem = ref(null);


const startDrag = (item, ev) => {
  draggedItem.value = item;
  ev.dataTransfer.dropEffect = 'move';
  ev.dataTransfer.effectAllowed = 'move';
};

const onDrop = (ev, status) => {
  if (!draggedItem.value) return;

  const student = draggedItem.value;
  
  // Remove from any existing array
  dataStudentAttendance.value = dataStudentAttendance.value.filter(s => s.student_id !== student.student_id);
  dataStudentLate.value = dataStudentLate.value.filter(s => s.student_id !== student.student_id);
  dataStudentAbsence.value = dataStudentAbsence.value.filter(s => s.student_id !== student.student_id);
  dataStudentExcused.value = dataStudentExcused.value.filter(s => s.student_id !== student.student_id);

  // Add to the correct array
  const studentData = {
    student_id: student.student_id,
    student_name: student.student_name,
    student_img: student.student_img,
    status: status
  };

  switch(status) {
    case 'Present':
      dataStudentAttendance.value.push(studentData);
      break;
    case 'Late':
      dataStudentLate.value.push(studentData);
      break;
    case 'Absent':
      dataStudentAbsence.value.push(studentData);
      break;
    case 'Justified':
      dataStudentExcused.value.push(studentData);
      break;
  }

  draggedItem.value = null;
};

const submitAttendances = async () => {
  loadingAttendance.value = true;
  try {
    const attendances = [];
    
    dataStudentAttendance.value.forEach(student => {
      attendances.push({
        studentId: student.student_id,
        dailyScheduleId: scheduleId.value,
        status: 'Present',
        observations: notes.value
      });
    });

    dataStudentLate.value.forEach(student => {
      attendances.push({
        studentId: student.student_id,
        dailyScheduleId: scheduleId.value,
        status: 'Late',
        observations: notes.value
      });
    });

    dataStudentAbsence.value.forEach(student => {
      attendances.push({
        studentId: student.student_id,
        dailyScheduleId: scheduleId.value,
        status: 'Absent',
        observations: notes.value
      });
    });

    dataStudentExcused.value.forEach(student => {
      attendances.push({
        studentId: student.student_id,
        dailyScheduleId: scheduleId.value,
        status: 'Justified',
        observations: notes.value
      });
    });

    if (attendances.length === 0) {
      showAlert('No attendances to save', 'error');
      loadingAttendance.value = false;
      return;
    }

    const response = await axiosInstance.post('/attendances/bulk', attendances);

    loadingAttendance.value = false;
    dialogAddPlanning.value = false;
    dialogConfirmationDaily.value = true;
  } catch (error) {
    showAlert('Error saving attendances', 'error');
    loadingAttendance.value = false;
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

const deleteStudentAttendance = (index) =>{
  dataStudentAttendance.value.splice(index,1)
};
const deleteStudentLate = (index) =>{
  dataStudentLate.value.splice(index,1)
};
const deleteStudentAbsence = (index) =>{
  dataStudentAbsence.value.splice(index,1)
};
const deleteStudentExcused = (index) =>{
  dataStudentExcused.value.splice(index,1)
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

const totalAttendances = computed(() => {
  return dataStudentAttendance.value.length +
         dataStudentLate.value.length +
         dataStudentAbsence.value.length +
         dataStudentExcused.value.length;
});

const filteredStudents = computed(() => {
  return dataStudents.value.filter(student => {
    const nameMatch = student.student_name.toLowerCase().includes(searchQueryStudents.value.toLowerCase());

    return nameMatch;
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
      maxCapacity.value = scheduleData.planning.class.maxCapacity;
      campus_name.value = scheduleData.planning.campus.name;
      class_name.value = scheduleData.planning.class.name;
      program.value = scheduleData.planning.class.program;
      notes.value = scheduleData.notes || '';
      day.value = scheduleData.day;
      dayNumber.value = dayjs(scheduleData.date).format('DD/MM/YY');;

      sheetTeacherSelected.value = scheduleData.teachers.map(teacher => ({
        id: teacher.id,
        teacher_name: teacher.user.firstName + ' ' + teacher.user.lastName,
        teacher_img: teacher.user.image,
        teacher_type: 'Teacher'
      }));
      
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

const transformDatesYear = async () =>{
  if (year.value >= 2023 && year.value <= 2030) {
    year.value = year.value - 2000;
  }
};

const transformDatesMonth = async () => {
  month.value = String(month.value).padStart(2, '0');
};

onMounted(() => {
  planningId.value = route.query.planningId || 0;
   if (scheduleId.value) {
    getDailySchedule();
  }
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/edit-daily-attendance.scss';
</style>