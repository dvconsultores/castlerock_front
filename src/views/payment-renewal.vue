<template>
  <div id="new-center">
    <h3 class="font2 f32 tleft mt-6" style="color: #262B63;">Center Information</h3>
    <v-form class="form-div">
      <v-row>
        <v-col cols="12" sm="8" class="pb-0">
          <v-text-field
            v-model="center_name"
            class="textfield-registration"
            placeholder="Center Name"
            maxlength="150"
            autocomplete="off"
            readonly
            variant="solo" 
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
            readonly
            autocomplete="off" 
            maxlength="150"
            flat
            hide-details
            type="number"
            hide-spin-buttons
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="nickname_center"
            readonly
            class="textfield-registration"
            autocomplete="off"
            maxlength="150"
            placeholder="Nickname of the center"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field
            v-model="address"
            readonly
            class="textfield-registration"
            autocomplete="off"
            maxlength="150"
            placeholder="Location"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-6">
        <v-col cols="12" align="left" class="pb-0">
          <h3 class="font2 tleft" style="color: #262262;">Billing Date</h3>
        </v-col>
        <v-col cols="8" class="pb-0 pt-0 mb-4">
          <v-text-field
            v-model="next_billing_date"
            class="textfield-registration"
            autocomplete="off"
            maxlength="150"
            readonly
            placeholder="Next Billing Date"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>

        <v-col cols="4" class="pb-0 pt-0 mb-4">
          <v-text-field
            v-model="subscription_status"
            class="textfield-registration"
            autocomplete="off"
            maxlength="150"
            readonly
            placeholder="Subscription Status"
            variant="solo" 
            flat
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card flat class="card-plan flexcol center gap1">
            <h3 class="font2 tleft" style="color: #262262;">Membership Details</h3>

            <v-card flat class="card-planning flex-column mt-2">
              <v-sheet>Your Last Membership</v-sheet>
              <div class="fullw jspace">
                <h5 class="mb-0">{{ membershipName }}</h5>
                <span class="mb-0 span-style" style="text-transform: capitalize;">{{ membershipTime }}</span>
              </div>

              <div class="fullw flex aleft">
                <span>{{ membershipPrice }} {{ membershipCurrency }}</span>
              </div>
            </v-card>

            <!-- ESCENARIO 1: Usuario con plan trial y suscripción inactiva -->
            <template v-if="isTrialUser && !isSubscriptionActive">
              <!-- Stripe Payment Section - Solo cuando hay plan seleccionado -->
              <div v-if="showPaymentSection" class="fullw mt-4">
                <!-- Stripe Card Element -->
                <div class="card-payment fullw">
                  <span class="f14 w500 mb-4">Payment details for new subscription</span>
                  
                  <!-- Provider y Elements wrappers -->
                  <VueStripeProvider :publishable-key="stripePublishableKey">
                    <VueStripeElements>
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
                  
                  <!-- Mensaje de carga -->
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

                <!-- Botón de activar suscripción con pago -->
                <v-btn 
                  class="mt-4 btn-renewal" 
                  flat 
                  block
                  color="#6BBDAE"
                  @click="activateSubscription"
                  :loading="loadingReactivation"
                  :disabled="!canActivate"
                >
                  Activate Subscription
                </v-btn>
              </div>

              <!-- Botón para seleccionar plan (cuando no hay plan seleccionado) -->
              <v-btn 
                v-if="!selectedPlanId"
                class="mt-4 btn-renewal" 
                flat 
                @click="dialogSelectPlan = true"
                color="#6BBDAE"
              >
                Select Plan to Activate
              </v-btn>
            </template>

            <!-- ESCENARIO 2: Usuario con plan de pago y suscripción inactiva -->
            <template v-else-if="!isTrialUser && !isSubscriptionActive">
              <!-- Stripe Payment Section -->
              <div class="fullw mt-4">
                <!-- Stripe Card Element -->
                <div class="card-payment fullw">
                  <span class="f14 w500 mb-4">Payment details for renewal</span>
                  
                  <!-- Provider y Elements wrappers -->
                  <VueStripeProvider :publishable-key="stripePublishableKey">
                    <VueStripeElements>
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
                  
                  <!-- Mensaje de carga -->
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

                <!-- Botón de renovar suscripción -->
                <v-btn 
                  class="mt-4" 
                  flat 
                  block
                  color="#6BBDAE"
                  @click="renewSubscription"
                  :loading="loadingReactivation"
                  :disabled="!canRenew"
                >
                  Renew Subscription
                </v-btn>
              </div>
            </template>

            <!-- Botón de actualizar membresía (solo para trial activo) -->
            <v-btn 
              class="mt-4 btn-renewal" 
              flat 
              v-if="isTrialUser && !isSubscriptionActive" 
              @click="dialogSelectPlan = true"
            >
              Update Membership
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

    <!-- Dialog de selección de planes (solo para usuarios trial) -->
    <v-dialog v-model="dialogSelectPlan" fullscreen content-class="dialog-home" max-width="900">
      <v-card class="card-dialog">
        <v-btn class="btn-close" @click="dialogSelectPlan = false" flat>
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

    <!-- Dialog de confirmación de activación/renovación -->
    <v-dialog v-model="dialogReactivationSuccess" content-class="dialogConfirmationCenter" persistent max-width="500">
      <v-card class="card-confirmation-program">
        <img src="@/assets/sources/icons/celebration.svg" alt="Celebration">
        <span class="font2 f22 tcenter mt-2" style="line-height: 28px; color: #474649;">{{ successMessage }}</span>
        <hr class="mt-2 mb-5">
        <span class="f16 w400 tcenter">Your subscription has been successfully {{ successAction }}.</span>
        <div class="btn-divs mt-8">
          <v-btn flat class="btn1" @click="goToHome">Go to Home</v-btn>
          <v-btn flat class="btn2" @click="dialogReactivationSuccess = false">Close</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Pay alert dialog -->
    <Pay
      v-model="showPayDialog"
      :expired="!isSubscriptionActive"
      @renew="onPayRenew"
      @close="onPayClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/plugins/axios';
import { VueStripeProvider, VueStripeElements } from '@vue-stripe/vue-stripe';
import StripePaymentForm from '@/components/StripePaymentForm.vue';
import Pay from '@/components/pay.vue';
import type { StripeCardChangeEvent, StripeCardOptions } from '@/plugins/stripe';

// Interfaces
interface Plan {
  id: number;
  name: string;
  price: string;
  currency: string;
  billingCycle: string;
  status: string;
  externalPriceId: string | null;
}

interface CenterSubscription {
  nextBillingDate?: string;
  status?: string;
}

interface CenterData {
  name: string;
  phone: string;
  nickname: string;
  address: string;
  image?: string;
  subscriptions?: CenterSubscription[];
}

interface StripeReadyPayload {
  stripe: any;
  elements: any;
  card: any;
}

const route = useRoute();
const router = useRouter();
const centerId = ref<string | null>(localStorage.getItem('campusId'));
const showAlert = inject('showAlert') as (message: string, type: string) => void;

// Datos del centro
const center_name = ref<string>('');
const phone_center = ref<string>(''); 
const nickname_center = ref<string>('');
const address = ref<string>('');
const next_billing_date = ref<string | null>('');
const subscription_status = ref<string | null>('');

// Datos de planes desde localStorage
const planBillingCycle = ref<string | null>(localStorage.getItem('billingCycle'));
const planId = ref<string | null>(localStorage.getItem('planId'));
const statusSubscription = ref<string | null>(localStorage.getItem('statusSuscription'));

// Datos de planes desde API
const dataPlans = ref<Plan[]>([]);
const allPlans = ref<Plan[]>([]);
const dialogSelectPlan = ref<boolean>(false);
const showPayDialog = ref<boolean>(false);
const membershipName = ref<string>('No Plan Selected');
const membershipPrice = ref<string>('0.00');
const membershipCurrency = ref<string>('USD');
const membershipTime = ref<string>('None');

// Plan seleccionado para activar (solo para escenario 1)
const selectedPlanId = ref<number | null>(null);

// Estados de reactivación
const loadingReactivation = ref<boolean>(false);
const dialogReactivationSuccess = ref<boolean>(false);
const successMessage = ref<string>('Subscription Activated!');
const successAction = ref<string>('activated');

// Stripe refs
const stripeInstance = ref<any>(null);
const elementsInstance = ref<any>(null);
const cardElement = ref<any>(null);
const elementsReady = ref<boolean>(false);
const cardReady = ref<boolean>(false);
const cardError = ref<string>('');
const cardComplete = ref<boolean>(false);
const stripePublishableKey: string = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string;

// Opciones para el Card Element
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

// Computed properties para determinar escenarios
const isTrialUser = computed<boolean>(() => {
  return planBillingCycle.value?.toLowerCase() === 'trial';
});

const isSubscriptionActive = computed<boolean>(() => {
  return statusSubscription.value?.toLowerCase() === 'active';
});

const showPaymentSection = computed<boolean>(() => {
  // Mostrar sección de pago cuando hay un plan seleccionado
  return !!selectedPlanId.value;
});

const canActivate = computed<boolean>(() => {
  // Para escenario 1: requiere plan seleccionado, tarjeta completa y Stripe listo
  if (!selectedPlanId.value) return false;
  return cardComplete.value && stripeFullyReady.value && !cardError.value;
});

const canRenew = computed<boolean>(() => {
  // Para escenario 2: solo requiere tarjeta completa y Stripe listo
  // El planId ya viene del localStorage
  return cardComplete.value && stripeFullyReady.value && !cardError.value;
});

const stripeFullyReady = computed<boolean>(() => elementsReady.value && cardReady.value);

// Handlers para Stripe
const onStripeReady = (payload: StripeReadyPayload): void => {
  console.log('Stripe ready in payment-renewal:', payload);
  stripeInstance.value = payload.stripe;
  elementsInstance.value = payload.elements;
  cardElement.value = payload.card;
  elementsReady.value = true;
  cardReady.value = true;
};

const onCardChange = (event: StripeCardChangeEvent): void => {
  cardComplete.value = event.complete;
  cardError.value = event.error?.message || '';
};

const onCardError = (error: string): void => {
  console.error('Card error:', error);
  cardError.value = error;
};

// Función para crear PaymentMethod
const createPaymentMethod = async (): Promise<string> => {
  try {
    if (!stripeInstance.value || !cardElement.value) {
      throw new Error('Stripe or Card element not initialized');
    }

    const { error, paymentMethod } = await stripeInstance.value.createPaymentMethod({
      type: 'card',
      card: cardElement.value,
      billing_details: {
        name: center_name.value,
      }
    });

    if (error) {
      throw error;
    }

    return paymentMethod.id;
  } catch (error: any) {
    console.error('Error creating payment method:', error);
    cardError.value = error.message || 'Error creating payment method';
    throw error;
  }
};

// ESCENARIO 1: Activar suscripción (usuario trial selecciona un plan)
const activateSubscription = async (): Promise<void> => {
  if (!selectedPlanId.value) {
    showAlert('Please select a plan first', 'warning');
    return;
  }

  loadingReactivation.value = true;

  try {
    if (!cardComplete.value) {
      showAlert('Please complete the card details', 'error');
      loadingReactivation.value = false;
      return;
    }

    if (!stripeFullyReady.value) {
      showAlert('Payment system is still initializing. Please wait a moment.', 'warning');
      loadingReactivation.value = false;
      return;
    }

    const paymentMethodId = await createPaymentMethod();

    // Llamar al endpoint de reactivación/activación
    const response = await axiosInstance.post('/subscription/reactivate', {
      paymentMethodId: paymentMethodId,
      planId: selectedPlanId.value
    });

    // Configurar mensajes de éxito
    successMessage.value = 'Subscription Activated!';
    successAction.value = 'activated';
    dialogReactivationSuccess.value = true;
    
    // Actualizar localStorage
    const selectedPlan = allPlans.value.find(p => p.id === selectedPlanId.value);
    if (selectedPlan) {
      localStorage.setItem('billingCycle', selectedPlan.billingCycle);
      localStorage.setItem('planId', selectedPlan.id.toString());
      localStorage.setItem('statusSuscription', 'active');
      
      // Actualizar refs
      planBillingCycle.value = selectedPlan.billingCycle;
      planId.value = selectedPlan.id.toString();
      statusSubscription.value = 'active';
      subscription_status.value = 'Active';
    }

    showAlert('Subscription activated successfully!', 'success');

  } catch (error: any) {
    console.error('Error activating subscription:', error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Failed to activate subscription';
    showAlert(errorMessage, 'error');
  } finally {
    loadingReactivation.value = false;
  }
};

// ESCENARIO 2: Renovar suscripción (usuario con plan de pago)
const renewSubscription = async (): Promise<void> => {
  if (!planId.value) {
    showAlert('No previous plan found', 'error');
    return;
  }

  loadingReactivation.value = true;

  try {
    if (!cardComplete.value) {
      showAlert('Please complete the card details', 'error');
      loadingReactivation.value = false;
      return;
    }

    if (!stripeFullyReady.value) {
      showAlert('Payment system is still initializing. Please wait a moment.', 'warning');
      loadingReactivation.value = false;
      return;
    }

    const paymentMethodId = await createPaymentMethod();

    // Llamar al endpoint de reactivación con el planId del localStorage
    const response = await axiosInstance.post('/subscription/reactivate', {
      paymentMethodId: paymentMethodId,
      planId: parseInt(planId.value)
    });

    // Configurar mensajes de éxito
    successMessage.value = 'Subscription Renewed!';
    successAction.value = 'renewed';
    dialogReactivationSuccess.value = true;
    
    // Actualizar status en localStorage
    localStorage.setItem('statusSuscription', 'active');
    statusSubscription.value = 'active';
    subscription_status.value = 'Active';

    showAlert('Subscription renewed successfully!', 'success');

  } catch (error: any) {
    console.error('Error renewing subscription:', error);
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Failed to renew subscription';
    showAlert(errorMessage, 'error');
  } finally {
    loadingReactivation.value = false;
  }
};

// Funciones existentes
const getPlans = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get('/plans');
    const plans = response?.data?.result || [];

    allPlans.value = plans;

    // Para el diálogo de selección, excluimos trial si el usuario ya no es trial?
    // Por ahora mostramos todos los planes de pago
    const visiblePlans = plans.filter((plan: Plan) => {
      const cycle = plan.billingCycle.toLowerCase();
      return cycle !== 'trial'; // No mostrar trial en selección
    });

    dataPlans.value = visiblePlans;

    // Establecer valores de membresía basados en el plan actual
    setMembershipFromCurrentPlan();

  } catch (error) {
    console.error('Failed to fetch plans', error);
  }
};

const setMembershipFromCurrentPlan = (): void => {
  // Intentar encontrar el plan actual basado en el planId del localStorage
  if (planId.value) {
    const currentPlan = allPlans.value.find(p => p.id === parseInt(planId.value as string));
    if (currentPlan) {
      membershipName.value = currentPlan.name;
      membershipTime.value = currentPlan.billingCycle;
      membershipPrice.value = currentPlan.price;
      membershipCurrency.value = currentPlan.currency;
      return;
    }
  }
  
  // Si no hay planId, intentar por billingCycle
  if (planBillingCycle.value) {
    const planByCycle = allPlans.value.find(p => p.billingCycle.toLowerCase() === planBillingCycle.value?.toLowerCase());
    if (planByCycle) {
      membershipName.value = planByCycle.name;
      membershipTime.value = planByCycle.billingCycle;
      membershipPrice.value = planByCycle.price;
      membershipCurrency.value = planByCycle.currency;
      return;
    }
  }
  
  // Valores por defecto
  membershipName.value = 'No Plan Selected';
  membershipTime.value = 'None';
  membershipPrice.value = '0.00';
  membershipCurrency.value = 'USD';
};

const getBtnColor = (cycle: string): string => {
  const c = cycle.toLowerCase();
  if (c === 'trial') return '#BDBDBD';
  if (c === 'monthly') return '#6BBDAE';
  if (c === 'yearly') return '#81C784';
  return 'primary';
};

const selectPlan = (item: Plan): void => {
  membershipName.value = item.name;
  membershipTime.value = item.billingCycle;
  membershipPrice.value = item.price;
  membershipCurrency.value = item.currency;
  selectedPlanId.value = item.id;
  dialogSelectPlan.value = false;
  
  // Resetear estados de Stripe
  elementsReady.value = false;
  cardReady.value = false;
  cardError.value = '';
  cardComplete.value = false;
  stripeInstance.value = null;
  elementsInstance.value = null;
  cardElement.value = null;
};

const formatDate = (iso?: string): string | null => {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
};

const capitalizeFirst = (value?: string): string | null => {
  if (!value) return null;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const loadCenterData = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/campus/${centerId.value}`);
    const center = response.data.result as CenterData;
    
    center_name.value = center.name || '';
    phone_center.value = center.phone || '';
    nickname_center.value = center.nickname || '';
    address.value = center.address || '';

    const sub = Array.isArray(center.subscriptions) && center.subscriptions.length > 0 ? center.subscriptions[0] : null;
    next_billing_date.value = sub ? formatDate(sub.nextBillingDate) : null;
    subscription_status.value = sub ? capitalizeFirst(sub.status) : null;
    
    // Actualizar statusSubscription ref si viene de la API
    if (sub?.status) {
      statusSubscription.value = sub.status;
    }
  } catch (error) {
    console.error('Failed to load center data', error);
  }
};

const goToHome = (): void => {
  dialogReactivationSuccess.value = false;
  router.push('/home');
};

// pay.vue handlers
const onPayRenew = (): void => {
  showPayDialog.value = false;
  // open plan selection or payment section depending on user type
  if (isTrialUser.value) {
    dialogSelectPlan.value = true;
  } else {
    // maybe show payment section immediately
    // for non-trial just keep form visible
  }
};

const onPayClose = (): void => {
  showPayDialog.value = false;
};

// Watchers
watch(selectedPlanId, (newVal: number | null) => {
  if (!newVal) {
    cardError.value = '';
    cardComplete.value = false;
  }
});

// watch subscription status to reopen pay dialog if becomes invalid
watch(statusSubscription, (val) => {
  if (val?.toLowerCase() !== 'active') {
    showPayDialog.value = true;
  }
});

onMounted((): void => {
  loadCenterData();
  getPlans();
  
  // si abrimos la ruta y el estatus local no es active, mostrar el diálogo de pago
  if (statusSubscription.value?.toLowerCase() !== 'active') {
    showPayDialog.value = true;
  }

  // Si venimos con query desde el guard y necesitamos seleccionar plan
  if (route.query.openDialog === '1') {
    dialogSelectPlan.value = true;
  }

  // Log para debug
  console.log('User context:', {
    billingCycle: planBillingCycle.value,
    planId: planId.value,
    status: statusSubscription.value,
    isTrial: isTrialUser.value,
    isActive: isSubscriptionActive.value
  });
});
</script>

<style lang="scss">
@import '@/assets/styles/pages/new-center.scss';

/* Estilos para la sección de pago */
.card-payment {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #7583D9;
  margin-bottom: 16px;

  span {
    margin-bottom: 16px!important;
    font-size: 16px;
    text-align: left;
    display: block;
  }

  .stripe-loading {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 8px;
    color: #666;
    margin-top: 8px;
  }
  
  :deep(.VueStripeCardElement) {
    .card-container {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      transition: border-color 0.2s ease;
      padding: 2px;
      
      &:focus-within {
        border-color: #635bff;
        box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
      }
    }
  }
}

.btn-renewal{
  width: 200px;
  min-width: 200px;
}
</style>