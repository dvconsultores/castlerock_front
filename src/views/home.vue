<template>
  <div id="home">
    <div class="title-home-div">
      <div class="div1">
        <h3 class="tstart">Hello,<br>{{ userName }} {{ userLastName }}!</h3>
      </div>

      <div class="divcol div2">
        <h3>{{ formattedDateTime }}</h3>
        <span>{{ weekInfo }}</span>
      </div>
    </div>

    <div v-if="!isTeacher" class="sheet-menu-div mt-10">
      <v-sheet v-for="(item, index) in dataSheets" :key="index" class="sheet-menu pointer" @click="item.onClick ? item.onClick() : $router.push(item.route)">
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

    <h3 class="font2 mb-0 mt-8 h3-on">Daily Roster</h3>
    <div class="ongoing-classes-div">
      <div class="cards-ongoing-div">
        <v-card flat v-for="(item, index) in dataClasses" :key="index">
          <div class="div-header">
            <span>{{ item.date }}</span>
          </div>

          <!-- <div class="techaer-div">
            <div class="rounder-avatar">
              <img :src="item.imgUser" alt="User">
            </div>
            <div class="flexstart flexcol" style="color: #4E444B;">
              <span class="f12 tstart font2">{{ item.teacherName }}</span>
              <span class="f10 tstart">{{ item.teacherType }}</span>
            </div>
          </div> -->

          <div class="slider-teacher">
            <span v-for="(teacher, index) in item.teachers" :key="index" class="f12 tstart font2">
              {{ teacher.user.firstName }} {{ teacher.user.lastName }} - Teacher
            </span>
          </div>

          <span class="f10 tstart font2">
            Students
          </span>

          <div class="students-div">
            <div class="students-names">
              <span
                v-for="(student, index) in item.students"
                :key="index"
                class="f11 tstart font2 mr-4"
              >
                {{ student.firstName || '' }} {{ student.lastName || '' }}
              </span>
            </div>

            <div class="attendance-div">
              <span class="f8 tend" style="color: #4E444B;">Availability</span>

              <v-sheet>
                <span class="f12" style="color: #4E444B;">{{item.dataAvailability}}</span>
              </v-sheet>
            </div>
          </div>

          <div class="time-zone-div mb-4">
            <span class="f10 w600">{{ item.place }}</span>
            <!-- <span class="f10 w600" style="color: #7583D9;">{{ item.time }}</span> -->
          </div>

          <div class="flex center mt-2" style="gap: 10px;">
            <v-icon color="#474649" @click="$router.push(`/home/view-daily-spot/${item.id}`)">mdi-calendar</v-icon>
            <v-icon color="#474649" @click="$router.push(`/home/view-daily-schedule/${item.id}`)">mdi-eye-outline</v-icon>
            <v-icon color="#474649" @click="$router.push(`/home/edit-daily-attendance/${item.id}`)">mdi-pencil-outline</v-icon>
          </div>
        </v-card>

        <div v-if="dataClasses.length === 0" class="no-data-div">
          <span>No data available</span>
        </div>
      </div>
    </div>

    <h3 class="font2 mb-0 mt-8 h3-on">Next Day Roster</h3>
    <div class="ongoing-classes-div">
      <div class="cards-ongoing-div">
        <v-card flat v-for="(item, index) in dataClassesBefore" :key="index">
          <div class="div-header">
            <span>{{ item.date }}</span>
          </div>

          <!-- <div class="techaer-div">
            <div class="rounder-avatar">
              <img :src="item.imgUser" alt="User">
            </div>
            <div class="flexstart flexcol" style="color: #4E444B;">
              <span class="f12 tstart font2">{{ item.teacherName }}</span>
              <span class="f10 tstart">{{ item.teacherType }}</span>
            </div>
          </div> -->

          <div class="slider-teacher">
            <span v-for="(teacher, index) in item.teachers" :key="index" class="f12 tstart font2">
              {{ teacher.user.firstName }} {{ teacher.user.lastName }} - Teacher
            </span>
          </div>

          <span class="f10 tstart font2">
            Students
          </span>

          <div class="students-div">
            <div class="students-names">
              <span
                v-for="(student, index) in item.students"
                :key="index"
                class="f11 tstart font2 mr-4"
              >
                {{ student.firstName || '' }} {{ student.lastName || '' }}
              </span>
            </div>

            <div class="attendance-div">
              <span class="f8 tend" style="color: #4E444B;">Availability</span>

              <v-sheet>
                <span class="f12" style="color: #4E444B;">{{item.dataAvailability}}</span>
              </v-sheet>
            </div>
          </div>

          <div class="time-zone-div mb-4">
            <span class="f10 w600">{{ item.place }}</span>
            <!-- <span class="f10 w600" style="color: #7583D9;">{{ item.time }}</span> -->
          </div>

          <div class="flex center mt-2" style="gap: 10px;">
            <v-icon color="#474649" @click="$router.push(`/home/view-daily-spot/${item.id}`)">mdi-calendar</v-icon>
            <v-icon color="#474649" @click="$router.push(`/home/view-daily-schedule/${item.id}`)">mdi-eye-outline</v-icon>
            <v-icon color="#474649" @click="$router.push(`/home/edit-daily-attendance/${item.id}`)">mdi-pencil-outline</v-icon>
          </div>
        </v-card>

        <div v-if="dataClassesBefore.length === 0" class="no-data-div">
          <span>No data available</span>
        </div>
      </div>
    </div>
    
    <!-- <div class="before-div mt-6">
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
    </div> -->

    <h3 class="font2 mb-0 mt-8 h3-on">Spots Available</h3>
    <div class="ongoing-classes-div-absence">
      <div class="cards-ongoing-div">
        <v-card flat v-for="(item, index) in dataClasses" :key="index">
          <div class="div-header">
            <span>{{ item.date }}</span>
          </div>

          <div class="time-zone-div mb-4">
            <span class="f16 w600">{{ item.place }}</span>
          </div>

          <div class="students-div">
            <div class="attendance-div">
              <span class="f16 tend" style="color: #4E444B;">Availability</span>

              <v-sheet>
                <span class="f14" style="color: #4E444B;">{{item.dataAvailability}}</span>
              </v-sheet>
            </div>
          </div>
        </v-card>

        <div v-if="dataClasses.length === 0" class="no-data-div">
          <span>No data available</span>
        </div>
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
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import 'dayjs/locale/en';
import avatarImg from '@/assets/sources/images/avatar.svg';
import { useRouter } from 'vue-router';

const router = useRouter();  
const showAlert = inject('showAlert');
const isTeacher = ref(false);

dayjs.extend(weekOfYear);
dayjs.extend(isLeapYear);
dayjs.locale('en');

const currentDate = ref(dayjs()); 

const formattedDateTime = computed(() => {
  return currentDate.value.format('MMMM D, YYYY / hh:mm a');
});

const formattedDateAbsence = computed(() => {
  return currentDate.value.format('dddd (MMMM D, YYYY)');
});

const getWeekOfMonth = (date) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week');
  
  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'day') + 1;
  return Math.ceil((date.date() + offset) / 7);
};

const weekInfo = computed(() => {
  const weekOfMonth = getWeekOfMonth(currentDate.value);
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

const sheetDataAbsences = ref ([]);

// const sheetDataTeachers = ref([
//   {
//     center_desc: 'Turtles - Center 1',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser,
//     tecaher_name: 'Samantha Taylor',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 2',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser2,
//     tecaher_name: 'Mark Jason',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 1',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser,
//     tecaher_name: 'Samantha Taylor',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 2',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser2,
//     tecaher_name: 'Mark Jason',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 1',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser,
//     tecaher_name: 'Samantha Taylor',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 2',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser2,
//     tecaher_name: 'Mark Jason',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 1',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser,
//     tecaher_name: 'Samantha Taylor',
//     teacher_type: 'Teacher',
//   },
//   {
//     center_desc: 'Turtles - Center 2',
//     time_desc: '1:00pm - 5:00pm',
//     teacher_img: imgUser2,
//     tecaher_name: 'Mark Jason',
//     teacher_type: 'Teacher',
//   },
// ]);

const goToNewWeeklySchedule = () => {
  localStorage.removeItem('idCenter');
  localStorage.removeItem('centerName');
  localStorage.removeItem('idClass');
  localStorage.removeItem('className');
  localStorage.removeItem('idYear');
  localStorage.removeItem('yearName');
  localStorage.removeItem('idMonth');
  localStorage.removeItem('monthName');
  router.push('/home/new-weekly-schedule');
};

const dataSheets = ref([
  {
    imgIcon: calendar,
    titleSheet: 'Enrollment',
    subTitleSheet: 'Plan Your Week',
    onClick: goToNewWeeklySchedule,
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
    titleSheet: 'Teacher',
    subTitleSheet: 'Assign a Classroom',
    route: '/home/new-teacher'
  },
  {
    imgIcon: centers,
    titleSheet: 'New Center',
    subTitleSheet: 'Register a Center',
    route: '/home/new-center'
  }
]);

const scheduleData = ref([]);
const dataClasses = ref([]);
const dataClassesBefore = ref([]);

const loadDaily = async () => {
  try {
    const response = await axiosInstance.get(`/daily-schedules/`);
    const today = currentDate.value.format('YYYY-MM-DD');
    const todayClasses = response.data.result.filter(item => item.date === today);
    console.log('Today Classes:', todayClasses);
    scheduleData.value = todayClasses;
    dataClasses.value = todayClasses.map(item => ({
      id: item.id,
      date: `${item.day}, ${currentDate.value.format('D')}`,
      imgUser: item.teacher?.user.image || null,
      teacherName: item.teacher?.user.firstName + ' ' + item.teacher?.user.lastName || 'Teacher',
      teacherType: 'Teacher',
      imgStudent: item.students?.[0]?.image || avatarImg,
      imgStudent2: item.students?.[1]?.image || null,
      imgStudent3: item.students?.[2]?.image || null,
      imgStudent4: item.students?.[3]?.image || null,
      imgStudent5: item.students?.[4]?.image || null,
      realAttendance: item.students?.length || 0,
      estimatedAttendance: item.planning?.class?.maxCapacity,
      dataAvailability: item.planning?.class?.maxCapacity - item.students?.length,
      place: item.planning?.class?.name,
      time: '9:00 am - 12:15pm',
      teachers: item.teachers || [],
      students: item.students || []
    }));
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};

const loadDailyBefore = async () => {
  try {
    const response = await axiosInstance.get(`/daily-schedules/`);
    const tomorrow = currentDate.value.add(1, 'day').format('YYYY-MM-DD');
    const tomorrowClasses = response.data.result.filter(item => item.date === tomorrow);
    
    scheduleData.value = tomorrowClasses;
    dataClassesBefore.value = tomorrowClasses.map(item => ({
      id: item.id,
      date: `${item.day}, ${currentDate.value.add(1, 'day').format('D')}`,
      imgUser: item.teacher?.user.image || null,
      teacherName: item.teacher?.user.firstName + ' ' + item.teacher?.user.lastName || 'Teacher',
      teacherType: 'Teacher',
      imgStudent: item.students?.[0]?.image || avatarImg, 
      imgStudent2: item.students?.[1]?.image || null,
      imgStudent3: item.students?.[2]?.image || null,
      imgStudent4: item.students?.[3]?.image || null,
      imgStudent5: item.students?.[4]?.image || null,
      realAttendance: item.students?.length || 0,
      estimatedAttendance: item.planning?.class?.maxCapacity,
      dataAvailability: item.planning?.class?.maxCapacity - item.students?.length,
      place: item.planning?.class?.name,
      time: '9:00 am - 12:15pm',
      teachers: item.teachers || [],
      students: item.students || []
    }));
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};

const getAttendance = async () => {
  try {
    const response = await axiosInstance.get(`/attendances/`);
    const today = currentDate.value.format('YYYY-MM-DD');
    const todayAbsences = response.data.result.filter(item =>
      item.date === today && item.status === 'Absent'
    );
    
    sheetDataAbsences.value = todayAbsences.map(item => ({
      absence_img: item.student?.image || avatarImg,
      absences_name: item.student?.firstName + ' ' + item.student?.lastName.trim(),
      center_desc: item.dailySchedule?.class?.name || 'Center 1 - Lions'
    }));
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load attendance', 'error');
  }
};

onMounted(() => {
  loadUserData();
  loadDaily();
  loadDailyBefore();
  getAttendance();
  isTeacher.value = localStorage.getItem('userRole') === 'TEACHER';
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/home.scss';
</style>


