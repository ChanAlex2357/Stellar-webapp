<script setup>
import { computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: (value) => ['facebook', 'twitter', 'instagram', 'linkedin', 'github','home','phone'].includes(value)
  },
  size: {
    type: String,
    default: '75px',
    validator: (value) => /^\d+(px|rem|em|%)$/.test(value)
  },
  color: {
    type: String,
    default: 'currentColor'
  }
});

const iconPath = computed(() => {
  return new URL(`../assets/image/${props.name}.png`, import.meta.url).href;
});
</script>

<template>
  <span class="icon-wrapper" :style="{ width: size, height: size }">
    <img 
      :src="iconPath" 
      :alt="`${name} icon`" 
      class="icon"
      :style="{ color: color }"
    />
  </span>
</template>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  vertical-align: middle;
}
</style>