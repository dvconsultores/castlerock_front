<template>
  <div id="new-plan">
    <h3 class="font2" style="color: #262B63">New Weekly Schedule</h3>

    <v-row class="form-div" no-gutters>
      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="center"
          placeholder="Center"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['Center 1', 'Center 2']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="program"
          placeholder="Program"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['Primary', 'Toddler']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="classroom"
          placeholder="Classroom"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['Turtles', 'Lions']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="year"
          placeholder="Select the Year"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['2025', '2026']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="month"
          placeholder="Select the Month"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['March', 'April']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" sm="4" class="pb-0 pl-1 pr-1 pt-1">
        <v-autocomplete
          v-model="week"
          placeholder="Select the Week"
          flat
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          :items="['4th Week (Mon, Mar 24 - Sun, Mar 30)', '5th Week (Mon, Mar 31 - Sun, Apr 6)', 'All the weeks']"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-card flat class="card-rounded">
      <div v-for="(week, weekIndex) in monthlySchedule" :key="weekIndex" class="div-container-weeks-cards">
        <h3>{{ week.weekTitle }}</h3>
        <div class="slider-div">
          <v-card flat v-for="(day, dayIndex) in week.days" :key="dayIndex" @click="$router.push('/daily-schedule')">
            <div class="div-header">
              <span>{{ day.date }}</span>
            </div>

            <div class="techaer-div">
              <div class="rounder-avatar">
                <img :src="day.imgUser" alt="User">
              </div>
              <div class="flexstart flexcol" style="color: #4E444B;">
                <span class="f12 tstart font2">{{ day.teacherName }}</span>
                <span class="f10 tstart">{{ day.teacherType }}</span>
              </div>
            </div>

            <div class="students-div">
              <div class="students-img-div">
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
                <div class="img-student-card">
                  <img :src="day.imgStudent" alt="Student">
                </div>
              </div>

              <div class="attendance-div">
                <v-sheet>
                  <span class="f16" style="color: #4E444B;">+{{day.realStudent}}</span>
                </v-sheet>
              </div>
            </div>

            <div class="time-zone-div">
              <span class="f10 w600">{{ day.place }}</span>
              <span class="f10 w600" style="color: #7583D9;">{{ day.time }}</span>
            </div>

            <div class="flex center mt-2" style="gap: 10px;">
              <v-icon color="#474649">mdi-eye-outline</v-icon>
              <v-icon color="#474649">mdi-pencil-outline</v-icon>
              <v-icon color="#474649">mdi-trash-can-outline</v-icon>
            </div>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import imgUser from '@/assets/sources/images/user.png';
import imgUser2 from '@/assets/sources/images/user-2.png';
import imgStudent from '@/assets/sources/images/student-1.png';

const monthlySchedule = ref([
  {
    weekTitle: "1st Week - March",
    days: [
      {
        date: 'Monday, 3',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Tuesday, 4',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Wednesday, 5',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Thursday, 6',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Friday, 7',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Saturday, 8',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Sunday, 9',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
    ]
  },
  {
    weekTitle: "2nd Week - March",
    days: [
    {
        date: 'Monday, 10',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Tuesday, 11',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Wednesday, 12',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Thursday, 13',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Friday, 14',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Saturday, 15',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Sunday, 16',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
    ]
  },
  {
    weekTitle: "3rd Week - March",
    days: [
    {
        date: 'Monday, 17',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Tuesday, 18',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Wednesday, 19',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Thursday, 20',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Friday, 21',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
      {
        date: 'Saturday, 22',
        imgUser: imgUser2,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '5',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 2'
      },
      {
        date: 'Sunday, 23',
        imgUser: imgUser,
        teacherName: 'Samantha Taylor',
        teacherType: 'Teacher',
        imgStudent: imgStudent,
        realStudent: '3',
        time: '9:00 am - 12:15pm',
        place: 'Classroom 1'
      },
    ]
  },
]);
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-weekly-schedule.scss';
</style>
