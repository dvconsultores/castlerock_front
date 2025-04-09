<template>
  <div id="new-center">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Center</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="9" class="pb-0">
          <v-text-field
            v-model="center_name"
            class="textfield-registration"
            placeholder="Center Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="3" class="pb-0">
          <v-text-field
            v-model="number_center"
            class="textfield-registration"
            placeholder="Number of the center"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="location"
            class="textfield-registration"
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
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Center New,</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmationCenter">Yes, add</v-btn>
          <v-btn flat class="btn2" @click="closeAddCenter">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationCenter" content-class="dialogConfirmationCenter" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully saved!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new center <span class="w600" style="color: #7583D9;">(Center New)</span> has been successfully created</span>
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
import { ref } from 'vue';

const fileInput = ref(null);
const selectedImgCenter = ref(null);
const imagePreview = ref(null);

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

const dialogAddCenter = ref(false);
const dialogConfirmationCenter = ref(false);

const openConfirmationCenter = () => {
  dialogAddCenter.value = false;
  dialogConfirmationCenter.value = true;
};

const closeConfirmationCenter = () => {
  dialogConfirmationCenter.value = false;
};

const openSaveCenter = () => {
  dialogAddCenter.value = true;
};

const closeAddCenter = () => {
  dialogAddCenter.value = false;
};

</script>

<style lang="scss">
@import '@/assets/styles/pages/new-center.scss';
</style>