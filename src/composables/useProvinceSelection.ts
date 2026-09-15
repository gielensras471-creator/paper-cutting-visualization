import { ref } from 'vue'

const selectedProvince = ref('')

export function useProvinceSelection() {
  const selectProvince = (province: string) => {
    selectedProvince.value = selectedProvince.value === province ? '' : province
  }
  const clearProvince = () => {
    selectedProvince.value = ''
  }
  return { selectedProvince, selectProvince, clearProvince }
}
