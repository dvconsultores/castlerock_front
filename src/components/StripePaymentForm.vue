<template>
  <div class="stripe-payment-form">
    <VueStripeCardElement 
      :options="cardOptions"
      @ready="onCardReady"
      @change="onCardChange"
    >
      <template #loading>
        <div class="skeleton-loader">Loading payment form...</div>
      </template>
    </VueStripeCardElement>
  </div>
</template>

<script setup lang="ts">
import { VueStripeCardElement } from '@vue-stripe/vue-stripe';
import { useStripe, useStripeElements } from '@vue-stripe/vue-stripe';
import { onMounted, watch, ref } from 'vue';

const props = defineProps<{
  cardOptions: any
  hidePostalCode: true
}>();

const emit = defineEmits(['ready', 'change', 'error']);

const { stripe } = useStripe();
const { elements } = useStripeElements();
const hasEmittedReady = ref(false);

// Cuando stripe y elements estén disponibles, emitimos ready con las instancias
watch([stripe, elements], ([newStripe, newElements]) => {
  console.log('Stripe/Elements watch triggered:', { 
    stripe: !!newStripe, 
    elements: !!newElements,
    hasEmitted: hasEmittedReady.value 
  });
  
  if (newStripe && newElements && !hasEmittedReady.value) {
    console.log('Stripe and Elements available in child');
    
    // Intentar obtener el card element inmediatamente
    const cardElement = newElements.getElement('card');
    
    if (cardElement) {
      console.log('Card element found immediately');
      hasEmittedReady.value = true;
      emit('ready', {
        stripe: newStripe,
        elements: newElements,
        card: cardElement
      });
    } else {
      console.warn('Card element not found immediately, will retry...');
      // Intentar obtener el card element después de un breve delay
      const retryInterval = setInterval(() => {
        const retryCardElement = newElements.getElement('card');
        if (retryCardElement && !hasEmittedReady.value) {
          console.log('Card element found after retry');
          clearInterval(retryInterval);
          hasEmittedReady.value = true;
          emit('ready', {
            stripe: newStripe,
            elements: newElements,
            card: retryCardElement
          });
        }
      }, 200);
      
      // Timeout después de 5 segundos
      setTimeout(() => {
        clearInterval(retryInterval);
        if (!hasEmittedReady.value) {
          console.error('Failed to find card element after retries');
          emit('error', 'Failed to initialize card element');
        }
      }, 5000);
    }
  }
}, { immediate: true });

const onCardReady = (element: any) => {
  console.log('Card element mounted in child');
  // No emitimos ready aquí porque esperamos a que stripe y elements estén listos
  // pero guardamos la referencia por si acaso
};

const onCardChange = (event: any) => {
  console.log('Card change event in child:', event);
  emit('change', event);
};

// Verificar que todo esté bien al montar
onMounted(() => {
  console.log('StripePaymentForm mounted');
  console.log('stripe from useStripe:', stripe.value);
  console.log('elements from useStripeElements:', elements.value);
});
</script>

<style scoped>
.stripe-payment-form {
  width: 100%;
}

.skeleton-loader {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f5f5f5;
  color: #999;
  text-align: center;
  font-size: 14px;
}
</style>