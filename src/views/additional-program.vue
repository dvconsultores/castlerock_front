<template>
  <div id="additional-program">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New Additional Programs</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="name"
            :class="{'textfield-error': nameError, 'textfield-registration': true}"
            placeholder="Activity Name"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
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
            @update:modelValue="val => select_center = val?.id"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <!-- <v-col cols="12">
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
        </v-col> -->
      </v-row>

      <v-row :class="{'border-red': daysError, 'container-div-form': true}">
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
            
            <v-btn @click="triggerFileInput" :class="{'btn-error': imageError}">Upload</v-btn>

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
        <span class="f16 w500" style="color: #7583D9;">{{ name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createProgram" :loading="loadingProgram">Yes, register</v-btn>
          <v-btn flat class="btn2" @click="dialogAddProgram = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationProgram" content-class="dialogConfirmationProgram" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully deleted!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new additional program <span class="w600" style="color: #7583D9;">({{ name }})</span> has been successfully saved</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/programs')">Additional Programs</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationProgram">New Additional Programs</v-btn>
        </div>
        <span class="underline f14 w500 mt-4 pointer" @click="$router.push('/home')">Go home</span>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue';
import axiosInstance from '@/plugins/axios';

const fileInput = ref(null);
const selectedImgProgram = ref(null);
const imagePreview = ref(null);
const dataCenters = ref([]);
const name = ref('');
const select_center = ref(null);
const loadingProgram = ref(false);
const showAlert = inject('showAlert');
const selectCenterItems = ref([]);
const dialogAddProgram = ref(false);
const dialogConfirmationProgram = ref(false);
const monday = ref(false);
const tuesday = ref(false);
const wednesday = ref(false);
const thursday = ref(false);
const friday = ref(false);
const saturday = ref(false);
const sunday = ref(false);
const nameError = ref('');
const selectCenterError = ref('');
const daysError = ref('');
const imageError = ref('');

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

const closeConfirmationProgram = () => {
  name.value = '';
  select_center.value = '';
  imagePreview.value = null;
  selectedImgProgram.value = null;
  fileInput.value = null;
  monday.value = false;
  tuesday.value = false;
  wednesday.value = false;
  thursday.value = false;
  friday.value = false;
  saturday.value = false;
  sunday.value = false;
  dialogConfirmationProgram.value = false;
};

const stateValue = () =>{
  if(monday.value || tuesday.value || wednesday.value || thursday.value || friday.value || saturday.value || sunday.value){
    return true;
  }else{
    return false;
  }
}

const openSaveProgram = () => {
  nameError.value = '';
  selectCenterError.value = '';
  daysError.value = '';
  imageError.value = '';

  if (!name.value) {
    nameError.value = 'Please enter the activity name';
    showAlert(nameError.value, 'error');
  }

  if (!select_center.value) {
    selectCenterError.value = 'Please select a center';
    showAlert(selectCenterError.value, 'error');
  }

  if (!monday.value && !tuesday.value && !wednesday.value && !thursday.value && !friday.value && !saturday.value && !sunday.value) {
    daysError.value = true;
    showAlert('Please select at least one day enrolled', 'error');
  } else {
    daysError.value = false;
  }

  if (!imagePreview.value) {
    imageError.value = 'Please upload an image';
    showAlert(imageError.value, 'error');
  }

  if (name.value?.trim() && select_center.value && imagePreview.value && stateValue()) {
    dialogAddProgram.value = true;
  }else {
    showAlert('Please fill in all fields', 'error');
    return;
  }
};

const createProgram = async () => {
  loadingProgram.value = true;
  try {
    const formData = new FormData();
    formData.append('name', name.value.toString());
    formData.append('campus', Number(select_center.value));
    const selectedDays = [];
    if (monday.value) selectedDays.push("Monday");
    if (tuesday.value) selectedDays.push("Tuesday");
    if (wednesday.value) selectedDays.push("Wednesday");
    if (thursday.value) selectedDays.push("Thursday");
    if (friday.value) selectedDays.push("Friday");
    if (saturday.value) selectedDays.push("Saturday");
    if (sunday.value) selectedDays.push("Sunday");
    
    selectedDays.forEach(day => {
      formData.append('days[]', day);
    });
    
    if (selectedImgProgram.value) {4
      formData.append('image', selectedImgProgram.value);
    }
    const response = await axiosInstance.post('/additional-programs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingProgram.value = false;
    dialogAddProgram.value = false;
    dialogConfirmationProgram.value = true;
  } catch (error) {
    showAlert('Error creating classroom', 'error');
    loadingProgram.value = false;
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
  getCenters();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/additional-program.scss';
</style>