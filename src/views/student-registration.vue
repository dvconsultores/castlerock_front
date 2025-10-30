<template>
  <div id="student-profile">
    <v-row class="fullw">
      <v-col cols="12" align="left">
        <h3 class="font2 tleft" style="color: #262B63;">
          Student profile
        </h3>
      </v-col>
      <v-col sm="2" cols="12" :rows="2" align="center" class="pl-0">
        <div :class="{'img-container': true, 'mt-2': true}">
          <img v-if="imagePreviewStudent" :src="imagePreviewStudent" alt="Student">
          <span v-if="!imagePreviewStudent" class="add-image f12" style="color: #46464C;">
            Add Image
          </span>
          <v-icon @click="triggerfileInputStudent" class="pointer">mdi-pencil-outline</v-icon>
        </div>


        <v-file-input 
        ref="fileInputStudent" v-model="selectedImgStudent" flat variant="solo" 
        class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChange"
        style="display: none;"
        ></v-file-input>
      </v-col>

      <v-col sm="10" cols="12" class="pl-0 pr-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" class="pa-2">
            <v-text-field
              v-model="firstName"
              :class="{'textfield-error': firstNameError, 'login-textfield': true}"
              placeholder="Student Name"
              variant="solo" 
              autocomplete="off"
              flat
              maxlength="150"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="pa-2">
            <v-text-field
              v-model="lastName"
              :class="{'textfield-error': lastNameError, 'login-textfield': true}"
              placeholder="Student Last Name"
              variant="solo" 
              flat
              autocomplete="off"
              maxlength="150"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters class="pt-3">
          <v-col cols="12" sm="4" class="pa-2">
            <v-menu :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formattedDate"
                  :class="{'textfield-error': dateOfBirthError, 'login-textfield': true}"
                  placeholder="Date of Birth"
                  variant="solo"
                  flat
                  autocomplete="off"
                  hide-details
                  append-inner-icon="mdi-calendar"
                  v-bind="props"
                  @click:append-inner="props.onClick"
                  @change="onDateInputChange"
                />
              </template>

              <v-date-picker
                v-model="dateOfBirth"
                @update:model-value="formatDate"
                :max-date="new Date()"
                :close-on-click="false"
                :close-on-content-click="false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4" class="pa-2">
            <v-autocomplete
              v-model.number="select_center"
              placeholder="Select Center"
              flat
              autocomplete="off"
              :class="{'textfield-error': campusError, 'autocomplete-register': true}"
              menu-icon="mdi-chevron-up"
              :items="selectCenterItems"
              item-value="id"
              item-title="name"
              return-object
              @update:modelValue="val => select_center = val?.id"
              variant="solo"
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
              autocomplete="off"
              :class="{'textfield-error': genderError, 'autocomplete-register': true}"
              menu-icon="mdi-chevron-up"
              :items="['M', 'F', 'Other']"
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
          <img v-if="imagePreviewMother" :src="imagePreviewMother" alt="Student">
          <span v-if="!imagePreviewMother" class="add-image f12" style="color: #46464C;">
            Add Image
          </span>
          <v-icon @click="triggerfileInputMother" class="pointer">mdi-pencil-outline</v-icon>

          <v-file-input 
          ref="fileInputMother" v-model="selectedImgMother" flat variant="solo" 
          class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChangeMother"
          style="display: none;"
          ></v-file-input>
        </div>
      </v-col>
      <v-col sm="6" cols="12" align="left" class="pa-2">
        <div class="img-container">
          <img v-if="imagePreviewFather" :src="imagePreviewFather" alt="Student">
          <span v-if="!imagePreviewFather" class="add-image f12" style="color: #46464C;">
            Add Image
          </span>
          <v-icon @click="triggerfileInputFather" class="pointer">mdi-pencil-outline</v-icon>

          <v-file-input 
          ref="fileInputFather" v-model="selectedImgFather" flat variant="solo" 
          class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChangeFather"
          style="display: none;"
          ></v-file-input>
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-text-field
          v-model="mothers_name"
          :class="{'textfield-error': contactsError, 'login-textfield': true}"
          bg-color="#F0F0F0 "
          placeholder="Mother's Name"
          variant="solo" 
          autocomplete="off"
          maxlength="150"
          flat
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-text-field
          v-model="fathers_name"
          :class="{'textfield-error': contactsError, 'login-textfield': true}"
          bg-color="#F0F0F0 "
          placeholder="Father's Name"
          variant="solo" 
          autocomplete="off"
          maxlength="150"
          flat
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-text-field
          v-model="mothers_number"
          :class="{'textfield-error': contactsError, 'login-textfield': true}"
          bg-color="#F0F0F0 "
          placeholder="Mother's contact number"
          variant="solo" 
          flat
          autocomplete="off"
          maxlength="150"
          type="number"
          hide-spin-buttons
          append-inner-icon="mdi-phone-outline"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-text-field
          v-model="fathers_number"
          :class="{'textfield-error': contactsError, 'login-textfield': true}"
          bg-color="#F0F0F0 "
          placeholder="Father's contact number"
          variant="solo" 
          type="number"
          autocomplete="off"
          maxlength="150"
          hide-spin-buttons
          flat
          hide-details
          append-inner-icon="mdi-phone-outline"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <v-autocomplete
          v-model="mothers_role"
          placeholder="Role"
          flat
          autocomplete="off"
          bg-color="#F0F0F0"
          :class="{'textfield-error': contactsError, 'autocomplete-register': true}"
          menu-icon="mdi-chevron-up"
          hide-details
          :items="['PRIMARY', 'SECONDARY']"
          variant="solo"
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
          autocomplete="off"
          bg-color="#F0F0F0"
          :class="{'textfield-error': contactsError, 'autocomplete-register': true}"
          menu-icon="mdi-chevron-up"
          hide-details
          :items="['PRIMARY', 'SECONDARY']"
          variant="solo"
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
          bg-color="#F0F0F0 "
          autocomplete="off"
          placeholder="Contact Name 1"
          variant="solo" 
          maxlength="150"
          flat
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" class="pa-2">
        <v-text-field
          v-model="contact_name2"
          class="login-textfield"
          bg-color="#F0F0F0 "
          maxlength="150"
          autocomplete="off"
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
          autocomplete="off"
          bg-color="#F0F0F0 "
          class="autocomplete-register"
          menu-icon="mdi-chevron-up"
          hide-details
          :items="['Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Sibling', 'Legal Guardian', 'Family Friend', 'Other']"
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
          autocomplete="off"
          bg-color="#F0F0F0 "
          class="autocomplete-register"
          hide-details
          menu-icon="mdi-chevron-up"
          :items="['Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Sibling', 'Legal Guardian', 'Family Friend', 'Other']"
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
          bg-color="#F0F0F0"
          maxlength="150"
          autocomplete="off"
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
          maxlength="150"
          autocomplete="off"
          bg-color="#F0F0F0 "
          placeholder="Contact Number 2"
          variant="solo" 
          append-inner-icon="mdi-phone-outline"
          flat
          hide-details
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
        maxlength="300"
        hide-details
        bg-color="#F0F0F0"
        :class="{'text-area': true}"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="fullw mt-10 mb-2">
      <template v-if="enrolled_btn">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeEnrolled" :class="{ 'active-toggle': enrolled_btn }"> 
              Schedule 
            </v-btn>
            <v-btn value="students" flat class="toggle-btn toggle-btn-large" @click="activeTransition" :class="{'active-toggle': transition_btn}"> 
              Transition Schedule
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            Enrollment
          </h3>
        </v-col>

        <v-col cols="12" sm="12" class="pa-2">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field v-model="formattedStartDate" autocomplete="off" class="login-textfield" placeholder="MM-DD-YYYY" variant="solo"
                flat readonly hide-details append-inner-icon="mdi-calendar" v-bind="props"
                @click:append-inner="props.onClick"></v-text-field>
            </template>

            <v-date-picker v-model="start_date_class" @update:model-value="formatStartDate" :max-date="new Date()"
              :close-on-click="false" :close-on-content-click="false"></v-date-picker>
          </v-menu>
        </v-col>
      </template>

      <template v-if="transition_btn">
        <v-col cols="12" align="left">
          <div class="custom-toggle">
            <v-btn value="teachers" flat class="toggle-btn" @click="activeEnrolled" :class="{ 'active-toggle': enrolled_btn }"> 
              Schedule 
            </v-btn>
            <v-btn value="students" flat class="toggle-btn toggle-btn-large" @click="activeTransition" :class="{'active-toggle': transition_btn}"> 
              Transition Schedule
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" align="left" class="pa-2">
          <h3 class="font2 tleft" style="color: #262B63;">
            Transition
          </h3>
        </v-col>

        <v-col cols="12" sm="12" class="pa-2">
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field v-model="formattedTransitionDate" autocomplete="off" class="login-textfield" placeholder="MM-DD-YYYY" variant="solo"
                flat readonly hide-details append-inner-icon="mdi-calendar" v-bind="props"
                @click:append-inner="props.onClick"></v-text-field>
            </template>

            <v-date-picker v-model="transition_date_class" @update:model-value="formatTransitionDate" :max-date="new Date()"
              :close-on-click="false" :close-on-content-click="false"></v-date-picker>
          </v-menu>
        </v-col>
      </template>
    </v-row>

    <template v-if="enrolled_btn">
      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days Enrolled</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_enrolled" density="compact" hide-details label="Monday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_enrolled" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_enrolled" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_enrolled" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_enrolled" density="compact" hide-details label="Friday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_enrolled" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_enrolled" density="compact" hide-details label="Sunday"
            color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Before school</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_before" density="compact" hide-details label="Monday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_before" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_before" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_before" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_before" density="compact" hide-details label="Friday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_before" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_before" density="compact" hide-details label="Sunday"
            color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">After school</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_after" density="compact" hide-details label="Monday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_after" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_after" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_after" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_after" density="compact" hide-details label="Friday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_after" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_after" density="compact" hide-details label="Sunday" color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="fullw mt-10 big-checkboxes-container">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Class</span>
        </v-col>

        <v-btn flat class="add-icon btn" @click="addClass">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-col v-for="(item, index) in dataForClass" :key="index" cols="12" sm="12" class="pa-2 flex center gap4">
          <v-autocomplete 
          v-model.number="item.select_class" 
          placeholder="Select Class" 
          flat 
          autocomplete="off"
          bg-color="#F0F0F0 "
          class="autocomplete-register" 
          hide-details 
          menu-icon="mdi-chevron-up" 
          :items="selectClassItems"
          item-value="id" 
          :item-title="item => item && item.name && item.class ? `${item.name} - ${item.class}` : ''"
          return-object @update:modelValue="val => select_class = val?.id"
          variant="solo" :menu-props="{
            contentClass: 'rounded-menu',
          }"></v-autocomplete>

          <v-btn class="btn" flat @click="deleteClass(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <template v-if="transition_btn">
      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days Enrolled Transition</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_enrolled_transition" density="compact" hide-details label="Monday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_enrolled_transition" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_enrolled_transition" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_enrolled_transition" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_enrolled_transition" density="compact" hide-details label="Friday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_enrolled_transition" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_enrolled_transition" density="compact" hide-details label="Sunday"
            color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes mb-3">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Before School Transition</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_before_transition" density="compact" hide-details label="Monday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_before_transition" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_before_transition" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_before_transition" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_before_transition" density="compact" hide-details label="Friday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_before_transition" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_before_transition" density="compact" hide-details label="Sunday"
            color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="container-checkboxes">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">After School Transition</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday_after_transition" density="compact" hide-details label="Monday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday_after_transition" density="compact" hide-details label="Tuesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday_after_transition" density="compact" hide-details label="Wednesday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday_after_transition" density="compact" hide-details label="Thursday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday_after_transition" density="compact" hide-details label="Friday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday_after_transition" density="compact" hide-details label="Saturday"
            color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday_after_transition" density="compact" hide-details label="Sunday" color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="fullw mt-10 big-checkboxes-container">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Class</span>
        </v-col>

        <v-btn flat class="add-icon btn" @click="addClassTransition">
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-col v-for="(item, index) in dataForClassTransition" :key="index" cols="12" sm="12" class="pa-2 flex center gap4">
          <v-autocomplete 
          v-model.number="item.select_class_transition" 
          placeholder="Select Class" 
          flat 
          autocomplete="off"
          bg-color="#F0F0F0 "
          class="autocomplete-register" 
          hide-details 
          menu-icon="mdi-chevron-up" 
          :items="selectClassItems"
          item-value="id" 
          :item-title="item => item && item.name && item.class ? `${item.name} - ${item.class}` : ''"
          return-object @update:modelValue="val => select_class_transition = val?.id"
          variant="solo" :menu-props="{
            contentClass: 'rounded-menu',
          }"></v-autocomplete>

          <v-btn class="btn" flat @click="deleteClassTransition(index)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <v-row class="fullw mt-10 big-checkboxes-container">
      <v-col cols="12" align="left">
        <span class="font2 f24 tleft" style="color: #262262;">Additional Programs</span>
      </v-col>

      <v-btn flat class="add-icon btn" @click="addProgram">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-col
        v-for="(item, index) in dataForProgram"
        :key="index"
        cols="12"
        sm="12"
        class="pa-2 flex center gap4"
      >
        <v-autocomplete
          v-model.number="item.selected_program"
          placeholder="Select Program"
          flat
          autocomplete="off"
          bg-color="#F0F0F0 "
          class="autocomplete-register"
          hide-details
          menu-icon="mdi-chevron-up"
          :items="selectProgramItem"
          item-value="id"
          item-title="name"
          return-object
          @update:modelValue="val => selected_program = val?.id"
          variant="solo"
          :menu-props="{
            contentClass: 'rounded-menu',
          }"
        ></v-autocomplete>

        <v-btn class="btn" flat @click="deleteProgram(index)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="fullw mt-10 big-checkboxes-container">
      <v-col cols="12" align="left" class="pa-2">
        <span class="font2 f24 tleft" style="color: #262262;">
          Withdrawal
        </span>
      </v-col>

      <v-col cols="12" sm="12" class="pa-2">
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field v-model="formattedEndDate" autocomplete="off" class="login-textfield" placeholder="MM-DD-YYYY" variant="solo"
              flat readonly hide-details append-inner-icon="mdi-calendar" v-bind="props" bg-color="#F0F0F0"
              @click:append-inner="props.onClick"></v-text-field>
          </template>

          <v-date-picker v-model="end_date_class" @update:model-value="formatEndDate" :max-date="new Date()"
            :close-on-click="false" :close-on-content-click="false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row class="fullw mt-8 mb-2">
      <v-col cols="12" align="right">
        <v-btn class="btn-save" :loading="savingStudent" @click="createStudent">
          Save
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogConfirmationStudent" content-class="dialogConfirmationStudent" persistent>
      <v-card class="card-confirmation">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new student <span class="w600" style="color: #7583D9;">{{ firstName + ' ' + lastName }}</span> has been successfully created.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/students')">Go to Students</v-btn>
          <v-btn flat class="btn2" @click="$router.go(0)">New Student</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from 'vue'
import axiosInstance from '@/plugins/axios';
import dayjs from 'dayjs';


const enrolled_btn = ref(true);
const transition_btn = ref(false);


const activeEnrolled = () =>{
  enrolled_btn.value = true;
  transition_btn.value = false;
};

const activeTransition = () =>{
  transition_btn.value = true;
  enrolled_btn.value = false;
};

const firstNameError = ref('');
const lastNameError = ref('');
const dateOfBirthError = ref('');
const genderError = ref('');
const notesError = ref('');
const daysEnrolledError = ref('');
const additionalProgramsIdsError = ref('');
const classIdError = ref('');
const campusError = ref('');
const contactsError = ref('');
const imageError = ref('');
const formattedDate = ref('');
const formattedStartDate = ref('');
const startDateError = ref('');
const formatDate = (date) => {
  if (!date) {
    formattedDate.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedDate.value = '';
    return;
  }
  formattedDate.value = dayjs(jsDate).format('MM-DD-YYYY');
};

// Sync manual input from text field to dateOfBirth model
const onDateInputChange = () => {
  if (!formattedDate.value) {
    dateOfBirth.value = null;
    return;
  }
  // Try to parse the input using dayjs
  const parsed = dayjs(formattedDate.value, ['MM-DD-YYYY', 'MM-DD-YYYY'], true);
  if (parsed.isValid()) {
    dateOfBirth.value = parsed.toDate();
  } else {
    dateOfBirth.value = null;
  }
};

const onDateInputChangeStartDate = () => {
  if (!formattedStartDate.value) {
    start_date_class.value = null;
    return;
  }
  // Try to parse the input using dayjs
  const parsed = dayjs(formattedStartDate.value, ['MM-DD-YYYY', 'MM-DD-YYYY'], true);
  if (parsed.isValid()) {
    start_date_class.value = parsed.toDate();
  } else {
    start_date_class.value = null;
  }
};

const formatStartDate = (date) => {
  if (!date) {
    formattedStartDate.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedStartDate.value = '';
    return;
  }
  formattedStartDate.value = dayjs(jsDate).format('MM-DD-YYYY');
};


const formatTransitionDate = (date) => {
  if (!date) {
    formattedTransitionDate.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedTransitionDate.value = '';
    return;
  }
  formattedTransitionDate.value = dayjs(jsDate).format('MM-DD-YYYY');
};

const formatEndDate = (date) => {
  if (!date) {
    formattedEndDate.value = '';
    return;
  }
  const jsDate = date instanceof Date ? date : new Date(date);
  if (isNaN(jsDate.getTime())) {
    formattedEndDate.value = '';
    return;
  }
  formattedEndDate.value = dayjs(jsDate).format('MM-DD-YYYY');
};

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
const dateOfBirth = ref(null);
const gender = ref(null);
const notes = ref('');
const start_date_class = ref(null);
const selectProgramItem = ref([]);
const dataPrograms = ref([]);
const selected_program = ref(null);
const sessions = ref('');
const duration = ref('');
const selectCenterItems = ref([]);
const dataCenters = ref([]);
const selectClassItems = ref([]);
const dataClasses = ref([]);
const select_class = ref(null);
const end_date_class = ref(null);
const formattedTransitionDate = ref('');
const transition_date_class = ref(null);
const formattedEndDate = ref('');
const select_class_transition = ref(null);
const select_center = ref(null);
const mothers_role = ref(null);
const fathers_role = ref(null);
const dataIdsProgram = ref(null);
const dataIdsClass = ref(null);
const dataIdsClassTransition = ref(null);
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


const monday_enrolled_transition = ref(false);
const tuesday_enrolled_transition = ref(false);
const wednesday_enrolled_transition = ref(false);
const thursday_enrolled_transition = ref(false);
const friday_enrolled_transition = ref(false);
const saturday_enrolled_transition = ref(false);
const sunday_enrolled_transition = ref(false);

const monday_before_transition = ref(false);
const tuesday_before_transition = ref(false);
const wednesday_before_transition = ref(false);
const thursday_before_transition = ref(false);
const friday_before_transition = ref(false);
const saturday_before_transition = ref(false);
const sunday_before_transition = ref(false);

const monday_after_transition = ref(false);
const tuesday_after_transition = ref(false);
const wednesday_after_transition = ref(false);
const thursday_after_transition = ref(false);
const friday_after_transition = ref(false);
const saturday_after_transition = ref(false);
const sunday_after_transition = ref(false);

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

const addProgram = () => {
  dataForProgram.value.push({ placeholder: 'Select Program' });
};

const deleteProgram = (index) => {
  dataForProgram.value.splice(index, 1);
};

const dataForClass = ref([
  { select_class: null },
])

const addClass = () => {
  dataForClass.value.push({ select_class: null });
};

const deleteClass = (index) => {
  dataForClass.value.splice(index, 1);
};

const dataForClassTransition = ref([
  { select_class_transition: 'Select Class' },
])

const addClassTransition = () => {
  dataForClassTransition.value.push({ placeholder: 'Select Class' });
};

const deleteClassTransition = (index) => {
  dataForClassTransition.value.splice(index, 1);
};

const handleFileChange = (file) => {
  if (file) {
    imagePreviewStudent.value = URL.createObjectURL(file);
  } else {
    imagePreviewStudent.value = null;
  }
};

const triggerfileInputStudent = () => {
  fileInputStudent.value.$el.querySelector('input[type="file"]').click();
};

const handleFileChangeFather = (file) => {
  if (file) {
    imagePreviewFather.value = URL.createObjectURL(file);
  } else {
    imagePreviewFather.value = null;
  }
};

const triggerfileInputFather = () => {
  fileInputFather.value.$el.querySelector('input[type="file"]').click();
};

const handleFileChangeMother = (file) => {
  if (file) {
    imagePreviewMother.value = URL.createObjectURL(file);
  } else {
    imagePreviewMother.value = null;
  }
};

const triggerfileInputMother = () => {
  fileInputMother.value.$el.querySelector('input[type="file"]').click();
};

const createStudent = async () => {
  firstNameError.value = '';
  lastNameError.value = '';
  dateOfBirthError.value = '';
  genderError.value = '';
  daysEnrolledError.value = '';
  classIdError.value = '';
  campusError.value = '';
  startDateError.value = '';
  savingStudent.value = true;

  let hasError = false;

  if (!firstName.value?.trim()) {
    firstNameError.value = 'Please enter a valid first name';
    hasError = true;
  }
  if (!lastName.value?.trim()) {
    lastNameError.value = 'Please enter a valid last name';
    hasError = true;
  }
  if (!dateOfBirth.value) {
    dateOfBirthError.value = 'Please select a valid date of birth';
    hasError = true;
  }
  if (!gender.value) {
    genderError.value = 'Please select a gender';
    hasError = true;
  }
  if (!select_center.value) {
    campusError.value = 'Please select a center';
    hasError = true;
  }
  if (!start_date_class.value) {
    startDateError.value = 'Please select a start date';
    hasError = true;
  }
  if (!dataForClass.value.length || !dataForClass.value.some(item => item.select_class && item.select_class.id)) {
    classIdError.value = 'Please select at least one class';
    hasError = true;
  }
  if (
    !monday_enrolled.value &&
    !tuesday_enrolled.value &&
    !wednesday_enrolled.value &&
    !thursday_enrolled.value &&
    !friday_enrolled.value &&
    !saturday_enrolled.value &&
    !sunday_enrolled.value
  ) {
    daysEnrolledError.value = 'Please select at least one day enrolled';
    hasError = true;
  }

  if (hasError) {
    showAlert('Please fix the highlighted errors', 'error');
    savingStudent.value = false;
    return;
  }
  if (!firstName.value || 
  !lastName.value || 
  !dateOfBirth.value || 
  !gender.value || 
  !select_center.value ) {
    showAlert('Please fill in all required fields', 'error');
    savingStudent.value = false;
    return;
  }else{
      try {
      const formData = new FormData();
      formData.append('firstName', firstName.value.toString());
      formData.append('lastName', lastName.value.toString());
      formData.append('dateOfBirth', dateOfBirth.value);
      formData.append('gender', gender.value);
      formData.append('notes', notes.value);
      formData.append('startDateOfClasses', start_date_class.value);
      formData.append('startDateOfClassesTransition', transition_date_class.value);
      formData.append('endDateOfClasses', end_date_class.value);
      const appendDays = (fieldName, days) => {
        days.forEach(day => formData.append(fieldName, day));
      };
      const selectedDaysEnrolled = [];
      if (monday_enrolled.value) selectedDaysEnrolled.push("Monday");
      if (tuesday_enrolled.value) selectedDaysEnrolled.push("Tuesday");
      if (wednesday_enrolled.value) selectedDaysEnrolled.push("Wednesday");
      if (thursday_enrolled.value) selectedDaysEnrolled.push("Thursday");
      if (friday_enrolled.value) selectedDaysEnrolled.push("Friday");
      if (saturday_enrolled.value) selectedDaysEnrolled.push("Saturday");
      if (sunday_enrolled.value) selectedDaysEnrolled.push("Sunday")
      appendDays('daysEnrolled', selectedDaysEnrolled);
      const selectedDaysBefore = [];
      if (monday_before.value) selectedDaysBefore.push("Monday");
      if (tuesday_before.value) selectedDaysBefore.push("Tuesday");
      if (wednesday_before.value) selectedDaysBefore.push("Wednesday");
      if (thursday_before.value) selectedDaysBefore.push("Thursday");
      if (friday_before.value) selectedDaysBefore.push("Friday");
      if (saturday_before.value) selectedDaysBefore.push("Saturday");
      if (sunday_before.value) selectedDaysBefore.push("Sunday")
      appendDays('beforeSchoolDays', selectedDaysBefore);
      const selectedDaysAfter = [];
      if (monday_after.value) selectedDaysAfter.push("Monday");
      if (tuesday_after.value) selectedDaysAfter.push("Tuesday");
      if (wednesday_after.value) selectedDaysAfter.push("Wednesday");
      if (thursday_after.value) selectedDaysAfter.push("Thursday");
      if (friday_after.value) selectedDaysAfter.push("Friday");
      if (saturday_after.value) selectedDaysAfter.push("Saturday");
      if (sunday_after.value) selectedDaysAfter.push("Sunday")
      appendDays('afterSchoolDays', selectedDaysAfter);
    
      const selectedDaysEnrolledTransition = [];
      if (monday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Monday");
      if (tuesday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Tuesday");
      if (wednesday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Wednesday");
      if (thursday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Thursday");
      if (friday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Friday");
      if (saturday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Saturday");
      if (sunday_enrolled_transition.value) selectedDaysEnrolledTransition.push("Sunday");
      appendDays('daysEnrolledTransition', selectedDaysEnrolledTransition);

      const selectedDaysBeforeTransition = [];
      if (monday_before_transition.value) selectedDaysBeforeTransition.push("Monday");
      if (tuesday_before_transition.value) selectedDaysBeforeTransition.push("Tuesday");
      if (wednesday_before_transition.value) selectedDaysBeforeTransition.push("Wednesday");
      if (thursday_before_transition.value) selectedDaysBeforeTransition.push("Thursday");
      if (friday_before_transition.value) selectedDaysBeforeTransition.push("Friday");
      if (saturday_before_transition.value) selectedDaysBeforeTransition.push("Saturday");
      if (sunday_before_transition.value) selectedDaysBeforeTransition.push("Sunday");
      appendDays('beforeSchoolDaysTransition', selectedDaysBeforeTransition);

      const selectedDaysAfterTransition = [];
      if (monday_after_transition.value) selectedDaysAfterTransition.push("Monday");
      if (tuesday_after_transition.value) selectedDaysAfterTransition.push("Tuesday");
      if (wednesday_after_transition.value) selectedDaysAfterTransition.push("Wednesday");
      if (thursday_after_transition.value) selectedDaysAfterTransition.push("Thursday");
      if (friday_after_transition.value) selectedDaysAfterTransition.push("Friday");
      if (saturday_after_transition.value) selectedDaysAfterTransition.push("Saturday");
      if (sunday_after_transition.value) selectedDaysAfterTransition.push("Sunday");
      appendDays('afterSchoolDaysTransition', selectedDaysAfterTransition);

      dataIdsProgram.value =  dataForProgram.value.map(item => item.selected_program?.id).filter(id => id);
      const programData = [];
      if (dataIdsProgram.value) programData.push(dataIdsProgram.value);
      formData.append('additionalProgramIds', programData)

      dataIdsClass.value =  dataForClass.value.map(item => item.select_class?.id).filter(id => id);
      const classData = [];
      if (dataIdsClass.value) classData.push(dataIdsClass.value);
      formData.append('classIds', classData)

      dataIdsClassTransition.value =  dataForClassTransition.value.map(item => item.select_class_transition?.id).filter(id => id);
      const classDataTransition = [];
      if (dataIdsClassTransition.value) classDataTransition.push(dataIdsClassTransition.value);
      formData.append('classIdsTransition', classDataTransition)

      formData.append('campus', select_center.value.toString());
      const contactsData = [];
      if (mothers_name.value) {
        contactsData.push({
          fullName: mothers_name.value.toString(),
          phone: mothers_number.value.toString(),
          role: mothers_role.value,
          relation: 'Mother'
        });
      }
      if (fathers_name.value) {
        contactsData.push({
          fullName: fathers_name.value.toString(),
          phone: fathers_number.value.toString(),
          role: fathers_role.value,
          relation: 'Father'
        });
      }
      if (contact_name.value) {
        contactsData.push({
          fullName: contact_name.value.toString(),
          phone: contact_number.value.toString(),
          relation: type_relationship1.value,
          role: 'EMERGENCY_1'
        });
      }
      if (contact_name2.value) {
        contactsData.push({
          fullName: contact_name2.value.toString(),
          phone: contact_number2.value.toString(),
          relation: type_relationship2.value,
          role: 'EMERGENCY_2'
        });
      }
      formData.append('contacts', JSON.stringify(contactsData));
      if (selectedImgStudent.value) {
        formData.append('image', selectedImgStudent.value);
      }
      if (selectedImgMother.value) {
        formData.append('imageContactPrimary', selectedImgMother.value);
      }
      if (selectedImgFather.value) {
        formData.append('imageContactSecondary', selectedImgFather.value);
      }
      const response = await axiosInstance.post('/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      savingStudent.value = false;
      dialogConfirmationStudent.value = true;
    }catch (error) {
      savingStudent.value = false;
      showAlert('Error creating student', 'error');
    }
  }
};

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
    
    dataClasses.value = response.data.result.map(classes => ({
      id: classes.id,
      name: classes.name,
      class: classes.campus.name,
    }));

    selectClassItems.value = dataClasses.value;
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

onMounted(() => {
  getPrograms();
  getCenters();
  getClasses();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/student-profile.scss';
</style>