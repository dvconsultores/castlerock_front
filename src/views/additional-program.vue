<template>
  <div id="additional-program">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Additional Programs</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="activity_name"
            class="textfield-registration"
            placeholder="Activity Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-autocomplete
            v-model="select_center"
            placeholder="Select Center"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['Center 1', 'Center 2']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-autocomplete
            v-model="select_number_days"
            placeholder="Select Number of Days"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="['1 day', '2 days', '3 days', 'Every day']"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row class="container-div-form">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days of the Activity</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday" density="compact" hide-details label="Monday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday" density="compact" hide-details label="Tuesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday" density="compact" hide-details label="Wednesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday" density="compact" hide-details label="Thursday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday" density="compact" hide-details label="Friday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday" density="compact" hide-details label="Saturday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday" density="compact" hide-details label="Sunday" color="#3C3C434D"></v-checkbox>
        </v-col>
      </v-row>

      <v-row class="pt-5">
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
            ref="fileInput" v-model="selectedImgProgram" flat variant="solo" 
            class="input-file" prepend-icon="none" hide-details @update:modelValue="handleFileChange"
            ></v-file-input>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" align="right">
          <v-btn flat class="btn-save" @click="openSaveProgram">Save</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogAddProgram" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to add the new program</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400"><span class="w500" style="color: #7583D9;">Swimming,</span> Center 1 </span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="openConfirmationProgram">Yes, register</v-btn>
          <v-btn flat class="btn2" @click="closeAddProgram">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationProgram" content-class="dialogConfirmationProgram" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new additional program <span class="w600" style="color: #7583D9;">(Swimming)</span> has been successfully saved</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1">Additional Programs</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationProgram">New Additional Programs</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const selectedImgProgram = ref(null);
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

const dialogAddProgram = ref(false);
const dialogConfirmationProgram = ref(false);

const openConfirmationProgram = () => {
  dialogAddProgram.value = false;
  dialogConfirmationProgram.value = true;
};

const closeConfirmationProgram = () => {
  dialogConfirmationProgram.value = false;
};

const openSaveProgram = () => {
  dialogAddProgram.value = true;
};

const closeAddProgram = () => {
  dialogAddProgram.value = false;
};

const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);

</script>

<style lang="scss">
@import '@/assets/styles/pages/additional-program.scss';
</style>