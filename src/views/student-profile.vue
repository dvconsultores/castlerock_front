<template>
  <div id="student-profile">
    <template v-if="data_btn">
      <v-row class="fullw">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeData" :class="{ 'active-toggle': data_btn }"> 
              Student profile 
            </v-btn>
            <v-btn value="students" flat class="toggle-btn" @click="activeAttendance" :class="{'active-toggle': attendance_btn}"> 
              Attendance 
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" align="left">
          <h3 class="font2 tleft" style="color: #262B63;">
            Student profile
          </h3>
        </v-col>
        <v-col sm="2" cols="12" :rows="2" align="center" class="pl-0">
          <div class="img-container mt-2">
            <img v-if="imagePreviewStudent" :src="imagePreviewStudent" alt="Student">
            <span v-if="!imagePreviewStudent" class="add-image f12" style="color: #46464C;">
              No Image
            </span>
          </div>
        </v-col>

        <v-col sm="10" cols="12" class="pl-0 pr-0">
          <v-row no-gutters>
            <v-col cols="12" sm="6" class="pa-2">
              <v-text-field
                v-model="firstName"
                class="login-textfield"
                readonly
                maxLength="150"
                placeholder="Student Name"
                variant="solo" 
                flat
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pa-2">
              <v-text-field
                v-model="lastName"
                class="login-textfield"
                placeholder="Student Last Name"
                variant="solo"
                maxLength="150"
                flat
                hide-details
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters class="pt-3">
            <v-col cols="12" sm="4" class="pa-2">
              <v-text-field
                v-model="dateOfBirth"
                class="login-textfield"
                maxLength="150"
                placeholder="Date of Birth"
                variant="solo"
                flat
                append-inner-icon="mdi-calendar"
                hide-details
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="pa-2">
              <v-autocomplete
                v-model.number="select_center"
                placeholder="Select Center"
                flat
                class="autocomplete-register"
                menu-icon=""
                :items="selectCenterItems"
                item-value="id"
                item-title="name"
                return-object
                @update:modelValue="val => select_center = val?.id"
                variant="solo"
                readonly
                :menu-props="{
                  contentClass: 'rounded-menu',
                }"
              ></v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" sm="3" class="pa-2">
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
            </v-col> -->
            <v-col cols="12" sm="4" class="pa-2">
              <v-autocomplete
                v-model="gender"
                placeholder="Gender"
                flat
                class="autocomplete-register"
                menu-icon=""
                :items="['M', 'F', 'Other']"
                variant="solo"
                readonly
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
            <img v-if="imagePreviewMother" :src="imagePreviewMother" alt="Student">
            <span v-if="!imagePreviewMother" class="add-image f12" style="color: #46464C;">
              No Image
            </span>
          </div>
        </v-col>
        <v-col sm="6" cols="12" align="left" class="pa-2">
          <div class="img-container">
            <img v-if="imagePreviewFather" :src="imagePreviewFather" alt="Student">
            <span v-if="!imagePreviewFather" class="add-image f12" style="color: #46464C;">
              No Image
            </span>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="mothers_name"
            class="login-textfield"
            bg-color="#F0F0F0 "
            maxLength="150"
            placeholder="Mother's Name"
            variant="solo"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="fathers_name"
            class="login-textfield"
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Father's Name"
            variant="solo"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="mothers_number"
            class="login-textfield"
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Mother's contact number"
            variant="solo"
            flat
            type="number"
            hide-spin-buttons
            append-inner-icon="mdi-phone-outline"
            hide-details
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="fathers_number"
            class="login-textfield"
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Father's contact number"
            variant="solo"
            type="number"
            hide-spin-buttons
            flat
            hide-details
            append-inner-icon="mdi-phone-outline"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-autocomplete
            v-model="mothers_role"
            placeholder="Role"
            flat
            bg-color="#F0F0F0"
            class="autocomplete-register"
            menu-icon=""
            hide-details
            :items="['PRIMARY', 'SECONDARY']"
            variant="solo"
            readonly
            :menu-props="{
            contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" class="pa-2">
          <v-autocomplete
            v-model="fathers_role"
            placeholder="Role"
            flat
            bg-color="#F0F0F0"
            class="autocomplete-register"
            menu-icon=""
            hide-details
            :items="['PRIMARY', 'SECONDARY']"
            variant="solo"
            readonly
            :menu-props="{
            contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
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
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Contact Name 1"
            variant="solo"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_name2"
            class="login-textfield"
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Contact Name 2"
            variant="solo"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6" class="pa-2">
          <v-autocomplete
            v-model="type_relationship1"
            placeholder="Type of Relationship 1"
            flat
            bg-color="#F0F0F0 "
            class="autocomplete-register"
            menu-icon=""
            hide-details
            :items="['Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Sibling', 'Legal Guardian', 'Family Friend', 'Other']"
            variant="solo"
            readonly
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
            bg-color="#F0F0F0 "
            class="autocomplete-register"
            hide-details
            menu-icon=""
            :items="['Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Sibling', 'Legal Guardian', 'Family Friend', 'Other']"
            variant="solo"
            readonly
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_number"
            class="login-textfield"
            bg-color="#F0F0F0 "
            placeholder="Contact Number 1"
            maxLength="150"
            variant="solo"
            append-inner-icon="mdi-phone-outline"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pa-2">
          <v-text-field
            v-model="contact_number2"
            class="login-textfield"
            maxLength="150"
            bg-color="#F0F0F0 "
            placeholder="Contact Number 2"
            variant="solo"
            append-inner-icon="mdi-phone-outline"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="container-for-text mt-10">
        <v-col cols="12" align="left" class="pb-0 pt-0">
          <h5 class="font2 tleft" style="color: #262262;">Additional Notes</h5>
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-textarea
          v-model="notes"
          placeholder="Notes" variant="solo"
          flat
          maxLength="300"
          hide-details
          bg-color="#F0F0F0"
          class="text-area"
          readonly
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row class="fullw mt-10 mb-2">
        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            Enrollment
          </h3>
        </v-col>

        <v-col cols="12" sm="12" class="pa-2">
          <v-text-field
            v-model="start_date_class"
            class="login-textfield"
            placeholder="First Day of School"
            maxLength="150"
            variant="solo"
            append-inner-icon="mdi-calendar"
            flat
            hide-details
            readonly
          ></v-text-field>
        </v-col>

        <!-- <v-col cols="12" sm="4" class="pa-2">
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
            placeholder="Schedule"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['1 Day', '2 Days', '3 Days', '4 Days', '5 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col> -->
      </v-row>

      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days Enrolled</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_enrolled" density="compact" hide-details label="Monday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="tuesday_enrolled" density="compact" hide-details label="Tuesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="wednesday_enrolled" density="compact" hide-details label="Wednesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="thursday_enrolled" density="compact" hide-details label="Thursday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="friday_enrolled" density="compact" hide-details label="Friday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="saturday_enrolled" density="compact" hide-details label="Saturday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="sunday_enrolled" density="compact" hide-details label="Sunday" color="#3C3C434D" disabled></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Before school</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_before" density="compact" hide-details label="Monday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="tuesday_before" density="compact" hide-details label="Tuesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="wednesday_before" density="compact" hide-details label="Wednesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="thursday_before" density="compact" hide-details label="Thursday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="friday_before" density="compact" hide-details label="Friday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="saturday_before" density="compact" hide-details label="Saturday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="sunday_before" density="compact" hide-details label="Sunday" color="#3C3C434D" disabled></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">After school</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_after" density="compact" hide-details label="Monday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="tuesday_after" density="compact" hide-details label="Tuesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="wednesday_after" density="compact" hide-details label="Wednesday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="thursday_after" density="compact" hide-details label="Thursday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="friday_after" density="compact" hide-details label="Friday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="saturday_after" density="compact" hide-details label="Saturday" color="#3C3C434D" disabled></v-checkbox>
          <v-checkbox v-model="sunday_after" density="compact" hide-details label="Sunday" color="#3C3C434D" disabled></v-checkbox>
        </v-col>
      </v-row>
      
      <v-row class="fullw mt-10 big-checkboxes-container">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Additional Programs</span>
        </v-col>

        <v-col v-for="(item, index) in dataForProgram" :key="index" cols="12" sm="12" class="pa-2 flex center gap4">
          <v-autocomplete
            v-model.number="item.selected_program"
            placeholder="Select Program"
            flat
            bg-color="#F0F0F0 "
            class="autocomplete-register"
            hide-details
            menu-icon=""
            :items="selectProgramItem"
            item-value="id"
            item-title="name"
            return-object
            @update:modelValue="val => selected_program = val?.id"
            variant="solo"
            readonly
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <!-- <v-col cols="12" sm="4" class="pa-2">
          <v-text-field
            v-model="sessions"
            class="login-textfield"
            placeholder="Sessions"
            variant="solo" 
            flat
            bg-color="#F0F0F0"
            type="number"
            hide-spin-buttons
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" class="pa-2">
          <v-text-field
            v-model="duration"
            class="login-textfield"
            placeholder="Duration"
            variant="solo" 
            flat
            bg-color="#F0F0F0"
            hide-details
          ></v-text-field>
        </v-col> -->

        <!-- <v-col cols="12" sm="3" class="pa-2">
          <v-autocomplete
            placeholder="Schedule"
            flat
            bg-color="#F0F0F0 "
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="['1 Day', '2 Days', '3 Days', '4 Days', '5 Days']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col> -->

        <!-- <v-col cols="12" class="mt-6" align="center">
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
        </v-col> -->
      </v-row>

      <v-dialog v-model="dialogConfirmationStudent" content-class="dialogConfirmationStudent" persistent>
        <v-card class="card-confirmation">
          <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
          <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully updated!</span>
          <hr class="mt-2 mb-5">
          <span class="f16 w400 tcenter">The student <span class="w600" style="color: #7583D9;">{{ firstName + ' ' + lastName }}</span> has been successfully updated.</span>
          <div class="btn-divs mt-8">
            <v-btn flat class="btn1" @click="$router.push('/home/students')">Go to Students</v-btn>
            <v-btn flat class="btn2" @click="dialogConfirmationStudent">Edit Student</v-btn>
          </div>
          <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
        </v-card>
      </v-dialog>
    </template>

    <template v-else="attendance_btn">
      <v-row class="fullw">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeData" :class="{ 'active-toggle': data_btn }"> 
              Student profile 
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
import { ref, inject, onMounted, computed, watch } from 'vue'
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';
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

const id = ref(null);
const route = useRoute();
const studentId = ref(route.params.id);
const dataStudents = ref([]);
const dialogConfirmationStudent = ref(false);
const savingStudent = ref(false);
const fileInputStudent = ref(null);
const selectedImgStudent = ref(null);
const imagePreviewStudent = ref(null);
const fileInputMother = ref(null);
const selectedImgMother = ref(null);
const imagePreviewMother = ref(null);
const fileInputFather = ref(null);
const selectedImgFather = ref(null);
const imagePreviewFather = ref(null);
const showAlert = inject('showAlert');
const firstName = ref('');
const lastName = ref('');
const dateOfBirth = ref('');
const gender = ref(null);
const notes = ref('');
const start_date_class = ref('');
const selectProgramItem = ref([]);
const dataPrograms = ref([]);
const selected_program = ref(null);
const sessions = ref('');
const duration = ref('');
const selectCenterItems = ref([]);
const dataCenters = ref([]);
const select_center = ref(null);
const mothers_role = ref(null);
const fathers_role = ref(null);
const dataIdsProgram = ref(null);
const mothers_name = ref('');
const fathers_name = ref('');
const mothers_number = ref('');
const fathers_number = ref('');
const contact_name = ref('');
const contact_name2 = ref('');
const contact_number = ref('');
const contact_number2 = ref('');
const type_relationship1 = ref(null);
const type_relationship2 = ref(null);

const monday_enrolled = ref(false);
const tuesday_enrolled = ref(false);
const wednesday_enrolled = ref(false);
const thursday_enrolled = ref(false);
const friday_enrolled = ref(false);
const saturday_enrolled = ref(false);
const sunday_enrolled = ref(false);

const monday_before = ref(false);
const tuesday_before = ref(false);
const wednesday_before = ref(false);
const thursday_before = ref(false);
const friday_before = ref(false);
const saturday_before = ref(false);
const sunday_before = ref(false);

const monday_after = ref(false);
const tuesday_after = ref(false);
const wednesday_after = ref(false);
const thursday_after = ref(false);
const friday_after = ref(false);
const saturday_after = ref(false);
const sunday_after = ref(false);

watch(mothers_role, (newVal) => {
  if (newVal === 'PRIMARY') {
    fathers_role.value = 'SECONDARY';
  } else if (newVal === 'SECONDARY') {
    fathers_role.value = 'PRIMARY';
  }
});

watch(fathers_role, (newVal) => {
  if (newVal === 'PRIMARY') {
    mothers_role.value = 'SECONDARY';
  } else if (newVal === 'SECONDARY') {
    mothers_role.value = 'PRIMARY';
  }
});

const dataForProgram = ref([
  { selected_program: 'Select Program' },
])

const getPrograms = async () => {
  try {
    const response = await axiosInstance.get('/additional-programs');
    
    dataPrograms.value = response.data.result.map(program => ({
      id: program.id,
      name: program.name,
    }));

    selectProgramItem.value = dataPrograms.value;
  } catch (error) {
    showAlert('Error fetching programs', 'error');
  }
};

const getCenters = async () => {
  try {
    const response = await axiosInstance.get('/campus');
    
    dataCenters.value = response.data.result.map(center => ({
      id: center.id,
      name: center.name,
    }));

    selectCenterItems.value = dataCenters.value;
  } catch (error) {
    showAlert('Error fetching centers', 'error');
  }
};


const getDataStudent = async () => {
  try {
    const response = await axiosInstance.get(`/students/${studentId.value}`);
    const student = response.data.result;
    id.value = student.id;
    firstName.value = student.firstName;
    lastName.value = student.lastName;
    gender.value = student.gender;
    dateOfBirth.value = student.dateOfBirth;
    imagePreviewStudent.value = student.image;
    notes.value = student.notes;
    start_date_class.value = student.startDateOfClasses;
    monday_enrolled.value = student.daysEnrolled.includes('Monday');
    tuesday_enrolled.value = student.daysEnrolled.includes('Tuesday');
    wednesday_enrolled.value = student.daysEnrolled.includes('Wednesday');
    thursday_enrolled.value = student.daysEnrolled.includes('Thursday');
    friday_enrolled.value = student.daysEnrolled.includes('Friday');
    saturday_enrolled.value = student.daysEnrolled.includes('Saturday');
    sunday_enrolled.value = student.daysEnrolled.includes('Sunday');
    monday_before.value = student.beforeSchoolDays.includes('Monday');
    tuesday_before.value = student.beforeSchoolDays.includes('Tuesday');
    wednesday_before.value = student.beforeSchoolDays.includes('Wednesday');
    thursday_before.value = student.beforeSchoolDays.includes('Thursday');
    friday_before.value = student.beforeSchoolDays.includes('Friday');
    saturday_before.value = student.beforeSchoolDays.includes('Saturday');
    sunday_before.value = student.beforeSchoolDays.includes('Sunday');
    monday_after.value = student.afterSchoolDays.includes('Monday');
    tuesday_after.value = student.afterSchoolDays.includes('Tuesday');
    wednesday_after.value = student.afterSchoolDays.includes('Wednesday');
    thursday_after.value = student.afterSchoolDays.includes('Thursday');
    friday_after.value = student.afterSchoolDays.includes('Friday');
    saturday_after.value = student.afterSchoolDays.includes('Saturday');
    sunday_after.value = student.afterSchoolDays.includes('Sunday');
    select_center.value = student.campus.id;
    mothers_name.value = student.contacts.find(contact => contact.relation === 'Mother')?.fullName || '';
    mothers_number.value = student.contacts.find(contact => contact.relation === 'Mother')?.phone || '';
    mothers_role.value = student.contacts.find(contact => contact.relation === 'Mother')?.role || '';
    imagePreviewMother.value = student.contacts.find(contact => contact.relation === 'Mother')?.image || '';
    selectedImgMother.value = student.contacts.find(contact => contact.relation === 'Mother')?.image || '';
    fathers_name.value = student.contacts.find(contact => contact.relation === 'Father')?.fullName || '';
    fathers_number.value = student.contacts.find(contact => contact.relation === 'Father')?.phone || '';
    fathers_role.value = student.contacts.find(contact => contact.relation === 'Father')?.role || '';
    selectedImgFather.value = student.contacts.find(contact => contact.relation === 'Father')?.image || '';
    imagePreviewFather.value = student.contacts.find(contact => contact.relation === 'Father')?.image || '';
    contact_name.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.fullName || '';
    contact_number.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.phone || '';
    type_relationship1.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.relation || '';
    contact_name2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.fullName || '';
    contact_number2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.phone || '';
    type_relationship2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.relation || '';
    dataForProgram.value = student.additionalPrograms.map(program => ({
      selected_program: program.id,
    }));
  } catch (error) {
    showAlert(error, 'error');
  }
}

const loadCenterData = async () => {
  try {
    const response = await axiosInstance.get(`/campus/${centerId.value}`);
    const center = response.data.result;
    
    center_name.value = center.name;
    phone_center.value = center.phone;
    nickname_center.value = center.nickname;
    address.value = center.address;
    currentImage.value = center.image;
  } catch (error) {
    console.error('Failed to load center data', error);
  }
};

onMounted(() => {
  getPrograms();
  getCenters();
  getDataStudent();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/student-profile.scss';
</style>