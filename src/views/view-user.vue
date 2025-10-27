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
            autocomplete="off"
            maxlength="150"
            readonly
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="last_name"
            class="textfield-registration"
            placeholder="Last Name"
            autocomplete="off"
            maxlength="150"
            readonly
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
            autocomplete="off"
            readonly
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
            type="number"
            autocomplete="off"
            readonly
            maxlength="150"
            variant="solo" 
            hide-spin-buttons
            @keypress="(e) => { if (!/^\d$/.test(e.key) || phone.length >= 20) e.preventDefault(); }"
            @paste="e => { e.preventDefault(); }"
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-autocomplete
            v-model="select_role"
            placeholder="Select Role"
            flat
            autocomplete="off"
            class="autocomplete-register"
            menu-icon=""
            readonly
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
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const idUsers = ref(route.params.id);
const imagePreview = ref(null);
const showAlert = inject('showAlert');
const itemsRole = ref(['ADMIN', 'TEACHER']);
const select_role = ref(null);
const first_name = ref('');
const last_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');

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