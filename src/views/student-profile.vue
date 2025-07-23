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
          <span class="font2 f24 tleft" style="color: #262262;">Classes</span>
        </v-col>

        <v-col v-for="(item, index) in dataForClass" :key="index" cols="12" sm="12" class="pa-2 flex center gap4">
          <v-autocomplete
            v-model="item.selected_class"
            :items="selectClassItem"
            item-value="id"
            :item-title="classItem => classItem.name + ' - ' + (classItem.campus?.name || '')"
            return-object
            placeholder="Select Class"
            flat
            bg-color="#F0F0F0"
            class="autocomplete-register"
            hide-details
            menu-icon=""
            variant="solo"
            readonly
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
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
            :items="yearsArray"
            item-value="id"
            item-title="name"
            return-object
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="10" class="pa-2">
          <v-autocomplete
            v-model="month_from"
            placeholder="Month"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="monthsArrayFrom"
            item-value="id"
            item-title="name"
            return-object
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <!-- <v-col cols="12" sm="5" class="pa-2">
          <v-autocomplete
            v-model="month_to"
            placeholder="To (Month)"
            flat
            class="autocomplete-register"
            hide-details
            menu-icon="mdi-chevron-up"
            :items="monthsArrayTo"
            item-value="id"
            item-title="name"
            return-object
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col> -->
      </v-row>

      <v-row class="fullw">
        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            {{ month_from?.name }}
          </h3>
        </v-col>
      </v-row>

      <v-card flat class="card-rounded">
        <div v-if="stateShow" v-for="(week, weekIndex) in monthlyAttedance" :key="weekIndex" class="div-container-weeks-cards">
          <h3>{{ week.weekTitle }}</h3>
          <div class="slider-div">
            <v-card flat v-for="(day, dayIndex) in week.days" :key="dayIndex">
              <div class="div-header">
                <span>{{ day.date }}</span>
              </div>

              <img v-if="day.state_attedance" :src="day.state_attedance" alt="State">

              <!-- <hr>

              <span class="f10 w600" style="color: #7583D9;">{{ day.time }}</span> -->
            </v-card>
          </div>
        </div>

          <h3 v-else class="font2 center mt-16" style="color: #262B63;">
            No data available
          </h3>
      </v-card>
    </template>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from 'vue'
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';
import present from '@/assets/sources/icons/attendance.svg';
import absent from '@/assets/sources/icons/absent.svg';
import late from '@/assets/sources/icons/late.svg';
import excused from '@/assets/sources/icons/excused.svg';
import contract from '@/assets/sources/icons/contract.svg';
import avatarImg from '@/assets/sources/images/avatar.svg';

const stateShow = ref(false);
const year = ref(null);
const yearsArray = ref([
  { id: 2025, name: '2025' },
  { id: 2026, name: '2026' },
  { id: 2027, name: '2027' },
]);
const month_from = ref(null);
const monthsArrayFrom = ref([
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]);
const month_to = ref(null);
const monthsArrayTo = ref([
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]);

const monthlyAttedance = ref([]);

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
const selectClassItem = ref([]);
const dataPrograms = ref([]);
const dataClasses = ref([]);
const selected_program = ref(null);
const selected_class = ref(null);
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

const dataForClass = ref([
  { selected_class: 'Select Class' },
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

const getClasses = async () => {
  try {
    const response = await axiosInstance.get('/classes');
    
    dataClasses.value = response.data.result.map(classe => ({
      id: classe.id,
      name: classe.name,
    }));

    selectClassItem.value = dataClasses.value;
  } catch (error) {
    showAlert('Error fetching classes', 'error');
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
    const formatDate = (dateStr) => {
      const [year, month, day] = dateStr.split('-');
      return `${month}-${day}-${year}`;
    };
    dateOfBirth.value = formatDate(student.dateOfBirth);
    imagePreviewStudent.value = student.image || avatarImg;
    notes.value = student.notes;
    start_date_class.value = formatDate(student.startDateOfClasses);
    monday_enrolled.value = student.daysEnrolled.includes('Monday');
    tuesday_enrolled.value = student.daysEnrolled.includes('Tuesday');
    wednesday_enrolled.value = student.daysEnrolled.includes('Wednesday');
    thursday_enrolled.value = student.daysEnrolled.includes('Thursday');
    friday_enrolled.value = student.daysEnrolled.includes('Friday');
    saturday_enrolled.value = student.daysEnrolled.includes('Saturday');
    sunday_enrolled.value = student.daysEnrolled.includes('Sunday');
    if(student.beforeSchoolDays != null){
      monday_before.value = student.beforeSchoolDays.includes('Monday');
      tuesday_before.value = student.beforeSchoolDays.includes('Tuesday');
      wednesday_before.value = student.beforeSchoolDays.includes('Wednesday');
      thursday_before.value = student.beforeSchoolDays.includes('Thursday');
      friday_before.value = student.beforeSchoolDays.includes('Friday');
      saturday_before.value = student.beforeSchoolDays.includes('Saturday');
      sunday_before.value = student.beforeSchoolDays.includes('Sunday');
    }
    if(student.afterSchoolDays != null){
      monday_after.value = student.afterSchoolDays.includes('Monday');
      tuesday_after.value = student.afterSchoolDays.includes('Tuesday');
      wednesday_after.value = student.afterSchoolDays.includes('Wednesday');
      thursday_after.value = student.afterSchoolDays.includes('Thursday');
      friday_after.value = student.afterSchoolDays.includes('Friday');
      saturday_after.value = student.afterSchoolDays.includes('Saturday');
      sunday_after.value = student.afterSchoolDays.includes('Sunday');
    }
    select_center.value = student.campus.id;
    mothers_name.value = student.contacts.find(contact => contact.relation === 'Mother')?.fullName || '';
    mothers_number.value = student.contacts.find(contact => contact.relation === 'Mother')?.phone || '';
    mothers_role.value = student.contacts.find(contact => contact.relation === 'Mother')?.role || '';
    imagePreviewMother.value = student.contacts.find(contact => contact.relation === 'Mother')?.image || avatarImg;
    selectedImgMother.value = student.contacts.find(contact => contact.relation === 'Mother')?.image || avatarImg;
    fathers_name.value = student.contacts.find(contact => contact.relation === 'Father')?.fullName || '';
    fathers_number.value = student.contacts.find(contact => contact.relation === 'Father')?.phone || '';
    fathers_role.value = student.contacts.find(contact => contact.relation === 'Father')?.role || '';
    selectedImgFather.value = student.contacts.find(contact => contact.relation === 'Father')?.image || avatarImg;
    imagePreviewFather.value = student.contacts.find(contact => contact.relation === 'Father')?.image || avatarImg;
    contact_name.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.fullName || '';
    contact_number.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.phone || '';
    type_relationship1.value = student.contacts.find(contact => contact.role === 'EMERGENCY_1')?.relation || '';
    contact_name2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.fullName || '';
    contact_number2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.phone || '';
    type_relationship2.value = student.contacts.find(contact => contact.role === 'EMERGENCY_2')?.relation || '';
    dataForProgram.value = student.additionalPrograms.map(program => ({
      selected_program: program.id,
    }));
    dataForClass.value = student.classes.map(classe => ({
      selected_class: classe,
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

// const getAttendance = async (studentId, status) => {
//   try {
//     const response = await axiosInstance.get('/attendances', {
//       params: {
//         studentId: studentId,
//         status: status // Asegúrate de pasar este valor al llamar la función
//       }
//     });
//     const attendanceData = response.data.result;
//     console.log(attendanceData, 'Attendance Data');
//     return attendanceData;
//   } catch (error) {
//     showAlert('Error fetching attendance data', 'error');
//     throw error; 
//   }
// };

const getOrdinalSuffix = (num) => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};


const getAttendance = async () =>{
  try{
      const response = await axiosInstance.get(`/attendances?studentId=${studentId.value}`, {
    });
  }catch(error){
    showAlert(error, 'error')
  }
};


const searchAttendances = async () =>{
  try{
    const response = await axiosInstance.get(`/attendances?studentId=${studentId.value}&year=${year.value?.id}&monthFrom=${month_from.value?.id}&monthTo=${month_from.value?.id}`);
    
    // Create attendance map for quick lookup
    const attendanceMap = new Map();
    response.data.result.forEach(item => {
      const date = new Date(item.date);
      // Use UTC methods to avoid timezone offsets
      const utcDate = new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate()
      ));
      attendanceMap.set(utcDate.getUTCDate(), item.status);
    });

    // Generate all days for selected month
    const selectedMonth = month_from.value?.id;
    const selectedYear = year.value?.id;
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    
    const weeks = [];
    let currentWeek = { weekTitle: `1st Week - ${month_from.value?.name}`, days: [] };
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(selectedYear, selectedMonth - 1, day));
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
      
      // Determine status image
      let statusImage = null;
      const status = attendanceMap.get(day);
      if (status === 'Present') statusImage = present;
      else if (status === 'Absent') statusImage = absent;
      else if (status === 'Justified') statusImage = excused;
      else if (status === 'Late') statusImage = late;

      currentWeek.days.push({
        date: `${dayName}, ${day}`,
        state_attedance: statusImage,
        time: '9:00 am - 12:15pm'
      });

      // Start new week every 7 days
      if (day % 7 === 0 && day < daysInMonth) {
        weeks.push(currentWeek);
        currentWeek = {
          weekTitle: `${weeks.length + 1}${getOrdinalSuffix(weeks.length + 1)} Week - ${month_from.value?.name}`,
          days: []
        };
      }
    }
    
    // Add the last week
    if (currentWeek.days.length > 0) {
      weeks.push(currentWeek);
    }

    monthlyAttedance.value = weeks;
    stateShow.value = true;
  }catch(error){
    showAlert(error, 'error')
  }
};

watch(
  () => ({
    year: year.value,
    month_from: month_from.value,
    // month_to: month_to.value,
  }),
  (newValues, oldValues) => {
    if (!oldValues) return;

    const allRequiredFilled = 
      newValues.year !== null && 
      newValues.month_from !== null
      // newValues.month_to !== null;

    const hasChanged = (
      newValues.year !== oldValues.year ||
      newValues.month_from !== oldValues.month_from
      // newValues.month_to !== oldValues.month_to
    );

    if (allRequiredFilled && hasChanged) {
      searchAttendances();
    }
  },
  { deep: true }
);

onMounted(() => {
  getPrograms();
  getCenters();
  getDataStudent();
  getAttendance();
  getClasses();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/student-profile.scss';
</style>