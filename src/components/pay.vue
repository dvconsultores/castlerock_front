<template>
  <v-dialog v-model="isVisible" max-width="420" persistent>
    <v-card class="pa-6" elevation="10" style="border-radius:18px;">
      <v-card-title class="justify-center flex-column flex" style="align-items: center;">
        <v-icon size="40" color="amber darken-2">mdi-alert-circle-outline</v-icon>
        <div class="title mt-2">Attention</div>
      </v-card-title>

      <v-divider class="my-4" />

      <v-card-text class="text-center">
        You must renew your subscription to continue enjoying the benefits of App Strutis.
      </v-card-text>

      <v-card-actions class="justify-center mt-4">
        <v-btn rounded class="mx-2 btn btn-primary" @click="onRenew">Renew</v-btn>
        <v-btn rounded class="mx-2 btn btn-secondary" @click="onClose">No, cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import router from '@/router/router'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  expired: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'renew', 'close'])

const isVisible = ref(props.modelValue || props.expired)

watch(() => props.modelValue, (v) => {
  isVisible.value = v
})

watch(() => props.expired, (v) => {
  if (v) isVisible.value = true
})

watch(isVisible, (v) => {
  emit('update:modelValue', v)
  if (!v) emit('close')
})

function onClose() {
  isVisible.value = false
  router.push('/')
  localStorage.removeItem('showPay')
  localStorage.removeItem('statusSuscription')
}

function onRenew() {
  isVisible.value = false
}
</script>

<style scoped>
.pay-modal, .v-card-title, .v-card-text, .v-btn {
  font-family: 'Inter', Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.pay-modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.35);
  z-index: 2000;
}
.pay-modal {
  width: 420px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  padding: 22px 26px 20px;
  text-align: center;
}
.pay-header { display:flex; flex-direction:column; align-items:center; }
.pay-icon { margin-bottom: 8px; }
.pay-title { font-size: 20px; margin: 0 0 6px; color: #333; }
.pay-divider { height:1px; background:#e6e6e6; margin: 6px 0 14px; }
.pay-body { padding: 0 8px 10px; }
.pay-message { color:#555; margin:0; font-size:15px; line-height:1.4 }
.pay-actions { display:flex; gap:14px; justify-content:center; margin-top:16px }
.btn { padding:10px 26px; border-radius:28px; border:none; font-size:15px; cursor:pointer }
.btn-primary { background:#6fbf9b; color:#fff }
.btn-primary:hover { filter:brightness(0.95) }
.btn-secondary { background:#f36b2f; color:#fff }
.btn-secondary:hover { filter:brightness(0.95) }
button.btn, .v-btn.btn, .btn {
  height: 44px;
  min-width: 140px;
  max-width: 46%;
  border-radius: 32px !important;
  box-shadow: none;
  padding: 0 18px;

  &, > .v-btn__content {
    display: flex;
    gap: 8px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    text-transform: none;
  }
}

.btn-primary { background-color: #6fbf9b !important; }
.btn-primary:hover { filter: brightness(0.95); }
.btn-secondary { background-color: #f36b2f !important; }
.btn-secondary:hover { filter: brightness(0.95); }

@media (max-width:480px){ .pay-modal { width:92%; padding:18px } }
</style>