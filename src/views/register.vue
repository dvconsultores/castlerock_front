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

      <!-- Stripe Card Element -->
      <!-- <div v-if="plan_id" class="card-payment fullw mb-4"> -->
      <div v-if="plan_id && !isSelectedPlanTrial" class="card-payment fullw">
        <span class="f14 w500 mb-4">Payment details</span>
        
        <!-- Provider y Elements wrappers -->
        <VueStripeProvider :publishable-key="stripePublishableKey">
          <VueStripeElements>
            <!-- Usamos el componente hijo StripePaymentForm -->
            <StripePaymentForm 
              :card-options="cardOptions"
              @ready="onStripeReady"
              @change="onCardChange"
              @error="onCardError"
            />
          </VueStripeElements>
        </VueStripeProvider>
        
        <!-- Mensaje de error -->
        <div v-if="cardError" class="f13" style="color:#e53935; margin-top:8px">{{ cardError }}</div>
        
        <!-- Mensaje de carga mejorado -->
        <div v-if="!stripeFullyReady && !cardError" class="stripe-loading">
          <v-progress-circular
            indeterminate
            color="primary"
            size="24"
            class="mr-2"
          ></v-progress-circular>
          <span>Initializing payment system...</span>
        </div>
      </div>

      <div class="fullw div-btn">
        <v-btn class="btn" @click="createRegister" :loading="loadingReset" :disabled="!canSubmit">
          {{ registerButtonText }}
        </v-btn>
      </div>
    </section>

    <!-- Dialog de planes -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed, onMounted, watch } from 'vue';
import { VueStripeProvider, VueStripeElements } from '@vue-stripe/vue-stripe';
import StripePaymentForm from '@/components/StripePaymentForm.vue';
import type { StripeCardChangeEvent, StripeCardOptions } from '@/plugins/stripe';
import axiosInstance from '@/plugins/axios';
import { useRouter } from 'vue-router';

// Tipos para los datos
interface Plan {
  id: string;
  name: string;
  price: string;
  currency: string;
  billingCycle: string;
}

// Función para colores de botones
const getBtnColor = (cycle: string): string => {
  switch (cycle) {
    case 'trial': return '#BDBDBD';
    case 'monthly': return '#6BBDAE';
    case 'yearly': return '#81C784';
    default: return 'primary';
  }
}

// Estados reactivos
const plan_id = ref<string | null>(null);
const dialogRegister = ref<boolean>(false);
const dataPlans = ref<Plan[]>([]);
const membershipName = ref<string>('No Plan Selected');
const membershipTime = ref<string>('None');
const membershipPrice = ref<string>('0.00');
const membershipCurrency = ref<string>('USD');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirmation = ref<string>('');
const first_name = ref<string>('');
const last_name = ref<string>('');
const phone = ref<string>('');
const school_name = ref<string>('');
const school_address = ref<string>('');
const school_phone = ref<string>('');
const loadingReset = ref<boolean>(false);
const showAlert = inject('showAlert') as (message: string, type: string) => void;
const showPassword = ref<boolean>(false);
const router = useRouter();

// Stripe refs - modificados para la opción 1
const stripeInstance = ref<any>(null);
const elementsInstance = ref<any>(null);
const cardElement = ref<any>(null);
const elementsReady = ref<boolean>(false);
const cardReady = ref<boolean>(false);
const stripeFullyReady = computed(() => elementsReady.value && cardReady.value);
const cardError = ref<string>('');
const cardComplete = ref<boolean>(false);
const stripePublishableKey: string = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;

// Error refs
const emailError = ref<string>('');
const passwordError = ref<string>('');
const passwordConfirmationError = ref<string>('');
const firstNameError = ref<string>('');
const lastNameError = ref<string>('');
const phoneError = ref<string>('');
const schoolNameError = ref<string>('');
const schoolAddressError = ref<string>('');
const schoolPhoneError = ref<string>('');

// Opciones para el Card Element (con tipo)
const cardOptions: StripeCardOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  },
  hidePostalCode: false
};

// Reglas de validación con tipos
const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters',
  (v: string) => /[A-Z]/.test(v) || 'Must contain at least 1 uppercase letter',
  (v: string) => /[a-z]/.test(v) || 'Must contain at least 1 lowercase letter',
];

const passwordMatchRule = computed(() => [
  (v: string) => v === password.value || 'Passwords must match',
]);

const isValidForm = computed<boolean>(() => {
  return !!email.value &&
    !!password.value &&
    !!passwordConfirmation.value &&
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

// Modificado para requerir stripeFullyReady cuando hay un plan seleccionado
const canSubmit = computed<boolean>(() => {
  // Si no hay plan seleccionado, solo validar el formulario
  if (!plan_id.value) {
    return isValidForm.value;
  }
  
  // Verificar el tipo de plan seleccionado
  const selectedPlan = dataPlans.value.find(p => p.id === plan_id.value);
  const isTrial = selectedPlan?.billingCycle === 'trial';
  const isPaidPlan = selectedPlan?.billingCycle === 'monthly' || selectedPlan?.billingCycle === 'yearly';
  
  // Si es trial, solo requiere formulario válido
  if (isTrial) {
    return isValidForm.value;
  }
  
  // Si es plan de pago, requiere tarjeta completa y Stripe listo
  if (isPaidPlan) {
    return isValidForm.value && cardComplete.value && stripeFullyReady.value && !cardError.value;
  }
  
  // Por defecto (por si acaso)
  return isValidForm.value;
});

const registerButtonText = computed<string>(() => {
  if (!plan_id.value) return 'Register';
  
  const selectedPlan = dataPlans.value.find(p => p.id === plan_id.value);
  if (selectedPlan?.billingCycle === 'trial') {
    return 'Start Free Trial';
  }
  return 'Register & Pay';
});

// Handlers para el componente hijo
const onStripeReady = (payload: { stripe: any; elements: any; card: any }) => {
  console.log('🔥 onStripeReady RECEIVED in parent:', { 
    hasStripe: !!payload.stripe, 
    hasElements: !!payload.elements, 
    hasCard: !!payload.card 
  });
  
  stripeInstance.value = payload.stripe;
  elementsInstance.value = payload.elements;
  cardElement.value = payload.card;
  elementsReady.value = true;
  cardReady.value = true;
  
  console.log('✅ stripeFullyReady should now be true');
};

const onCardChange = (event: StripeCardChangeEvent) => {
  console.log('💳 Card change event in parent:', { 
    complete: event.complete, 
    hasError: !!event.error 
  });
  cardComplete.value = event.complete;
  cardError.value = event.error?.message || '';
};

const onCardError = (error: string) => {
  console.error('❌ Card error in parent:', error);
  cardError.value = error;
};

// Debug watches mejorados
watch(elementsReady, (ready) => {
  console.log('📊 elementsReady changed:', ready);
});

watch(cardReady, (ready) => {
  console.log('📊 cardReady changed:', ready);
});

watch(stripeFullyReady, (ready) => {
  console.log('🎯 stripeFullyReady:', ready);
});

watch(cardComplete, (complete) => {
  console.log('💳 cardComplete changed:', complete);
});

// Función para crear PaymentMethod (simplificada)
const createPaymentMethod = async (): Promise<string> => {
  try {
    console.log('Creating payment method...');
    console.log('Stripe instance:', stripeInstance.value);
    console.log('Card element:', cardElement.value);
    
    if (!stripeInstance.value || !cardElement.value) {
      throw new Error('Stripe or Card element not initialized');
    }

    const { error, paymentMethod } = await stripeInstance.value.createPaymentMethod({
      type: 'card',
      card: cardElement.value,
      billing_details: {
        name: `${first_name.value} ${last_name.value}`,
        email: email.value,
        phone: phone.value
      }
    });

    if (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }

    console.log('Payment method created:', paymentMethod.id);
    return paymentMethod.id;
  } catch (error: any) {
    console.error('Error in createPaymentMethod:', error);
    cardError.value = error.message || 'Error creating payment method';
    throw error;
  }
};

const createRegister = async (): Promise<void> => {
  // Validaciones
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
    let paymentMethodId: string | null = null;
    
    // Verificar el tipo de plan seleccionado
    const selectedPlan = dataPlans.value.find(p => p.id === plan_id.value);
    const isTrial = selectedPlan?.billingCycle === 'trial';
    const isPaidPlan = selectedPlan?.billingCycle === 'monthly' || selectedPlan?.billingCycle === 'yearly';
    
    console.log('Plan seleccionado:', selectedPlan);
    console.log('Es trial:', isTrial);
    console.log('Es plan de pago:', isPaidPlan);
    
    // Procesar Stripe solo si es un plan de pago
    if (plan_id.value && isPaidPlan) {
      if (!cardComplete.value) {
        loadingReset.value = false;
        showAlert('Please complete the card details', 'error');
        return;
      }
      
      // Verificar que Stripe esté completamente listo
      if (!stripeFullyReady.value) {
        console.log('Stripe not fully ready:', {
          elementsReady: elementsReady.value,
          cardReady: cardReady.value
        });
        showAlert('Payment system is still initializing. Please wait a moment.', 'warning');
        loadingReset.value = false;
        return;
      }
      
      paymentMethodId = await createPaymentMethod();
    }

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
      paymentMethodId, // Será null para planes trial
    });

    // localStorage.setItem('idUser', response.data.result.id);
    // localStorage.setItem('accessToken', response.data.result.accessToken);
    // localStorage.setItem('userRole', response.data.result.role);
    // localStorage.setItem('userImage', response.data.result.image)
    // localStorage.setItem('statusSuscription', response.data.result.subscription.status)
    // localStorage.setItem('campusId', response.data.result.campus.id)
    // localStorage.setItem('billingCycle', response.data.result.subscription.plan.billingCycle)
    // localStorage.setItem('planId', response.data.result.subscription.plan.id)
    
    loadingReset.value = false;
    
    // Mensaje personalizado según el tipo de plan
    if (isTrial) {
      showAlert('🎉 Welcome to Strutis! Your free trial has started.', 'success');
    } else if (isPaidPlan) {
      showAlert('🎉 Welcome to Strutis! Your subscription has been activated successfully.', 'success');
    } else {
      showAlert('🎉 Welcome to Strutis!', 'success');
    }
    
    // Redirigir al home después de 2 segundos
    setTimeout(() => {
      router.push('/');
    }, 2000);
    
  } catch (error: any) {
    loadingReset.value = false;
    const errorMessage = error.response?.data?.message?.[0] || 
                        error.response?.data?.error || 
                        error.message || 
                        'Failed to register school';
    showAlert(errorMessage, 'error');
  }
};

const isSelectedPlanTrial = computed<boolean>(() => {
  if (!plan_id.value) return false;
  const selectedPlan = dataPlans.value.find(p => p.id === plan_id.value);
  return selectedPlan?.billingCycle === 'trial';
});

const getPlans = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/plans');
    
    dataPlans.value = response.data.result.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      billingCycle: plan.billingCycle,
    }));

  } catch (error) {
    showAlert('Error fetching plans', 'error');
  }
}

const selectPlan = (item: Plan): void => {
  membershipName.value = item.name || '';
  membershipTime.value = item.billingCycle || '';
  membershipPrice.value = item.price || '';
  membershipCurrency.value = item.currency || '';
  plan_id.value = item.id || null;
  dialogRegister.value = false;
  
  // Resetear estados de Stripe cuando se selecciona un nuevo plan
  elementsReady.value = false;
  cardReady.value = false;
  cardError.value = '';
  cardComplete.value = false;
  stripeInstance.value = null;
  elementsInstance.value = null;
  cardElement.value = null;
};

// Limpiar error de tarjeta cuando se deselecciona el plan
watch(plan_id, (newVal: string | null) => {
  if (!newVal) {
    cardError.value = '';
    cardComplete.value = false;
    elementsReady.value = false;
    cardReady.value = false;
    stripeInstance.value = null;
    elementsInstance.value = null;
    cardElement.value = null;
  }
});

// Debug watches
watch(elementsReady, (ready) => {
  console.log('elementsReady changed:', ready);
});

watch(cardReady, (ready) => {
  console.log('cardReady changed:', ready);
});

watch(stripeFullyReady, (ready) => {
  console.log('stripeFullyReady:', ready);
});

onMounted((): void => {
  getPlans();
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/register.scss';

/* Estilos adicionales para el card element */
.card-payment {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 8px 16px 24px 16px;
  border: 1px solid #7583D9;
  display: flex;
  flex-direction: column;

  span{
    margin-bottom: 20px!important;
    font-size: 20px;
    text-align: left;
  }

  .stripe-loading {
    display: flex;
    align-items: center;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 8px;
    color: #666;
    margin-bottom: 12px;
  }
  
  /* Estilo para el contenedor del card element */
  :deep(.VueStripeCardElement) {
    .card-container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      transition: border-color 0.2s ease;
      padding: 2px;
      margin-bottom: 12px;
      
      &:focus-within {
        border-color: #635bff;
        box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
      }
    }
  }
  
}
</style>