<template>
  <div id="daily-plan">
    <h3 class="font2 tleft" style="color: #262B63;">
      Classroom Turtle - Primary
    </h3>
    <h5 class="font2 tleft" style="color: #4E444B;">
      Monday, 24 / 03 / 25 - (Center 1)
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
              bg-color="#F8F8F8"
              variant="solo" 
              flat
              hide-details
              append-inner-icon="mdi-magnify"
            ></v-text-field>

            <hr>

            <div class="scroll-div">
              <v-sheet v-for="(item, index) in sheetDataTeachers" :key="index" class="sheet-absences">
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
              bg-color="#F8F8F8"
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
                @click="toggleAllDays"
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
              <v-sheet v-for="(item, index) in sheetDataStudents" :key="index" class="sheet-absences">
                <div class="absences-info-div"> 
                  <div class="img-absences-card">
                    <img :src="item.student_img" alt="user">
                  </div>

                  <div class="flexcol">
                    <span class="f12 font2 tleft" style="color: #4E444B;">{{ item.student_name }}</span>
                    <div>
                      <span class="f10 tleft" style="color: #4E444B;">{{ item.desc_program }}</span>
                      <span class="f10 tleft ml-1 w500" style="color: #6BBDAE;">{{ item.days_desc }}</span>
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

            <v-icon class="pointer">mdi-trash-can-outline</v-icon>
          </v-sheet>

          <span class="f16 font2 tleft mt-4 mb-4" style="color: #262262;">
            Students 0/8
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
                {{ item.days_selected }}
              </span>

              <v-icon>mdi-trash-can-outline</v-icon>
            </v-card>
          </div>

          <v-text-field
            class="login-textfield mt-16"
            placeholder="You can add a note here (optional)"
            bg-color="#F8F8F8"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>

          <v-row class="fullw" no-gutters>
            <v-col sm="2" cols="12" class="pr-1">
              <v-btn flat class="btn1">
                <v-icon class="mr-1">mdi-arrow-left-circle-outline</v-icon> Back to Day
              </v-btn>
            </v-col>
            <v-col sm="8" cols="12">
              <v-btn flat class="btn2">
                Save
              </v-btn>
            </v-col>
            <v-col sm="2" cols="12" class="pl-1">
              <v-btn flat class="btn3">
                Next Day <v-icon class="ml-1">mdi-arrow-right-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import imgUser from '@/assets/sources/images/user.png'
import imgStudent from '@/assets/sources/images/student-1.png'
import imgStudent2 from '@/assets/sources/images/student-2.png'

const all = ref(false);
const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);

const toggleAllDays = () => {
  const state = all.value;
  monday.value = state;
  tuesday.value = state;
  wednesday.value = state;
  thursday.value = state;
  friday.value = state;
  saturday.value = state;
  sunday.value = state;
};

const dataStudentSelected = ref([
  {
    student_img: imgStudent,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Sami Smith',
    student_program: 'Primary',
    days_selected: 'Mon, Tue, Wed, Thu, Fri'
  },
]);

const sheetTeacherSelected = ref([
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
])

const sheetDataStudents = ref([
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
  {
    student_img: imgStudent2,
    student_name: 'Samantha Taylor',
    desc_program: 'Primary',
    days_desc: 'Mon Tue Wed Thu, Fri'
  },
])

const sheetDataTeachers = ref ([
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
  {
    teacher_img: imgUser,
    teacher_name: 'Samantha Taylor',
    teacher_type: 'Teacher'
  },
])

const teachers_btn = ref(true);
const students_btn = ref(false);


const activeTeachers = () =>{
  teachers_btn.value = true;
  students_btn.value = false;
};

const activeStudents = () =>{
  students_btn.value = true;
  teachers_btn.value = false;
};

</script>

<style lang="scss">
@import '@/assets/styles/pages/daily-schedule.scss';
</style>