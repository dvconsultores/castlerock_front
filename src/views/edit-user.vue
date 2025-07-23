<template>
  <div id="new-user">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New User</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="first_name"
            class="textfield-registration"
            placeholder="First Name"
            variant="solo" 
            maxlength="150"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="last_name"
            class="textfield-registration"
            placeholder="Last Name"
            maxlength="150"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="email"
            class="textfield-registration"
            placeholder="Email"
            maxlength="150"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="phone"
            class="textfield-registration"
            placeholder="Phone"
            type="text"
            maxlength="150"
            variant="solo" 
            hide-spin-buttons
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-autocomplete
            v-model="select_role"
            placeholder="Select Role"
            flat
            class="autocomplete-register"
            menu-icon="mdi-chevron-up"
            :items="itemsRole"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
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
            ref="fileInput" v-model="selectedImgUser" flat variant="solo" 
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
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to edit the user</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w500" style="color: #7583D9;">{{ first_name + ' ' + last_name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="editUser" :loading="loadingUser">Yes, edit</v-btn>
          <v-btn flat class="btn2" @click="dialogAddProgram = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationProgram" content-class="dialogConfirmationProgram" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully updated!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new user <span class="w600" style="color: #7583D9;">({{ first_name + ' ' + last_name }})</span> has been successfully updated.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/users')">User</v-btn>
          <v-btn flat class="btn2" @click="dialogConfirmationProgram = false">New User</v-btn>
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

const route = useRoute();
const idUsers = ref(route.params.id);
const fileInput = ref(null);
const selectedImgUser = ref(null);
const imagePreview = ref(null);
const loadingUser = ref(false);
const showAlert = inject('showAlert');
const itemsRole = ref(['ADMIN', 'TEACHER']);
const dialogAddProgram = ref(false);
const dialogConfirmationProgram = ref(false);
const select_role = ref(null);
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');


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

const openSaveProgram = () => {
  if (first_name.value?.trim() && last_name.value?.trim() && imagePreview.value && email.value?.trim() && phone.value?.trim()) {
    dialogAddProgram.value = true;
  }else {
    showAlert('Please fill in all fields', 'error');
    return;
  }
};

const editUser = async () => {
  loadingUser.value = true;
  try {
    const formData = new FormData();
    formData.append('firstName', first_name.value.toString());
    formData.append('lastName', last_name.value.toString());
    formData.append('email', email.value.toString());
    formData.append('phone', phone.value.toString());
    formData.append('password', password.value.toString());
    formData.append('role', select_role.value.toString());
    
    if (selectedImgUser.value) {4
      formData.append('image', selectedImgUser.value);
    }
    const response = await axiosInstance.patch(`/users/${idUsers.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingUser.value = false;
    dialogAddProgram.value = false;
    dialogConfirmationProgram.value = true;
  } catch (error) {
    showAlert('Error updating user', 'error');
    loadingUser.value = false;
  }
};

const loadUserData = async () => {
  try {
    const response = await axiosInstance.get(`/users/${idUsers.value}`);
    const user = response.data.result;
    
    first_name.value = user.firstName;
    last_name.value = user.lastName;
    email.value = user.email;
    phone.value = user.phone;
    select_role.value = user.role;
    
    if (user.image) {
      imagePreview.value = user.image;
    }
    
  } catch (error) {
    showAlert(error.response?.data?.message || 'Error loading user data', 'error');
    console.error('Error loading user:', error);
  }
};

onMounted(() => {
  if (idUsers.value) {
    loadUserData();
  }
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-user.scss';
</style>