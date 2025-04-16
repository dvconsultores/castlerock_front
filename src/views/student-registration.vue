<template>
  <div id="student-registration">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Student</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="student_name"
            class="textfield-registration"
            placeholder="Student Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="student_last_name"
            class="textfield-registration"
            placeholder="Student's last name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <v-text-field
            v-model="date_birth"
            class="textfield-registration"
            placeholder="Date of Birth"
            variant="solo" 
            append-inner-icon="mdi-calendar-outline"
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <v-text-field
            v-model="age_months"
            class="textfield-registration"
            placeholder="Age in Months"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <v-text-field
            v-model="age_years"
            class="textfield-registration"
            placeholder="Age in Years"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <v-autocomplete
            v-model="gender"
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

      <v-row class="container-div-form">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Parents' information</span>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mother_name"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Mother's Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="father_name"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Father's Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="mother_number"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Mother's contact number"
            append-inner-icon="mdi-phone-outline"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="father_number"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Father's contact number"
            append-inner-icon="mdi-phone-outline"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="container-div-form mt-10">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Emergency Contact Information</span>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="contact_name1"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Contact name 1"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="contact_name2"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Contact name 2"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="type_relationship1"
            bg-color="#F0F0F0 "
            placeholder="Type of Relationship 1"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['Uncle', 'Aunt']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="type_relationship2"
            bg-color="#F0F0F0 "
            placeholder="Type of Relationship 2"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['Uncle', 'Aunt']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="contact_number1"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Contact number 1"
            append-inner-icon="mdi-phone-outline"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="contact_number2"
            bg-color="#F0F0F0 "
            class="textfield-registration"
            placeholder="Contact number 2"
            append-inner-icon="mdi-phone-outline"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <h3 class="font2 f32 tleft mt-12" style="color: #262B63;">Enrollment</h3>

      <v-row>
        <v-col cols="12" md="4" sm="6">
          <v-text-field
            v-model="start_date"
            class="textfield-registration"
            placeholder="Start Date of Classes"
            append-inner-icon="mdi-calendar"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-autocomplete
            v-model="program"
            placeholder="Program"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['Program 1', 'Program 2']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-autocomplete
            v-model="days_enrolled"
            placeholder="Days Enrolled"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['Program 1', 'Program 2']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="container-div-form mt-10">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Additional Programs</span>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-autocomplete
            v-model="before_school"
            bg-color="#F0F0F0 "
            placeholder="Before School"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['None', 'None']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-autocomplete
            v-model="after_school"
            bg-color="#F0F0F0 "
            placeholder="After School"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['None', 'None']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-autocomplete
            v-model="enrichment_enrolled"
            bg-color="#F0F0F0 "
            placeholder="Enrichment Enrolled"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['None', 'None']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="3" sm="6">
          <v-autocomplete
            v-model="pizza"
            bg-color="#F0F0F0 "
            placeholder="Pizza"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['None', 'None']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" align="right">
          <v-btn flat class="btn-save" @click="openSave">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogSave" content-class="dialogSave" persistent>
      <v-card class="card-save">
        <img src="@/assets/sources/icons/save.svg" alt="Trash">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to register the student?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w600" style="color: #7583D9;">Emily Taylor,</span> Primary 1Y 4M </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmation">Yes, register</v-btn>
          <v-btn flat class="btn2" @click="closeSave">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmation" content-class="dialogConfirmation" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">
          The student <span class="w600" style="color: #7583D9;">Emily Taylor</span> has been successfully registered.
        </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">View profile</v-btn>
          <v-btn flat class="btn2" @click="closeAll">New student</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
 
const dialogSave = ref(false);
const dialogConfirmation = ref(false);

const openSave = () => {
  dialogSave.value = true
};

const closeSave = () => {
  dialogSave.value = false;
};

const openConfirmation = () => {
  dialogSave.value = false;
  dialogConfirmation.value = true;
}

const closeAll = () => {
  dialogConfirmation.value = false;
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/student-registration.scss';
</style>