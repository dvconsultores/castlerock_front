<template>
  <div id="new-center">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Center</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="8" class="pb-0">
          <v-text-field
            v-model="center_name"
            :class="{'textfield-error': centerError, 'textfield-registration': true}"
            placeholder="Center Name"
            variant="solo" 
            autocomplete="off"
            maxlength="150"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" class="pb-0">
          <v-text-field
            v-model="phone_center"
            :class="{'textfield-error': phoneError, 'textfield-registration': true}"
            placeholder="Phone of the center"
            variant="solo" 
            flat
            autocomplete="off"
            maxlength="150"
            hide-details
            type="number"
            hide-spin-buttons
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="nickname_center"
            :class="{'textfield-error': nicknameError, 'textfield-registration': true}"
            placeholder="Nickname of the center"
            variant="solo" 
            autocomplete="off"
            maxlength="150"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="address"
            :class="{'textfield-error': addressError, 'textfield-registration': true}"
            placeholder="Location"
            variant="solo" 
            autocomplete="off"
            maxlength="150"
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
            
            <v-btn :class="{'btn-error': imgError}" @click="triggerFileInput">Upload</v-btn>

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

    <v-dialog v-model="dialogAddCenter" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to create this new center?</span>
        <hr class="mt-2 mb-5">
        <span class="w500" style="color: #7583D9;">{{ center_name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createCenter" :loading="loadingCenter">Yes, add</v-btn>
          <v-btn flat class="btn2" @click="closeAddCenter">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationCenter" content-class="dialogConfirmationCenter" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new center <span class="w600" style="color: #7583D9;">{{ center_name }}</span> has been successfully created.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/centers')">Centers</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationCenter">New Center</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import axiosInstance from '@/plugins/axios';


const fileInput = ref(null);
const selectedImgCenter = ref(null);
const imagePreview = ref(null);
const center_name = ref('');
const phone_center = ref(''); 
const nickname_center = ref('');
const address = ref('');
const loadingCenter = ref(false);
const showAlert = inject('showAlert');
const dialogAddCenter = ref(false);
const dialogConfirmationCenter = ref(false);
const centerError = ref('');
const phoneError = ref('');
const nicknameError = ref('');
const addressError = ref('');
const imgError = ref('');

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

const closeConfirmationCenter = () => {
  center_name.value = '';
  phone_center.value = '';
  nickname_center.value = '';
  address.value = '';
  imagePreview.value = null;
  dialogConfirmationCenter.value = false;
};

const openSaveCenter = () => {
  centerError.value = '';
  phoneError.value = '';
  nicknameError.value = '';
  addressError.value = '';
  imgError.value = '';

  const errors = [];
  
  if (!center_name.value?.trim()) {
    centerError.value = 'Please enter a valid center name';
    errors.push(centerError.value);
  }

  if (!phone_center.value?.trim()) {
    phoneError.value = 'Please enter a valid phone number';
    errors.push(phoneError.value);
  }

  if (!nickname_center.value?.trim()) {
    nicknameError.value = 'Please enter a valid nickname';
    errors.push(nicknameError.value);
  }

  if (!address.value?.trim()) {
    addressError.value = 'Please enter a valid address';
    errors.push(addressError.value);
  }

  if (!imagePreview.value) {
    imgError.value = 'Please enter a valid image';
    errors.push(imgError.value);
  }

  if (errors.length > 0) {
    showAlert(errors.join('\n'), 'error');
    return;
  }

  dialogAddCenter.value = true;
};

const closeAddCenter = () => {
  dialogAddCenter.value = false;
};

const createCenter = async () => {
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
    const response = await axiosInstance.post('/campus', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingCenter.value = false;
    dialogAddCenter.value = false;
    dialogConfirmationCenter.value = true;
  } catch (error) {
    showAlert('Failed to create centers', 'error');
    loadingCenter.value = false;
  }
};

</script>

<style lang="scss">
@import '@/assets/styles/pages/new-center.scss';
</style>