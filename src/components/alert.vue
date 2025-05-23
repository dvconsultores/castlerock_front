<template>
  <v-snackbar
    v-model="isVisible"
    :timeout="timeout"
    :color="color"
    location="top right"
    multi-line
  >
    {{ message }}

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="isVisible = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'info', // Puede ser 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  timeout: {
    type: Number,
    default: 10000
  }
})

const emit = defineEmits(['update:show'])

const isVisible = ref(props.show)
const color = ref('')

// Mapear tipos a colores de Vuetify
const typeColors = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

// Actualizar color basado en el tipo
watch(() => props.type, (newType) => {
  color.value = typeColors[newType] || 'info'
}, { immediate: true })

// Sincronizar show prop con isVisible
watch(() => props.show, (newVal) => {
  isVisible.value = newVal
})

// Emitir evento cuando se cierra el snackbar
watch(isVisible, (newVal) => {
  if (!newVal) {
    emit('update:show', false)
  }
})
</script>