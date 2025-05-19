<template>
  <div id="new-center">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">Edit Center</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="8" class="pb-0">
          <v-text-field
            v-model="center_name"
            class="textfield-registration"
            placeholder="Center Name"
            maxlength="150"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" class="pb-0">
          <v-text-field
            v-model="phone_center"
            class="textfield-registration"
            placeholder="Phone of the center"
            variant="solo" 
            maxlength="150"
            flat
            hide-details
            type="number"
            hide-spin-buttons
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="nickname_center"
            class="textfield-registration"
            maxlength="150"
            placeholder="Nickname of the center"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="address"
            class="textfield-registration"
            maxlength="150"
            placeholder="Location"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" align="left">
          <h3 class="font2 tleft" style="color: #262262;">Image</h3>
        </v-col>

        <v-col cols="12">
          <v-card flat class="card-img-upload flexcol center gap1">
            <template v-if="!imagePreview && !currentImage">
              <img src="@/assets/sources/icons/cloud_upload.svg" alt="Cloud">
              <span class="mb-0 font2 f22 tcenter">Upload Image</span>
              <span class="f16 w400 mb-4">Drag and drop the image</span>
            </template>
            
            <div class="img-preview-container" v-if="imagePreview || currentImage">
              <img 
                :src="imagePreview || currentImage" 
                alt="Preview" 
                class="preview-image"
              >
            </div>
            
            <v-btn @click="triggerFileInput">Upload</v-btn>

            <v-file-input 
            ref="fileInput" v-model="selectedImgCenter" flat variant="solo" 
            class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChange"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" align="right">
          <v-btn flat class="btn-save" @click="openSaveCenter">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogUpdateCenter" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to update this center?</span>
        <hr class="mt-2 mb-5">
        <span class="w500" style="color: #7583D9;">{{ center_name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="updateCenter" :loading="loadingCenter">Yes, update</v-btn>
          <v-btn flat class="btn2" @click="closeUpdateCenter">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationCenter" content-class="dialogConfirmationCenter" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully updated!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The center <span class="w600" style="color: #7583D9;">{{ center_name }}</span> has been successfully updated</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/centers')">Centers</v-btn>
          <v-btn flat class="btn2" @click="dialogConfirmationCenter = false">Edit Center</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/plugins/axios';

const route = useRoute();
const centerId = ref(route.params.id);
const showAlert = inject('showAlert');
const fileInput = ref(null);
const selectedImgCenter = ref(null);
const imagePreview = ref(null);
const currentImage = ref(null);
const center_name = ref('');
const phone_center = ref(''); 
const nickname_center = ref('');
const address = ref('');
const loadingCenter = ref(false);
const dialogUpdateCenter = ref(false);
const dialogConfirmationCenter = ref(false);

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

const openSaveCenter = () => {
  if (center_name.value?.trim() && phone_center.value?.trim() && nickname_center.value?.trim() && address.value?.trim() && imagePreview.value || currentImage.value) {
    dialogUpdateCenter.value = true;
  }else {
    showAlert('Please fill in all fields', 'error');
    return;
  }
};

const closeUpdateCenter = () => {
  dialogUpdateCenter.value = false;
};

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

const updateCenter = async () => {
  loadingCenter.value = true;
  try {
    const formData = new FormData();
    formData.append('name', center_name.value.toString());
    formData.append('phone', phone_center.value.toString());
    formData.append('nickname', nickname_center.value.toString());
    formData.append('address', address.value.toString());
    
    if (selectedImgCenter.value) {4
      formData.append('image', selectedImgCenter.value);
    }
    const response = await axiosInstance.patch(`/campus/${centerId.value}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingCenter.value = false;
    dialogUpdateCenter.value = false;
    dialogConfirmationCenter.value = true;
  } catch (error) {
    showAlert('Failed to update center', 'error');
    loadingCenter.value = false;
  }
};

onMounted(() => {
  loadCenterData();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-center.scss';
</style>