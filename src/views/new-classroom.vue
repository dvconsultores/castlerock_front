<template>
  <div id="new-classroom">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Classroom</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="9" class="pb-0">
          <v-text-field
            v-model="name"
            :class="{'textfield-error': nameError, 'textfield-registration': true}"
            placeholder="Classroom Name"
            variant="solo" 
            maxlength="150"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="3" class="pb-0">
          <v-text-field
            v-model="maxCapacity"
            :class="{'textfield-error': maxCapacityError, 'textfield-registration': true}"
            placeholder="Number of students"
            variant="solo"
            maxlength="150" 
            flat
            hide-details
            type="number"
            hide-spin-buttons
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-autocomplete
            v-model="program"
            placeholder="Program"
            flat
            :class="{'textfield-error': programError, 'autocomplete-register': true}"
            menu-icon="mdi-chevron-up"
            :items="['PRIMARY', 'TODDLER']"
            variant="solo"
            hide-details
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-autocomplete
            v-model.number="select_center"
            placeholder="Select Center"
            flat
            :class="{'textfield-error': selectCenterError, 'autocomplete-register': true}"
            menu-icon="mdi-chevron-up"
            :items="selectCenterItems"
            item-value="id"
            item-title="name"
            return-object
            hide-details
            @update:modelValue="val => select_center = val?.id"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="pb-0 mb-6">
          <v-autocomplete
            v-model="classType"
            placeholder="Select Class Type"
            flat
            :class="{'textfield-error': selectClassTypeError, 'autocomplete-register': true}"
            menu-icon="mdi-chevron-up"
            :items="selectClassTypeItems"
            item-value="id"
            item-title="name"
            return-object
            hide-details
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" align="left">
          <h3 class="font2 tleft" style="color: #262262;">Image</h3>
        </v-col>

        <v-col cols="12">
          <v-card flat class="card-img-upload flexcol center gap1">
            <template v-if="!imagePreview">
              <img src="@/assets/sources/icons/cloud_upload.svg" alt="Cloud">
              <span class="mb-0 font2 f22 tcenter">Upload Image</span>
              <span class="f16 w400 mb-4">Drag and drop the image</span>
            </template>
            
            <div class="img-preview-container" v-if="imagePreview">
              <img 
                :src="imagePreview" 
                alt="Preview" 
                class="preview-image"
              >
            </div>
            
            <v-btn :class="{'btn-error': imgError}"  @click="triggerFileInput">Upload</v-btn>

            <v-file-input 
            ref="fileInput" v-model="selectedImgClassroom" flat variant="solo" 
            class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChange"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" align="right">
          <v-btn flat class="btn-save" @click="openSaveClassroom">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogAddClassroom" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to create this new classroom?</span>
        <hr class="mt-2 mb-5">
        <span class="w500" style="color: #7583D9;">{{ name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createClass" :loading="loadingClass">Yes, add</v-btn>
          <v-btn flat class="btn2" @click="dialogAddClassroom = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationClassroom" content-class="dialogConfirmationClassroom" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new class <span class="w600" style="color: #7583D9;">{{ name }}</span> has been successfully created.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/classrooms')">Classrooms</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationClassroom">New Classrooms</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';

const fileInput = ref(null);
const selectedImgClassroom = ref(null);
const imagePreview = ref(null);
const dataCenters = ref([]);
const name = ref('');
const maxCapacity = ref('');
const program = ref(null);
const select_center = ref(null);
const loadingClass = ref(false);
const showAlert = inject('showAlert');
const selectCenterItems = ref([]);
const dialogAddClassroom = ref(false);
const dialogConfirmationClassroom = ref(false);
const nameError = ref('');
const maxCapacityError = ref('');
const programError = ref('');
const selectCenterError = ref('');
const imgError = ref('');
const classType = ref(null);
const selectClassTypeError = ref('');

const selectClassTypeItems = ref([
  { id: 'ENROLLED', name: 'Enrolled' },
  { id: 'AFTER_SCHOOL', name: 'After School' },
  { id: 'BEFORE_SCHOOL', name: 'Before School' },
]);

const handleFileChange = (file) => {
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
};

const triggerFileInput = () => {
  fileInput.value.$el.querySelector('input[type="file"]').click();
};

const closeConfirmationClassroom = () => {
  name.value = '';
  maxCapacity.value = '';
  program.value = null;
  select_center.value = null;
  imagePreview.value = null;
  selectedImgClassroom.value = null;
  fileInput.value = null;
  dialogConfirmationClassroom.value = false;
};

const openSaveClassroom = () => {
  nameError.value = '';
  maxCapacityError.value = '';
  programError.value = '';
  selectCenterError.value = '';
  imgError.value = '';
  selectClassTypeError.value = '';

  const errors = [];
  
  if (!name.value?.trim()) {
    nameError.value = 'Please enter a valid classroom name';
    errors.push(nameError.value);
  }

  if (!maxCapacity.value) {
    maxCapacityError.value = 'Please enter a valid number';
    errors.push(maxCapacityError.value);
  } else if (isNaN(parseInt(maxCapacity.value))) {
    maxCapacityError.value = 'Max capacity must be a number';
    errors.push(maxCapacityError.value);
  }

  if (!program.value) {
    programError.value = 'Please select a valid program';
    errors.push(programError.value);
  }

  if (!select_center.value) {
    selectCenterError.value = 'Please select a valid center';
    errors.push(selectCenterError.value);
  }

  if (!classType.value) {
    selectClassTypeError.value = 'Please select a valid class type';
    errors.push(selectClassTypeError.value);
  }

  if (!imagePreview.value) {
    imgError.value = 'Please enter a valid image';
    errors.push(imgError.value);
  }

  if (errors.length > 0) {
    showAlert(errors.join('\n'), 'error');
    return;
  }
  
  dialogAddClassroom.value = true;
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

const createClass = async () => {
  loadingClass.value = true;
  try {
    const formData = new FormData();
    formData.append('name', name.value.toString());
    formData.append('maxCapacity', Number(maxCapacity.value));
    formData.append('program', program.value.toString());
    formData.append('campus', select_center.value);
    formData.append('classType', classType.value.id);
    
    if (selectedImgClassroom.value) {
      formData.append('image', selectedImgClassroom.value);
    }

    const response = await axiosInstance.post('/classes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingClass.value = false;
    dialogAddClassroom.value = false;
    dialogConfirmationClassroom.value = true;
  } catch (error) {
    showAlert('Error creating classroom', 'error');
    loadingClass.value = false;
  }
};


onMounted(() => {
  getCenters();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/new-classroom.scss';
</style>