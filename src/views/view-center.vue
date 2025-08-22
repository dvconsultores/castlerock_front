<template>
  <div id="new-center">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">View Center</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="8" class="pb-0">
          <v-text-field
            v-model="center_name"
            class="textfield-registration"
            placeholder="Center Name"
            variant="solo" 
            autocomplete="off"
            readonly
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
            flat
            autocomplete="off"
            readonly
            hide-details
            type="number"
            hide-spin-buttons
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="nickname_center"
            class="textfield-registration"
            placeholder="Nickname of the center"
            variant="solo" 
            flat
            autocomplete="off"
            readonly
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="address"
            class="textfield-registration"
            placeholder="Location"
            variant="solo" 
            autocomplete="off"
            readonly
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
          </v-card>
        </v-col>
      </v-row>
    </v-form>
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

const handleFileChange = (file) => {
  if (file) {
    imagePreview.value = URL.createObjectURL(file);
  } else {
    imagePreview.value = null;
  }
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
    showAlert('Failed to load center data', 'error');
  }
};

onMounted(() => {
  loadCenterData();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-center.scss';
</style>