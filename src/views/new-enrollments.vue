<template>
  <div id="students">
    <v-data-table :items="filteredStudents" :headers="headers" :items-per-page="15">
      <template v-slot:top>
        <v-text-field
          v-model="searchQuery"
          class="login-textfield"
          placeholder="Search"
          autocomplete="off"
          variant="solo" 
          maxlength="150"
          flat
          hide-details
          append-inner-icon="mdi-magnify"
        ></v-text-field>
      </template>

      <template v-slot:item.id_student="{ item }">
        <div class="flex center gap4">
          <div class="card-img-table">
            <img :src="item.student_img" alt="Img">
          </div>
          <span class="f16 w700" style="color: #474649;">{{ item.id_student }}</span>
        </div>
      </template>

      <template v-slot:item.center="{ item }">
        <div class="center">
          <span class="color-font-center">{{ item.center }}</span>
        </div>
      </template>

      <template v-slot:item.classroom="{ item }">
        <div class="center">
          <span class="color-font-classroom">{{ item.classroom }}</span>
        </div>
      </template>

      <template v-slot:item.classes="{ item }">
        <div class="center" v-html="item.classes"></div>
      </template>

      <template v-slot:item.nextClasses="{ item }">
        <div class="center" v-html="item.nextClasses"></div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex center gap2">
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/student-profile/${item.id}`)">mdi-eye-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="$router.push(`/home/edit-student/${item.id}`)">mdi-pencil-outline</v-icon>
          <v-icon color="#474649" size="24" class="pointer" @click="openDelete(item)">mdi-trash-can-outline</v-icon>
        </div>
      </template>
    </v-data-table>
    <!-- 
    <v-btn flat class="btn-floating" @click="$router.push('/home/student-registration')">
      <img src="@/assets/sources/icons/plus.svg" alt="Btn">
    </v-btn>
    -->

    <v-dialog v-model="dialogDelete" content-class="dialogDelete" persistent>
      <v-card class="card-delete">
        <img src="@/assets/sources/icons/trash.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to delete this student's record?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w600" style="color: #7583D9;">{{ nameStudent }}</span>
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
        <span class="f16 w400 tcenter">The record of student <span class="w600" style="color: #7583D9;">{{ nameStudent }}</span> has been successfully deleted.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="refreshData">Students Management</v-btn>
          <v-btn flat class="btn2" @click="$router.push('/home/student-registration')">New student</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import avatarImg from '@/assets/sources/images/avatar.svg';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);

const dialogDelete = ref(false);
const dialogConfirmation = ref(false);
const showAlert = inject('showAlert');
const dataStudents = ref([]);
const searchQuery = ref('');
const idStudent = ref('');
const nameStudent = ref('');
const loadingConfirmation = ref(false);

const openDelete = (item) => {
  idStudent.value = item.id;
  nameStudent.value = item.name;
  dialogDelete.value = true;
};

const openConfirmation = async () => {
  loadingConfirmation.value = true;

  try{
    await axiosInstance.delete(`/students/${idStudent.value}`);
    loadingConfirmation.value = false;
    dialogDelete.value = false;
    dialogConfirmation.value = true;
  }catch(error){
    showAlert('Failed to delete student record', 'error');
    loadingConfirmation.value = false;
  }
};

const headers = ref([
    { title: 'Id.', key: 'id_student', align:'center', sortable: false },
    { title: 'Student Name', key: 'name', align:'center', sortable: false },
    // { title: 'Age', key: 'age', align: 'center', sortable: false  },
    // { title: 'Gender', key: 'gender', align: 'center', sortable: false  },
    { title: 'Center', key: 'center', align: 'center', sortable: false  },
    { title: 'New/Assigned Class', key: 'classes', align: 'center', sortable: false  },
    { title: 'Start/Transition Date', key: 'dateOfTransition', align: 'center', sortable: false  },
    { title: 'Transition Classes', key: 'nextClasses', align: 'center', sortable: false  },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false  },
]);

const refreshData = () => {
  dialogConfirmation.value = false;
  getStudents();
};

const filteredStudents = computed(() => {
  if (!searchQuery.value) return dataStudents.value;
  
  const query = searchQuery.value.toLowerCase();
  return dataStudents.value.filter(student => {
    const safeToString = (value) => value ? value.toString().toLowerCase() : '';
    return (
      safeToString(student.name).includes(query) ||
      safeToString(student.age).includes(query) ||
      safeToString(student.gender).includes(query) ||
      safeToString(student.center).includes(query) ||
      safeToString(student.program).includes(query) ||
      safeToString(student.classes).includes(query)
    );
  }
  );
});

const getStudents = async () => {
  try {
    const response = await axiosInstance.get('/students');

    dataStudents.value = response.data.result
      .map((student) => {
        const birthDate = dayjs(student.dateOfBirth);
        const now = dayjs().utc().startOf('day');
        const years = now.diff(birthDate, 'year');
        const months = now.diff(birthDate, 'month') % 12;
        let ageDisplay = '';
        if (years > 0) {
          ageDisplay = `${years} Y ${months} M`;
        } else {
          ageDisplay = `${months} M`;
        }

        const start = student.startDateOfClasses ? dayjs(student.startDateOfClasses).utc().startOf('day') : null;
        const transition = student.startDateOfClassesTransition ? dayjs(student.startDateOfClassesTransition).utc().startOf('day') : null;

        const candidates = [];
        if (start && !start.isBefore(now)) {
          candidates.push({ type: 'start', date: start });
        }
        if (transition && !transition.isBefore(now)) {
          candidates.push({ type: 'transition', date: transition });
        }

        if (candidates.length === 0) return null;

        candidates.sort((a, b) => a.date - b.date);
        const chosen = candidates[0];

        // LÓGICA CORREGIDA:
        let classesForChosen = '';  // New/Assigned Class
        let otherClasses = '';       // Transition Classes

        if (chosen.type === 'start') {
          // Para fecha de inicio: mostrar classes en New/Assigned Class
          classesForChosen = Array.isArray(student.classes) 
            ? student.classes.map(c => c.name).join('<br>') 
            : '';
          // Transition Classes queda vacío para nuevos ingresos
          otherClasses = '';
        } else {
          // Para transición: mostrar classesTransition en New/Assigned Class y classes en Transition Classes
          otherClasses = Array.isArray(student.classesTransition) 
            ? student.classesTransition.map(c => c.name).join('<br>') 
            : '';
          classesForChosen = Array.isArray(student.classes) 
            ? student.classes.map(c => c.name).join('<br>') 
            : '';
        }

        return {
          id: student.id,
          student_img: student.image || avatarImg,
          name: student.firstName + ' ' + student.lastName,
          age: ageDisplay,
          gender: student.gender,
          dateOfTransitionRaw: chosen.date.format('YYYY-MM-DD'),
          dateOfTransition: chosen.date.format('MM-DD-YYYY'),
          center: student.campus ? student.campus.name : '',
          classes: classesForChosen,        // New/Assigned Class
          nextClasses: otherClasses,        // Transition Classes
          actions: ''
        };
      })
      .filter(student => student !== null)
      .sort((a, b) => {
        const dateA = dayjs(a.dateOfTransitionRaw);
        const dateB = dayjs(b.dateOfTransitionRaw);
        return dateA - dateB;
      })
      .map((student, index) => ({ ...student, id_student: index + 1 }));
  } catch (error) {
    console.error('Failed to load students', error);
  }
};

onMounted(() => {
  getStudents();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/students.scss';
</style>


