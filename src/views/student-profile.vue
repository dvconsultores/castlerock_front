<template>
  <div id="student-profile">
    <template v-if="data_btn">
      <v-row class="fullw">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeData" :class="{ 'active-toggle': data_btn }"> 
              Student data 
            </v-btn>
            <v-btn value="students" flat class="toggle-btn" @click="activeAttendance" :class="{'active-toggle': attendance_btn}"> 
              Attendance 
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" align="left">
          <h3 class="font2 tleft" style="color: #262B63;">
            Student data
          </h3>
        </v-col>
        <v-col sm="2" cols="12" :rows="2" align="center" class="pl-0">
          <div class="img-container">
            <img src="@/assets/sources/images/student-1.png" alt="Student">
            <v-icon>mdi-pencil-outline</v-icon>
          </div>
        </v-col>

        <v-col sm="10" cols="12">
          <v-row no-gutters>
            <v-col cols="12" sm="6" class="pa-2">
              <v-text-field
                v-model="student_name"
                class="login-textfield"
                placeholder="Student Name"
                variant="solo" 
                flat
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-2">
              <v-text-field
                v-model="student_last_name"
                class="login-textfield"
                placeholder="Student Last Name"
                variant="solo" 
                flat
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pt-3">
            <v-col cols="12" sm="3" class="pa-2">
              <v-text-field
                v-model="date_birth"
                class="login-textfield"
                placeholder="Date of Birth"
                variant="solo" 
                append-inner-icon="mdi-calendar"
                flat
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="pa-2">
              <v-text-field
                v-model="age_months"
                class="login-textfield"
                placeholder="Age in Months"
                variant="solo" 
                flat
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="pa-2">
              <v-text-field
                v-model="age_years"
                class="login-textfield"
                placeholder="Age in Years"
                variant="solo" 
                flat
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="pa-2">
              <v-autocomplete
                v-model="select_gender"
                placeholder="Gender"
                flat
                class="autocomplete-register"
                menu-icon="mdi-chevron-up"
                :items="['Male', 'Female']"
                variant="solo"
                :menu-props="{
                  contentClass: 'rounded-menu',
                }"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="container-for-text">
        <v-col cols="12" align="left" class="pa-2">
          <h5 class="font2 tleft" style="color: #262262;">Parents' information</h5>
        </v-col>
        <v-col sm="6" cols="12" align="left" class="pb-2">
          <div class="img-container">
            <img src="@/assets/sources/images/mother.png" alt="Student">
            <v-icon>mdi-pencil-outline</v-icon>
          </div>
        </v-col>
        <v-col sm="6" cols="12" align="left" class="pa-2">
          <div class="img-container">
            <img src="@/assets/sources/images/father.png" alt="Student">
            <v-icon>mdi-pencil-outline</v-icon>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="mothers_name"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Mother's Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="fathers_name"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Father's Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="mothers_number"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Mother's contact number"
            variant="solo" 
            flat
            append-inner-icon="mdi-phone-outline"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="fathers_number"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Father's contact number"
            variant="solo" 
            flat
            hide-details
            append-inner-icon="mdi-phone-outline"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="container-for-text mt-10">
        <v-col cols="12" align="left" class="pb-0 pt-0">
          <h5 class="font2 tleft" style="color: #262262;">Emergency Contact Information</h5>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_name"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Contact Name 1"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_name2"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Contact Name 2"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6" class="pa-2">
          <v-autocomplete
            v-model="type_relationship1"
            placeholder="Type of Relationship 1"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            hide-details
            :items="['Uncle', 'Aunt']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-autocomplete
            v-model="type_relationship2"
            placeholder="Type of Relationship 2"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['Uncle', 'Aunt']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_number"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Contact Number 1"
            variant="solo" 
            append-inner-icon="mdi-phone-outline"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_number2"
            class="login-textfield"
            bg-color="#F8F8F8"
            placeholder="Contact Number 2"
            variant="solo" 
            append-inner-icon="mdi-phone-outline"
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="fullw mt-10 mb-10">
        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            Schedule
          </h3>
        </v-col>

        <v-col cols="12" sm="4" class="pa-2">
          <v-text-field
            v-model="start_date_class"
            class="login-textfield"
            placeholder="Start Date of Classes"
            variant="solo" 
            append-inner-icon="mdi-calendar"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" class="pa-2">
          <v-autocomplete
            v-model="program"
            placeholder="Program"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['Primary', 'Toddler']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="4" class="pa-2">
          <v-autocomplete
            v-model="days"
            placeholder="Every day"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['Every day', '1 Day', '2 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days Enrolled</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday" density="compact" hide-details label="Monday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday" density="compact" hide-details label="Tuesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday" density="compact" hide-details label="Wednesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday" density="compact" hide-details label="Thursday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday" density="compact" hide-details label="Friday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday" density="compact" hide-details label="Saturday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday" density="compact" hide-details label="Sunday" color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="fullw mt-10 big-checkboxes-container">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Additional Programs</span>
        </v-col>

        <v-col cols="12" sm="3" class="pa-2">
          <v-autocomplete
            placeholder="Every day"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['1 Day', '2 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="3" class="pa-2">
          <v-autocomplete
            placeholder="Every day"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['1 Day', '2 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="3" class="pa-2">
          <v-autocomplete
            placeholder="Dance"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['Dance', 'Dance 2']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="3" class="pa-2">
          <v-autocomplete
            placeholder="Every day"
            flat
            bg-color="#F8F8F8"
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['1 Day', '2 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="mt-6" align="center">
          <v-row class="container-checkboxes-inset pa-0">
            <v-col cols="12" align="left">
              <span class="font2 f24 tleft" style="color: #262262;">Before school</span>
            </v-col>

            <v-col cols="12" class="jspace">
              <v-checkbox v-model="monday" density="compact" hide-details label="Mon" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="tuesday" density="compact" hide-details label="Tue" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="wednesday" density="compact" hide-details label="Wed" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="thursday" density="compact" hide-details label="Thu" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="friday" density="compact" hide-details label="Fri" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="saturday" density="compact" hide-details label="Sat" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="sunday" density="compact" hide-details label="Sun" color="#3C3C434D"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="mt-6" align="center">
          <v-row class="container-checkboxes-inset pa-0">
            <v-col cols="12" align="left">
              <span class="font2 f24 tleft" style="color: #262262;">After school</span>
            </v-col>

            <v-col cols="12" class="jspace">
              <v-checkbox v-model="monday" density="compact" hide-details label="Mon" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="tuesday" density="compact" hide-details label="Tue" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="wednesday" density="compact" hide-details label="Wed" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="thursday" density="compact" hide-details label="Thu" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="friday" density="compact" hide-details label="Fri" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="saturday" density="compact" hide-details label="Sat" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="sunday" density="compact" hide-details label="Sun" color="#3C3C434D"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="mt-6" align="center">
          <v-row class="container-checkboxes-inset pa-0">
            <v-col cols="12" align="left">
              <span class="font2 f24 tleft" style="color: #262262;">Enrichment Enrolled - (Dance)</span>
            </v-col>

            <v-col cols="12" class="jspace">
              <v-checkbox v-model="monday" density="compact" hide-details label="Mon" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="tuesday" density="compact" hide-details label="Tue" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="wednesday" density="compact" hide-details label="Wed" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="thursday" density="compact" hide-details label="Thu" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="friday" density="compact" hide-details label="Fri" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="saturday" density="compact" hide-details label="Sat" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="sunday" density="compact" hide-details label="Sun" color="#3C3C434D"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="mt-6" align="center">
          <v-row class="container-checkboxes-inset pa-0">
            <v-col cols="12" align="left">
              <span class="font2 f24 tleft" style="color: #262262;">Pizza</span>
            </v-col>

            <v-col cols="12" class="jspace">
              <v-checkbox v-model="monday" density="compact" hide-details label="Mon" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="tuesday" density="compact" hide-details label="Tue" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="wednesday" density="compact" hide-details label="Wed" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="thursday" density="compact" hide-details label="Thu" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="friday" density="compact" hide-details label="Fri" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="saturday" density="compact" hide-details label="Sat" color="#3C3C434D"></v-checkbox>
              <v-checkbox v-model="sunday" density="compact" hide-details label="Sun" color="#3C3C434D"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>

    <template v-else="attendance_btn">
      <v-row class="fullw">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeData" :class="{ 'active-toggle': data_btn }"> 
              Student data 
            </v-btn>
            <v-btn value="students" flat class="toggle-btn" @click="activeAttendance" :class="{'active-toggle': attendance_btn}"> 
              Attendance 
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            Attendance
          </h3>
        </v-col>

        <v-col cols="12" sm="2" class="pa-2">
          <v-autocomplete
            v-model="year"
            placeholder="Year"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['2025', '2026']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="5" class="pa-2">
          <v-autocomplete
            v-model="from_month"
            placeholder="From (Month)"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['March', 'April']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="5" class="pa-2">
          <v-autocomplete
            v-model="to_month"
            placeholder="To (Month)"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['March', 'April']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="fullw">
        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            March
          </h3>
        </v-col>
      </v-row>

      <v-card flat class="card-rounded">
        <div v-for="(week, weekIndex) in monthlyAttedance" :key="weekIndex" class="div-container-weeks-cards">
          <h3>{{ week.weekTitle }}</h3>
          <div class="slider-div">
            <v-card flat v-for="(day, dayIndex) in week.days" :key="dayIndex">
              <div class="div-header">
                <span>{{ day.date }}</span>
              </div>

              <img :src="day.state_attedance" alt="State">

              <hr>

              <span class="f10 w600" style="color: #7583D9;">{{ day.time }}</span>
            </v-card>
          </div>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import check from '@/assets/sources/icons/check.svg';
import error from '@/assets/sources/icons/error.svg';
import contract from '@/assets/sources/icons/contract.svg';


const monthlyAttedance = ref([
  {
    weekTitle: "1st Week - March",
    days: [
      {
        date: 'Monday, 3',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Tuesday, 4',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Wednesday, 5',
        state_attedance: error,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Thursday, 6',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Friday, 7',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Saturday, 8',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Sunday, 9',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
    ]
  },
  {
    weekTitle: "2nd Week - March",
    days: [
      {
        date: 'Monday, 3',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Tuesday, 4',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Wednesday, 5',
        state_attedance: error,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Thursday, 6',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Friday, 7',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Saturday, 8',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Sunday, 9',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
    ]
  },
  {
    weekTitle: "3rd Week - March",
    days: [
      {
        date: 'Monday, 3',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Tuesday, 4',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Wednesday, 5',
        state_attedance: error,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Thursday, 6',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Friday, 7',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Saturday, 8',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Sunday, 9',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
    ]
  },
  {
    weekTitle: "4th Week - March",
    days: [
      {
        date: 'Monday, 3',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Tuesday, 4',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Wednesday, 5',
        state_attedance: error,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Thursday, 6',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Friday, 7',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Saturday, 8',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
      {
        date: 'Sunday, 9',
        state_attedance: check,
        time: '9:00 am - 12:15pm',
      },
    ]
  },
]);

const data_btn = ref(true);
const attendance_btn = ref(false);


const activeData = () =>{
  data_btn.value = true;
  attendance_btn.value = false;
};

const activeAttendance = () =>{
  attendance_btn.value = true;
  data_btn.value = false;
};

const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);

</script>

<style lang="scss">
@import '@/assets/styles/pages/student-profile.scss';
</style>