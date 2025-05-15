<template>
  <div id="home">
    <div class="title-home-div">
      <div class="div1">
        <h3 class="tstart">Good morning,<br>{{ userName }} {{ userLastName }}!</h3>
      </div>

      <div class="divcol div2">
        <h3>{{ formattedDateTime }}</h3>
        <span>{{ weekInfo }}</span>
      </div>
    </div>

    <div class="sheet-menu-div mt-10">
      <v-sheet v-for="(item, index) in dataSheets" :key="index" class="sheet-menu pointer" @click="$router.push(item.route)">
        <div class="flexstart flexcol">
          <img :src="item.imgIcon" alt="Calendar">
          <div class="jspace fullw">
            <span class="f18 f14-mobile w600  mt-1">{{ item.titleSheet }}</span>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
          <span class="f14 f10-mobile w400">{{ item.subTitleSheet }}</span>
        </div>
      </v-sheet>
    </div>

    <h3 class="font2 mb-0 mt-8 h3-on">Ongoing Classes</h3>
    <div class="ongoing-classes-div">
      <div class="cards-ongoing-div">
        <v-card flat v-for="(item, index) in dataClasses" :key="index">
          <div class="div-header">
            <span>{{ item.date }}</span>
          </div>

          <div class="techaer-div">
            <div class="rounder-avatar">
              <img :src="item.imgUser" alt="User">
            </div>
            <div class="flexstart flexcol" style="color: #4E444B;">
              <span class="f12 tstart font2">{{ item.teacherName }}</span>
              <span class="f10 tstart">{{ item.teacherType }}</span>
            </div>
          </div>

          <div class="students-div">
            <div class="students-img-div">
              <div class="img-student-card">
                <img :src="item.imgStudent" alt="Student">
              </div>
              <div class="img-student-card">
                <img :src="item.imgStudent" alt="Student">
              </div>
              <div class="img-student-card">
                <img :src="item.imgStudent" alt="Student">
              </div>
              <div class="img-student-card">
                <img :src="item.imgStudent" alt="Student">
              </div>
              <div class="img-student-card">
                <img :src="item.imgStudent" alt="Student">
              </div>
            </div>

            <div class="attendance-div">
              <span class="f8 tend" style="color: #4E444B;">Attendance</span>

              <v-sheet>
                <span class="f16" style="color: #4E444B;">{{item.realAttendance}}/{{ item.estimatedAttendance }}</span>
              </v-sheet>
            </div>
          </div>

          <div class="time-zone-div">
            <span class="f10 w600">{{ item.place }}</span>
            <span class="f10 w600" style="color: #7583D9;">{{ item.time }}</span>
          </div>

          <div class="flex center mt-2" style="gap: 10px;">
            <v-icon color="#474649">mdi-eye-outline</v-icon>
            <v-icon color="#474649">mdi-pencil-outline</v-icon>
          </div>
        </v-card>
      </div>
    </div>
    
    <div class="before-div mt-6">
      <h3 class="font2 tleft" style="color: #4E444B;">Before</h3>      

      <div class="div-sheet">
        <v-sheet v-for="(item, index) in sheetDataTeachers" :key="index" class="sheet-teachers">
          <div class="flex center gap1">
            <div class="flexcol center">
              <span class="tcenter font2 f11" style="color: #4E444B;">{{ item.center_desc }}</span>
              <span class="w600 f10 tcenter" style="color: #7583D9;">{{ item.time_desc }}</span>
            </div>
            <v-icon color="#46464C" size="24">mdi-chevron-right</v-icon>
          </div>

          <hr>

          <div class="teacher-info-div mt-1"> 
            <div class="img-teacher-card">
              <img :src="item.teacher_img" alt="user">
            </div>
            <div class="flexcol">
              <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.tecaher_name }}</span>
              <span class="f10 tleft" style="color: #4E444B;">{{ item.teacher_type }}</span>
            </div>
          </div>
        </v-sheet>
      </div>
    </div>

    <div class="absences-div mt-6">
      <h3 class="font2 tleft mb-2" style="color: #4E444B;">Today's Absences</h3>      
      <span class="f18 w400 tleft mb-6" style="color: #262B63;">Monday ( March 24, 2025 )</span>

      <div class="div-sheet-absences">
        <v-sheet v-for="(item, index) in sheetDataAbsences" :key="index" class="sheet-absences">
          <div class="absences-info-div mt-1"> 
            <div class="img-absences-card">
              <img :src="item.absence_img" alt="user">
            </div>

            <div class="flexcol">
              <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.absences_name }}</span>
              <span class="f10 tleft" style="color: #4E444B;">{{ item.center_desc }}</span>
            </div>
            
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import calendar from '@/assets/sources/icons/calendar.svg';
import classroms from '@/assets/sources/icons/classroms.svg';
import students from '@/assets/sources/icons/students.svg';
import teachers from '@/assets/sources/icons/teachers.svg';
import centers from '@/assets/sources/icons/centers.svg';
import imgUser from '@/assets/sources/images/user.png';
import imgUser2 from '@/assets/sources/images/user-2.png';
import imgStudent from '@/assets/sources/images/student-1.png';
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/en';

dayjs.extend(weekOfYear);
dayjs.extend(isLeapYear);
dayjs.locale('en');

const currentDate = ref(dayjs()); 

const formattedDateTime = computed(() => {
  return currentDate.value.format('MMMM D, YYYY / hh:mm a');
});

const getWeekOfMonth = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week');
  
  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'day') + 1;
  return Math.ceil((date.date() + offset) / 7);
};

const weekInfo = computed(() => {
  const weekOfMonth = getWeekOfMonth(currentDate.value);
  console.log('Week of Month:', weekOfMonth);
  const startOfWeek = currentDate.value.startOf('week');
  const endOfWeek = currentDate.value.endOf('week');
  
  return `${weekOfMonth}${getOrdinalSuffix(weekOfMonth)} Week (${startOfWeek.format('ddd, MMM D')} - ${endOfWeek.format('ddd, MMM D')})`;
});

function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};


const userName = ref('User');
const userLastName = ref('');
const isLoading = ref(true);

const loadUserData = async () => {
  const userId = localStorage.getItem('idUser');
  if (!userId) {
    console.error('No user ID found in localStorage');
    isLoading.value = false;
    return;
  }

  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    console.log('User data response:', response.data);
    
    if (response.data?.result) {
      const userData = response.data.result;
      userName.value = userData.firstName || userData.firstname || '';
      userLastName.value = userData.lastName || userData.lastname || '';
    } else {
      console.error('Unexpected response format:', response.data);
    }
  } catch (error) {
    console.error('Failed to load user data:', error.response?.data || error.message);
  } finally {
    isLoading.value = false;
  }
}

const sheetDataAbsences = ref ([
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
  {
    absence_img: imgStudent,
    absences_name: 'Samantha Taylor',
    center_desc: 'Center 1 - Lions'
  },
])

const sheetDataTeachers = ref([
  {
    center_desc: 'Turtles - Center 1',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser,
    tecaher_name: 'Samantha Taylor',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 2',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser2,
    tecaher_name: 'Mark Jason',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 1',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser,
    tecaher_name: 'Samantha Taylor',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 2',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser2,
    tecaher_name: 'Mark Jason',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 1',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser,
    tecaher_name: 'Samantha Taylor',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 2',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser2,
    tecaher_name: 'Mark Jason',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 1',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser,
    tecaher_name: 'Samantha Taylor',
    teacher_type: 'Teacher',
  },
  {
    center_desc: 'Turtles - Center 2',
    time_desc: '1:00pm - 5:00pm',
    teacher_img: imgUser2,
    tecaher_name: 'Mark Jason',
    teacher_type: 'Teacher',
  },
]);

const dataClasses = ref([
  {
    date: 'Monday, 24',
    imgUser: imgUser,
    teacherName: 'Samantha Taylor',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '5',
    estimatedAttendance: '8',
    place: 'LIONS - Center 1',
    time:'9:00 am - 12:15pm',
  },
  {
    date: 'Monday, 24',
    imgUser: imgUser2,
    teacherName: 'Olivia Bennett',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '7',
    estimatedAttendance: '8',
    place: 'LIONS - Center 2',
    time:'9:00 am - 12:15pm',
  },
  {
    date: 'Monday, 24',
    imgUser: imgUser,
    teacherName: 'Samantha Taylor',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '5',
    estimatedAttendance: '8',
    place: 'LIONS - Center 1',
    time:'9:00 am - 12:15pm',
  },
  {
    date: 'Monday, 24',
    imgUser: imgUser2,
    teacherName: 'Olivia Bennett',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '7',
    estimatedAttendance: '8',
    place: 'LIONS - Center 2',
    time:'9:00 am - 12:15pm',
  },
  {
    date: 'Monday, 24',
    imgUser: imgUser,
    teacherName: 'Samantha Taylor',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '5',
    estimatedAttendance: '8',
    place: 'LIONS - Center 1',
    time:'9:00 am - 12:15pm',
  },
  {
    date: 'Monday, 24',
    imgUser: imgUser2,
    teacherName: 'Olivia Bennett',
    teacherType: 'Teacher',
    imgStudent: imgStudent,
    realAttendance: '7',
    estimatedAttendance: '8',
    place: 'LIONS - Center 2',
    time:'9:00 am - 12:15pm',
  },
]);

const dataSheets = ref([
  {
    imgIcon: calendar,
    titleSheet: 'New Enrollment',
    subTitleSheet: 'Plan Your Week',
    route: "/home/new-weekly-schedule",
  },
  {
    imgIcon: classroms,
    titleSheet: 'Create a Class',
    subTitleSheet: 'Add class',
    route: '/home/new-classroom',
  },
  {
    imgIcon: students,
    titleSheet: 'New Student',
    subTitleSheet: 'Register a Student',
    route: '/home/student-registration',
  },
  {
    imgIcon: teachers,
    titleSheet: 'New Teacher',
    subTitleSheet: 'Register a Teacher',
    route: '/home/new-teacher'
  },
  {
    imgIcon: centers,
    titleSheet: 'New Center',
    subTitleSheet: 'Register a Center',
    route: '/home/new-center'
  }
]);


onMounted(() => {
  loadUserData();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/home.scss';
</style>


