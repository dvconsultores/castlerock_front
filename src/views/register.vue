<template>
  <div id="register">
    <img src="@/assets/sources/images/up-left-corner.svg" alt="Up" class="img-left-up">
    <img src="@/assets/sources/images/bottom-left-corner.svg" alt="Up" class="img-left-bottom">
    <img src="@/assets/sources/images/bottom-right-corner.svg" alt="Up" class="img-right-bottom">


    <section class="section1-forgot-password">
      <h2 class="font2 tcenter mb-0" style="color: #4E444B;">Register your center</h2>
      <span class="f16 tcenter" style="color: #4E444B;">Enter details to register your center.</span>

      <v-text-field 
      v-model="first_name"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-account-outline" 
      placeholder="Enter your first name"
      hide-details
      maxlength="150"
      :class="{'textfield-error': firstNameError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="last_name"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-account-outline" 
      placeholder="Enter your last name"
      hide-details
      maxlength="150"
      :class="{'textfield-error': lastNameError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="email"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-email-outline" 
      placeholder="Enter your email"
      hide-details
      maxlength="150"
      :class="{'textfield-error': emailError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field
      v-model="password"
      variant="solo"
      flat
      autocomplete="off"
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Enter your new password"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      :rules="passwordRules"
      :class="{'textfield-error': passwordError, 'login-textfield': true}"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field
      v-model="passwordConfirmation"
      variant="solo"
      flat
      autocomplete="off"
      maxlength="150"
      :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off'"
      placeholder="Confirm your new password"
      :rules="passwordMatchRule"
      @click:append-inner="showPassword = !showPassword"
      :type="showPassword ? 'text' : 'password'"
      :class="{'textfield-error': passwordConfirmationError, 'login-textfield': true}"
      style="margin-top: -24px;"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="phone"
      type="number"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-phone-outline" 
      placeholder="Enter your phone number"
      hide-details
      hide-spin-buttons
      style="margin-top: -25px;"
      maxlength="150"
      :class="{'textfield-error': phoneError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="school_name"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-school-outline" 
      placeholder="Enter your school name"
      hide-details
      hide-spin-buttons
      maxlength="150"
      :class="{'textfield-error': schoolNameError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="school_address"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-map-marker-outline" 
      placeholder="Enter your school address"
      hide-details
      hide-spin-buttons
      maxlength="150"
      :class="{'textfield-error': schoolAddressError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-text-field 
      v-model="school_phone"
      type="number"
      variant="solo" 
      flat
      autocomplete="off"
      prepend-inner-icon="mdi-phone-dial-outline" 
      placeholder="Enter your school phone number"
      hide-details
      hide-spin-buttons
      maxlength="150"
      :class="{'textfield-error': schoolPhoneError, 'login-textfield': true }"
      @keyup.enter="createRegister"
      ></v-text-field>

      <v-card flat class="card-planning flex-column">
        <v-sheet>Select your Membership</v-sheet>
        <div class="fullw jspace">
          <h5 class="mb-0">{{ membershipName }}</h5>
          <span class="mb-0" style="text-transform: capitalize;">{{ membershipTime }}</span>
        </div>

        <div class="fullw flex aleft">
          <span>{{ membershipPrice }} {{ membershipCurrency }}</span>
        </div>

        <v-btn class="btn" style="align-self: flex-end;" @click="dialogRegister = true">Choose your membership</v-btn>
      </v-card>

      <div class="fullw div-btn">
        <v-btn class="btn" @click="createRegister" :loading="loadingReset"
          :disabled="!isValidForm">
          Register
        </v-btn>
      </div>
    </section>

    <v-dialog v-model="dialogRegister" fullscreen content-class="dialog-home" max-width="900">
      <v-card class="card-dialog">
        <v-btn class="btn-close" @click="dialogRegister = false" flat>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="tcenter">App Strutis</h2>
        <p class="subtitle tcenter">Choose the plan that's right for you</p>

        <div class="div-cards">
          <v-card
            v-for="(item, index) in dataPlans"
            :key="index"
            flat
            :class="['plan-card', item.billingCycle]"
            @click="selectPlan(item)"
          >
            <div class="card-content">
              <h3 class="plan-name">{{ item.name }}</h3>
              <div class="plan-price">
                <span class="amount">{{ item.price }} {{ item.currency }}</span>
                <span class="cycle">/ {{ item.billingCycle }}</span>
              </div>

              <v-list density="compact" class="bg-transparent">
                <v-list-item v-for="feat in 4" :key="feat" prepend-icon="mdi-check-circle-outline">
                  <v-list-item-title class="feat-text">Feature detail</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>

            <v-btn
              block
              flat
              class="btn-plan"
              :color="getBtnColor(item.billingCycle)"
            >
              {{ item.billingCycle === 'trial' ? 'Try Free' : 'Choose Plan' }}
            </v-btn>
          </v-card>
        </div>
      </v-card>
    </v-dialog>

    <!-- <v-dialog v-model="dialogRegister" content-class="dialog-home">
      <v-card class="card-dialog">
        <h2 class="tcenter">App Strutis</h2>
        <span class="tcenter">Choose the plan that's right for you</span>

        <hr>

        <div class="jspace div-cards">
          <v-card
            v-for="(item, index) in dataPlans"
            :key="index"
            flat
            class="pointer"
            @click="selectPlan(item)"
          >
            <h3 class="mb-1 mt-4">{{ item.name }}</h3>
            <span class="f16 w400 tcenter" style="text-transform: capitalize;">
              {{ item.price }} {{ item.currency }} / {{ item.billingCycle }}
            </span>

            <ul>
              <li>
                New Students
              </li>
              <li>
                New Teachers
              </li>
              <li>
                New Admins
              </li>
              <li>
                Montly Support
              </li>
            </ul>
          </v-card>
        </div>
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import axiosInstance from '@/plugins/axios';
import { useRouter } from 'vue-router';

const getBtnColor = (cycle) => {
  switch (cycle) {
    case 'trial': return '#BDBDBD';
    case 'monthly': return '#6BBDAE';
    case 'yearly': return '#81C784';
    default: return 'primary';
  }
}

const plan_id = ref(null);
const dialogRegister = ref(false);
const dataPlans = ref([]);
const membershipName = ref('No Plan Selected');
const membershipTime = ref('None');
const membershipPrice = ref('0.00');
const membershipCurrency = ref('USD');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const first_name = ref('');
const last_name = ref('');
const phone = ref('');
const school_name = ref('');
const school_address = ref('');
const school_phone = ref('');
const loadingReset = ref(false);
const showAlert = inject('showAlert');
const showPassword = ref(false);
const router = useRouter();
const emailError = ref('');
const passwordError = ref('');
const passwordConfirmationError = ref('');
const firstNameError = ref('');
const lastNameError = ref('');
const phoneError = ref('');
const schoolNameError = ref('');
const schoolAddressError = ref('');
const schoolPhoneError = ref('');
const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 6) || 'Password must be at least 6 characters',
  (v) => /[A-Z]/.test(v) || 'Must contain at least 1 uppercase letter',
  (v) => /[a-z]/.test(v) || 'Must contain at least 1 lowercase letter',
];

const passwordMatchRule = computed(() => [
  (v) => v === password.value || 'Passwords must match',
]);

const isValidForm = computed(() => {
  return email.value &&
  password.value &&
  passwordConfirmation.value &&
  !passwordRules.some(rule => rule(password.value) !== true) &&
  !passwordMatchRule.value.some(rule => rule(passwordConfirmation.value) !== true) &&
  !emailError.value &&
  !passwordError.value &&
  !passwordConfirmationError.value &&
  !firstNameError.value &&
  !lastNameError.value &&
  !phoneError.value &&
  !schoolNameError.value &&
  !schoolAddressError.value &&
  !schoolPhoneError.value
});

const createRegister = async () => {
  emailError.value = '';
  passwordError.value = '';
  passwordConfirmationError.value = '';
  firstNameError.value = '';
  lastNameError.value = '';
  phoneError.value = '';
  schoolNameError.value = '';
  schoolAddressError.value = '';
  schoolPhoneError.value = '';

  let isValid = true;

  if (!email.value?.trim()) {
    emailError.value = 'Please enter your email address';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email format (e.g. user@example.com)';
    isValid = false;
  }

  if (!password.value?.trim()) {
    passwordError.value = 'Please enter a new password';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (!passwordConfirmation.value?.trim()) {
    passwordConfirmationError.value = 'Please confirm your password';
    isValid = false;
  } else if (passwordConfirmation.value !== password.value) {
    passwordConfirmationError.value = 'Passwords must match';
    isValid = false;
  }

  if (!isValid) {
    showAlert('Please fix the errors in the form', 'error');
    return;
  }

  loadingReset.value = true;
  try {
    const response = await axiosInstance.post('/auth/register-school', {
      email: email.value,
      password: passwordConfirmation.value,
      firstName: first_name.value,
      lastName: last_name.value,
      phone: phone.value,
      schoolName: school_name.value,
      schoolAddress: school_address.value,
      schoolPhone: school_phone.value,
      planId: plan_id.value,
    });
    
    loadingReset.value = false;
    showAlert('School registered successfully!', 'success');
    // setTimeout(() => {
    //   router.push('/');
    // }, 2000);
  } catch (error) {
    loadingReset.value = false;
    const errorMessage = error.response?.data?.message?.[0] || error.response?.data?.error || 'Failed to register school';    
    showAlert(errorMessage, 'error');
  }
};

const getPlans = async () =>{
  try{
    const response = await axiosInstance.get('/plans');
    
    dataPlans.value = response.data.result.map(plans => ({
      id: plans.id,
      name: plans.name,
      price: plans.price,
      currency: plans.currency,
      billingCycle: plans.billingCycle,
    }));

  }catch(error){
    showAlert('Error fetching plans', 'error');
  }
}

const selectPlan = (item) => {
  membershipName.value = item.name || '';
  membershipTime.value = item.billingCycle || '';
  membershipPrice.value = item.price || '';
  membershipCurrency.value = item.currency || '';
  plan_id.value = item.id || null;
  dialogRegister.value = false;
};

onMounted(() =>{
  getPlans();
});
</script>


<style lang="scss">
@import '@/assets/styles/pages/register.scss';
</style>

