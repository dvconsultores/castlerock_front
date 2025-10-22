<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      Daily Roster Snapshot
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      {{ todayDateString }}
    </h5>

    <v-row class="fullw mt-10">
      <v-col cols="12" sm="12">
        <div class="big-div big-div-spot">
          <h5 class="font2 f24 tleft mb-0" style="color: #262262;">Daily Plan</h5>
          <hr>

          <!-- <v-sheet v-for="(item, index) in sheetTeacherSelected" :key="index" class="sheet-teacher">
            <div class="absences-info-div"> 
              <div class="img-absences-card">
                <img :src="item.teacher_img" alt="user">
              </div>

              <div class="flexcol">
                <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.teacher_name }}</span>
                <span class="f10 tleft" style="color: #4E444B;">{{ item.teacher_type }}</span>
              </div>
            </div>
          </v-sheet> -->

          <span class="f16 font2 tleft mt-4 mb-4" style="color: #262262;">
            Students {{dataStudents.length}}/ {{ maxCapacity }}
          </span>

          <!-- New: resumen por clase usando classesSummary -->
          <v-sheet v-for="(cls, idx) in classesSummary" :key="`cls-${cls.classId}-${idx}`" class="sheet-teacher mb-2">
            <div class="absences-info-div"> 
              <div class="img-absences-card">
                <template v-if="cls.image">
                  <img :src="cls.image" alt="class image"> 
                </template>
                <template v-else>
                  <div class="no-image f12">No image</div>
                </template>
              </div>

              <div class="flexcol" style="color: #262262;">
                <span class="f16 font2">{{ cls.className }} {{ cls.studentsCount }} / {{ cls.maxCapacity }}</span>
              </div>
            </div>
          </v-sheet>

          <v-sheet v-for="(item, index) in dataClass" :key="index" class="sheet-teacher">
            <div class="absences-info-div"> 
              <div class="img-absences-card">
                <img :src="item.img_class" alt="user"> 
              </div>

              <div class="flexcol" style="color: #262262;">
                <span>{{item.class_name}} {{item.current_students}}/{{ item.max_students }}</span>
              </div>
            </div>
          </v-sheet>

          <!-- <div class="students-selected-container container-for-daily-roster">
            <v-card v-for="(item, index) in dataStudents" :key="index" flat>
              <div class="rounde-div">
                <img :src="item.student_img" alt="Student">
              </div>
              <span class="f12 font2 tcenter" style="color: #4E444B;">
                {{item.student_name}}
              </span>
              <span class="f10 w400 tcenter" style="color: #4E444B;">
                {{item.student_class}}
              </span>
            </v-card>
          </div> -->

          <!-- <v-textarea
          v-model="notes"
          density="compact"
          placeholder="There are no notes" variant="solo"
          flat
          readonly
          hide-details
          bg-color="#F0F0F0"
          class="text-area mt-8 fullw"
          ></v-textarea> -->
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
const campus_name = ref('');
const sheetTeacherSelected = ref([]);
const maxCapacity = ref(0);
const classesSummary = ref([]);
const todayDateString = dayjs().format('MM/DD/YYYY');

const getDailyScheduleToday = async () => {
  try {
    const todayDateString = dayjs().format('YYYY-MM-DD'); 

    const response = await axiosInstance.get(`/daily-schedules/`);
    const scheduleData = response.data.result; 

    const filteredSchedule = scheduleData.filter(schedule => {
      return schedule.date === todayDateString;
    });

    const processedData = filteredSchedule.reduce((accumulator, schedule) => {
      
      const campusName = schedule.planning.campus.name;
      const maxCapacity = schedule.planning.class.maxCapacity;

      const studentsWithCampus = schedule.students.map(student => ({
        firstName: student.firstName,
        lastName: student.lastName,
        image: student.image,
        campusName: campusName, 
        className: schedule.planning.class.name
      }));

      accumulator.allStudents.push(...studentsWithCampus);

      accumulator.totalStudents += schedule.students.length;
      accumulator.totalMaxCapacity += maxCapacity;

      return accumulator;
    }, { 
        allStudents: [], 
        totalStudents: 0, 
        totalMaxCapacity: 0 
    });

    console.log('Datos Procesados del Día:', processedData);

    dataStudents.value = processedData.allStudents.map(student => ({
      student_img: student.image || imgAvatar,
      student_name: `${student.firstName} ${student.lastName}`,
      student_class: student.className || '',
    }));

    const classMap = new Map();
    filteredSchedule.forEach(schedule => {
      const classId = schedule.planning.class.id;
      const className = schedule.planning.class.name;
      const classImage = schedule.planning.class.image || null;
      const classMax = schedule.planning.class.maxCapacity || 0;
      const studentsCount = schedule.students ? schedule.students.length : 0;

      if (!classMap.has(classId)) {
        classMap.set(classId, {
          classId,
          className,
          studentsCount,
          maxCapacity: classMax,
          image: classImage
        });
      } else {
        const existing = classMap.get(classId);
        existing.studentsCount += studentsCount;
        existing.maxCapacity += classMax; 
        classMap.set(classId, existing);
      }
    });

    classesSummary.value = Array.from(classMap.values());

    maxCapacity.value = processedData.totalMaxCapacity || dataStudents.value.length;

    return processedData;
    
  } catch (error) {
    showAlert(error.response?.data?.message || 'Failed to load schedule', 'error');
  }
};


onMounted(() => {
  getDailyScheduleToday();
  
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>