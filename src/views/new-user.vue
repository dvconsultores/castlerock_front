<template>
  <div id="new-user">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">New User</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="first_name"
            :class="{'textfield-error': firstNameError, 'textfield-registration': true}"
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
            :class="{'textfield-error': lastNameError, 'textfield-registration': true}"
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
            :class="{'textfield-error': emailError, 'textfield-registration': true}"
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
            :class="{'textfield-error': phoneError, 'textfield-registration': true}"
            placeholder="Phone"
            type="number"
            maxlength="150"
            variant="solo" 
            hide-spin-buttons
            @keypress="(e) => { if (!/^\d$/.test(e.key) || phone.length >= 20) e.preventDefault(); }"
            @paste="e => { e.preventDefault(); }"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-autocomplete
            v-model="select_role"
            placeholder="Select Role"
            flat
            :class="{'textfield-error': selectRoleError, 'autocomplete-register': true}"
            menu-icon="mdi-chevron-up"
            :items="itemsRole"
            variant="solo"
            :menu-props="{
              contentClass: 'rounded-menu',
            }"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="password"
            :class="{'textfield-error': passwordError, 'textfield-registration': true}"
            placeholder="Default Password"
            maxlength="150"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
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
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Do you want to add the new user?</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w500" style="color: #7583D9;">{{ first_name + ' ' + last_name }}</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="createUser" :loading="loadingUser">Yes, register</v-btn>
          <v-btn flat class="btn2" @click="dialogAddProgram = false">No, cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmationProgram" content-class="dialogConfirmationProgram" persistent>
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">Successfully created!</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">The new user <span class="w600" style="color: #7583D9;">({{ first_name + ' ' + last_name }})</span> has been successfully created.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="$router.push('/home/users')">User</v-btn>
          <v-btn flat class="btn2" @click="closeConfirmationUser">New User</v-btn>
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
const firstNameError = ref('');
const lastNameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const passwordError = ref('');
const selectRoleError = ref('');
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

const closeConfirmationUser = () => {
  first_name.value = '';
  last_name.value = '';
  email.value = '';
  phone.value = '';
  password.value = '';
  select_role.value = null;
  imagePreview.value = null;
  selectedImgUser.value = null;
  fileInput.value = null;
  dialogConfirmationProgram.value = false;
};

const openSaveProgram = () => {
  firstNameError.value = '';
  lastNameError.value = '';
  emailError.value = '';
  phoneError.value = '';
  passwordError.value = '';
  selectRoleError.value = '';
  imageError.value = '';

  const validations = [
    {
      field: first_name,
      errorRef: firstNameError,
      message: 'First name is required',
      trim: true
    },
    {
      field: last_name,
      errorRef: lastNameError,
      message: 'Last name is required',
      trim: true
    },
    {
      field: email,
      errorRef: emailError,
      message: 'Email is required',
      trim: true
    },
    {
      field: phone,
      errorRef: phoneError,
      message: 'Phone is required',
      trim: true
    },
    {
      field: select_role,
      errorRef: selectRoleError,
      message: 'Select a role'
    },
    {
      field: password,
      errorRef: passwordError,
      message: 'Password is required',
      trim: true
    },
    {
      field: imagePreview,
      errorRef: imageError,
      message: 'Image is required'
    }
  ];

  const errors = [];
  
  const emailValue = email.value?.trim();
  if (!emailValue) {
    emailError.value = 'Email is required';
    errors.push(emailError.value);
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailValue)) {
    emailError.value = 'Please enter a valid email (example@domain.com)';
    errors.push(emailError.value);
  }

  for (const {field, errorRef, message, trim} of validations) {
    if (field === email) continue;
    
    const value = trim ? field.value?.trim() : field.value;
    if (!value) {
      errorRef.value = message;
      errors.push(message);
    }
  }

  if (errors.length > 0) {
    showAlert(errors.join('\n'), 'error');
    return;
  }

  dialogAddProgram.value = true;
};

const createUser = async () => {
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
    const response = await axiosInstance.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    loadingUser.value = false;
    dialogAddProgram.value = false;
    dialogConfirmationProgram.value = true;
  } catch (error) {
    showAlert('Error creating classroom', 'error');
    loadingUser.value = false;
  }
};

</script>

<style lang="scss">
@import '@/assets/styles/pages/new-user.scss';
</style>