<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      Weekly Programs Snapshot
    </h3>

    <!-- <h5 class="font2 tleft mt-2 mb-6 ml-0" style="color: #4E444B;">
      {{ todayDateString }}
        {{ activeDay }}
    </h5> -->

    <div class="tabs-divs-programs">
      <v-tabs
        v-model="tab_program"
        align-tabs="center"
        color="#FFFFFF"
        height="36"
        :mobile-breakpoint="0"
        bg-color="#F0F0F0"
      >
        <v-tab v-for="(program, index) in dataProgramsStudents" :key="program.id" :value="program.id" rounded="lg" selected-class="tab-active" class="tab-inactive-program ml-0">
          {{ program.name }}
        </v-tab>
      </v-tabs>
    </div>

    <!-- <div class="tabs-divs">
      <v-tabs
        v-model="tab_weekday"
        align-tabs="center"
        color="#FFFFFF"
        height="36"
        bg-color="#F0F0F0"
      >
        <v-tab :value="1" rounded="lg" selected-class="tab-active" class="tab-inactive ml-0">Monday</v-tab>
        <v-tab :value="2" rounded="lg" selected-class="tab-active" class="tab-inactive">Tuesday</v-tab>
        <v-tab :value="3" rounded="lg" selected-class="tab-active" class="tab-inactive">Wednesday</v-tab>
        <v-tab :value="4" rounded="lg" selected-class="tab-active" class="tab-inactive">Thursday</v-tab>
        <v-tab :value="5" rounded="lg" selected-class="tab-active" class="tab-inactive">Friday</v-tab>

        <v-tab :value="1" rounded="lg" selected-class="tab-active" class="tab-inactive tab-mobile ml-0">Mon</v-tab>
        <v-tab :value="2" rounded="lg" selected-class="tab-active" class="tab-inactive tab-mobile">Tue</v-tab>
        <v-tab :value="3" rounded="lg" selected-class="tab-active" class="tab-inactive tab-mobile">Wed</v-tab>
        <v-tab :value="4" rounded="lg" selected-class="tab-active" class="tab-inactive tab-mobile">Thu</v-tab>
        <v-tab :value="5" rounded="lg" selected-class="tab-active" class="tab-inactive tab-mobile">Fri</v-tab>
      </v-tabs>
    </div> -->

    <v-row class="fullw mt-0">
      <v-col cols="12" sm="12">
        <div class="big-div big-div-spot">
          <h5 class="font2 f24 tleft mb-0" style="color: #262262; text-transform: capitalize;">Program Roster - {{ selectedProgram ? selectedProgram.name : '' }}</h5>
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

          <span class="f18 font2 tleft mt-4 mb-4" style="color: #262262;">
            Students: {{ selectedProgram && selectedProgram.students ? selectedProgram.students.length : 0 }}
          </span>

          <!-- New: resumen por clase usando classesSummary -->
          <!-- <v-sheet v-for="(cls, idx) in classesSummary" :key="`cls-${cls.classId}-${idx}`" class="sheet-teacher mb-2">
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
                <span class="f16 font2">{{ cls.className }}: {{ cls.studentsCount }} </span>
              </div>
            </div>
          </v-sheet> -->


            <!-- Mostrar una v-sheet por cada estudiante del programa seleccionado -->
            <template v-if="selectedProgram && selectedProgram.students && selectedProgram.students.length">
              <v-sheet v-for="student in selectedProgram.students" :key="student.id" class="sheet-teacher mb-2">
                <div class="absences-info-div"> 
                  <div class="flexcol" style="color: #262262;">
                    <span class="f16 font2">{{ student.firstName }} {{ student.lastName }}</span>
                  </div>
                </div>
              </v-sheet>
            </template>
            <v-sheet v-else class="sheet-teacher mb-2">
              <div class="absences-info-div"> 
                <div class="flexcol" style="color: #262262;">
                  <span class="f14">No students</span>
                </div>
              </div>
            </v-sheet>

          <!-- <v-sheet v-for="(item, index) in dataClass" :key="index" class="sheet-teacher">
            <div class="absences-info-div"> 
              <div class="img-absences-card">
                <img :src="item.img_class" alt="user"> 
              </div>

              <div class="flexcol" style="color: #262262;">
                <span>{{item.class_name}} {{item.current_students}}/{{ item.max_students }}</span>
              </div>
            </div>
          </v-sheet> -->

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

    <v-overlay v-model="dialogLoader" persistent class="align-center justify-center">
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>


<script setup>
import { ref, onMounted, inject, computed } from 'vue';
import axiosInstance from '@/plugins/axios';

const dialogLoader = ref(false);
const showAlert = inject('showAlert');
const dataProgramsStudents = ref([]);
const tab_program = ref(null); // id del programa seleccionado

const selectedProgram = computed(() => {
  return dataProgramsStudents.value.find(p => p.id === tab_program.value) || null;
});

const getPrograms = async () => {
  try {
    const response = await axiosInstance.get('/additional-programs/with-students');
    dataProgramsStudents.value = response.data.result;
    // Seleccionar el primer programa por defecto
    if (dataProgramsStudents.value.length > 0) {
      tab_program.value = dataProgramsStudents.value[0].id;
    }
  } catch (error) {
    showAlert('Error fetching programs', 'error');
  }
};

onMounted(() => {
  getPrograms();
});


</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>