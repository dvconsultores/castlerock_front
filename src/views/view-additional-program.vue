<template>
  <div id="additional-program">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">Edit Additional Programs</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0 pl-0">
          <v-text-field
            v-model="name"
            class="textfield-registration"
            placeholder="Activity Name"
            variant="solo" 
            flat
            readonly
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-autocomplete
            v-model.number="select_center"
            placeholder="Select Center"
            flat
            class="autocomplete-register"
            menu-icon=""
            readonly
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

      <v-row class="container-div-form">
        <v-col cols="12" align="left">
          <span class="font2 f24 tleft" style="color: #262262;">Days of the Activity</span>
        </v-col>

        <v-col cols="12" class="jspace">
          <v-checkbox v-model="monday" readonly density="compact" hide-details label="Monday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="tuesday" readonly density="compact" hide-details label="Tuesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="wednesday" readonly density="compact" hide-details label="Wednesday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="thursday" readonly density="compact" hide-details label="Thursday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="friday" readonly density="compact" hide-details label="Friday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="saturday" readonly density="compact" hide-details label="Saturday" color="#3C3C434D"></v-checkbox>
          <v-checkbox v-model="sunday" readonly density="compact" hide-details label="Sunday" color="#3C3C434D"></v-checkbox>
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
              <span class="mb-0 font2 f22 tcenter">No Image</span>
            </template>
            
            <div class="img-preview-container" v-if="imagePreview">
              <img 
                :src="imagePreview" 
                alt="Preview" 
                class="preview-image"
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog v-model="dialogAddProgram" content-class="dialogAdd" persistent>
      <v-card class="card-add-program">
        <img src="@/assets/sources/icons/save.svg" alt="Save">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to update the program:</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w500" style="color: #7583D9;">{{ name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="updateProgram" :loading="loadingProgram">Yes, update</v-btn>
          <v-btn flat class="btn2" @click="dialogAddProgram = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationProgram" content-class="dialogConfirmationProgram" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully update!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The additional program <span class="w600" style="color: #7583D9;">({{ name }})</span> has been successfully update.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/programs')">Additional Programs</v-btn>
          <v-btn flat class="btn2" @click="dialogConfirmationProgram = false">Edit Additional Programs</v-btn>
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

const route = useRoute();
const programId = ref(route.params.id);
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

const stateValue = () =>{
  if(monday.value || tuesday.value || wednesday.value || thursday.value || friday.value || saturday.value || sunday.value){
    return true;
  }else{
    return false;
  }
}

const openSaveProgram = () => {
  if (name.value?.trim() && select_center.value && imagePreview.value && stateValue()) {
    dialogAddProgram.value = true;
  }else {
    showAlert('Please fill in all fields', 'error');
    return;
  }
};

const updateProgram = async () => {
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
    const response = await axiosInstance.patch(`/additional-programs/${programId.value}`, formData, {
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

const loadDataProgram = async () => {
 try {
    const response = await axiosInstance.get(`/additional-programs/${programId.value}`);
    const program = response.data.result;
    console.log('Program data:', program);

    name.value = program.name;
    imagePreview.value = program.image;
    select_center.value = program.campus.name;
    monday.value = false;
    tuesday.value = false;
    wednesday.value = false;
    thursday.value = false;
    friday.value = false;
    saturday.value = false;
    sunday.value = false;
    program.days.forEach(day => {
      switch (day) {
        case 'Monday':
          monday.value = true;
          break;
        case 'Tuesday':
          tuesday.value = true;
          break;
        case 'Wednesday':
          wednesday.value = true;
          break;
        case 'Thursday':
          thursday.value = true;
          break;
        case 'Friday':
          friday.value = true;
          break;
        case 'Saturday':
          saturday.value = true;
          break;
        case 'Sunday':
          sunday.value = true;
          break;
      }
    });
  } catch (error) {
    console.error('Failed to load center data', error);
  }
}

onMounted(() => {
  getCenters();
  loadDataProgram();
});

</script>

<style lang="scss">
@import '@/assets/styles/pages/additional-program.scss';
</style>