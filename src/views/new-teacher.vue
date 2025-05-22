<template>
  <div id="new-teacher">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Teacher</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-autocomplete
            v-model.number="select_teacher"
            placeholder="Select a Teacher"
            flat
            :class="{'textfield-error': teacherError, 'autocomplete-register': true}"
            menu-icon="mdi-chevron-up"
            :items="selectTeacherItems"
            item-value="id"
            item-title="user_name"
            return-object
            @update:modelValue="val => select_teacher = val?.id"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" class="pb-0 pt-0">
          <v-autocomplete
            v-model.number="select_center"
            placeholder="Select Center"
            flat
            :class="{'textfield-error': centerError, 'autocomplete-register': true}"
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

        <!-- <v-col cols="12" sm="9" class="pb-0">
          <v-text-field
            v-model="teacher_name"
            class="textfield-registration"
            placeholder="Teacher Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="3" class="pb-0">
          <v-text-field
            v-model="number_teacher"
            class="textfield-registration"
            placeholder="Number of the teacher"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="center"
            class="textfield-registration"
            placeholder="Center"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col> -->
      </v-row>

      <!-- <v-row>
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
            
            <v-btn @click="triggerFileInput">Upload</v-btn>

            <v-file-input 
            ref="fileInput" v-model="selectedImgTeacher" flat variant="solo" 
            class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChange"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row> -->

      <v-row class="mt-10">
        <v-col cols="12" align="right">
          <v-btn flat class="btn-save" @click="openSaveTeacher">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogAddTeacher" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to create this new teacher?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400">
          <span class="w500" style="color: #7583D9;">{{ selectedTeacherName }},</span>
          {{ selectedCenterName }}
        </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createTeacher" :loading="loadingCreate">Yes, add</v-btn>
          <v-btn flat class="btn2" @click="dialogAddTeacher = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationTeacher" content-class="dialogConfirmationTeacher" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new center <span class="w600" style="color: #7583D9;">{{ selectedTeacherName }}</span> has been successfully created</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/teachers')">Teachers</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationTeacher">New Teacher</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';

// const fileInput = ref(null);
// const selectedImgTeacher = ref(null);
// const imagePreview = ref(null);

// const handleFileChange = (file) => {
//   if (file) {
//     imagePreview.value = URL.createObjectURL(file);
//   } else {
//     imagePreview.value = null;
//   }
// };

// const triggerFileInput = () => {
//   fileInput.value.$el.querySelector('input[type="file"]').click();
// };

const teacherError = ref('');
const centerError = ref('');
const showAlert = inject('showAlert');
const dialogAddTeacher = ref(false);
const dialogConfirmationTeacher = ref(false);
const selectCenterItems = ref([]);
const dataCenters = ref([]);
const select_center = ref('Select a Center');
const dataUsers = ref([]);
const select_teacher = ref('Select a Teacher');
const selectTeacherItems = ref([]);
const loadingCreate = ref(false);

const selectedTeacherName = computed(() => {
  return selectTeacherItems.value.find(t => t.id === select_teacher.value)?.user_name;
});

const selectedCenterName = computed(() => {
  return selectCenterItems.value.find(c => c.id === select_center.value)?.name;
});

const createTeacher = async () => {
  dialogAddTeacher.value = false;
  loadingCreate.value = true;

  try{
    const response = await axiosInstance.post('/teachers',{
      user: select_teacher.value,
      campus: select_center.value,
    })
    loadingCreate.value = false;
    dialogConfirmationTeacher.value = true;
  }catch(error){
    showAlert('Failed to create new teacher', 'error');
    loadingCreate.value = false;
  }
};

const closeConfirmationTeacher = () => {
  select_teacher.value = 'Select a Teacher';
  select_center.value = 'Select a Center';
  dialogConfirmationTeacher.value = false;
};

const openSaveTeacher = () => {
  teacherError.value = '';
  centerError.value = '';
  
  if(!selectedTeacherName.value){
    teacherError.value = 'Please select a teacher';
    showAlert(teacherError.value, 'error');
    return;
  }
  if(!selectedCenterName.value){
    centerError.value = 'Please select a center';
    showAlert(centerError.value, 'error');
    return;
  }
  if(!selectedTeacherName.value || !selectedCenterName.value ) {
    showAlert('Please select a teacher and a center', 'error');
    return;
  }else{
   dialogAddTeacher.value = true;
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

const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');

    dataUsers.value = response.data.result.filter(user => user.role === "TEACHER").map(user => ({
        id: user.id,
        user_name: user.firstName + ' ' + user.lastName,
      }));

    selectTeacherItems.value = dataUsers.value;
  } catch (error) {
    showAlert('Error fetching users', 'error');
  }
};

onMounted(() => {
  getCenters();
  getUsers();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-teacher.scss';
</style>