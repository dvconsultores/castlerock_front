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
import { logger } from '@/utils/logger';

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
  if (newStripe && newElements && !hasEmittedReady.value) {
    // Intentar obtener el card element inmediatamente
    const cardElement = newElements.getElement('card');
    
    if (cardElement) {
      hasEmittedReady.value = true;
      emit('ready', {
        stripe: newStripe,
        elements: newElements,
        card: cardElement
      });
    } else {
      // Intentar obtener el card element después de un breve delay
      const retryInterval = setInterval(() => {
        const retryCardElement = newElements.getElement('card');
        if (retryCardElement && !hasEmittedReady.value) {
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
          logger.error('Stripe card element initialization failed');
          emit('error', 'Failed to initialize card element');
        }
      }, 5000);
    }
  }
}, { immediate: true });

const onCardReady = (_element: any) => {
  // Card element is mounted — ready event handled by the watch above
};

const onCardChange = (event: any) => {
  emit('change', event);
};

// Verificar que todo esté bien al montar
onMounted(() => {
  // Stripe payment form mounted
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