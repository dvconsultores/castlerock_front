<template>
  <div id="new-teacher">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">Edit Teacher</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="teacher_name"
            class="textfield-registration"
            placeholder="Teacher Name"
            variant="solo" 
            flat
            readonly
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0 pt-0">
          <v-autocomplete
            v-model.number="select_center"
            placeholder="Select Center"
            flat
            class="autocomplete-register"
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
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to update this teacher?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400">
          <span class="w500" style="color: #7583D9;">{{ teacher_name }},</span>
          {{ selectedCenterName }}
        </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="updateTeacher" :loading="loadingCreate">Yes, update</v-btn>
          <v-btn flat class="btn2" @click="dialogAddTeacher = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationTeacher" content-class="dialogConfirmationTeacher" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The Teacher <span class="w600" style="color: #7583D9;">{{ teacher_name }}</span> has been successfully updated.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/teachers')">Teachers</v-btn>
          <v-btn flat class="btn2" @click="dialogConfirmationTeacher = false">Edit Teacher</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';

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

const route = useRoute();
const showAlert = inject('showAlert');
const dialogAddTeacher = ref(false);
const dialogConfirmationTeacher = ref(false);
const selectCenterItems = ref([]);
const dataCenters = ref([]);
const select_center = ref('Select a Center');
const select_teacher = ref('Select a Teacher');
const selectTeacherItems = ref([]);
const loadingCreate = ref(false);
const teacherId = ref(route.params.id);
const teacher_name = ref('');

const selectedCenterName = computed(() => {
  return selectCenterItems.value.find(c => c.id === select_center.value)?.name;
});

const updateTeacher = async () => {
  dialogAddTeacher.value = false;
  loadingCreate.value = true;

  try{
    console.log('Selected Center:', select_center.value);
    const response = await axiosInstance.patch(`/teachers/${teacherId.value}`, {
      campus: select_center.value
    });
    loadingCreate.value = false;
    dialogConfirmationTeacher.value = true;
  }catch(error){
    showAlert('Failed to update teacher', 'error');
    loadingCreate.value = false;
  }
};

const openSaveTeacher = () => {
  if(!selectedCenterName.value ) {
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

const getTeacher = async () => {
  try {
    const response = await axiosInstance.get(`/teachers/${teacherId.value}`);
    const teacher = response.data.result;
    
    teacher_name.value = teacher.user.firstName + ' ' + teacher.user.lastName;
    select_center.value = teacher.campus.id;
  } catch (error) {
    console.error('Failed to load center data', error);
  }
};

onMounted(() => {
  getCenters();
  getTeacher();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-teacher.scss';
</style>