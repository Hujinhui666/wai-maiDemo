<template>
  <div v-for="(i,index) in NavLists" :key="index">
    <NavListItem :NavListItems="i"></NavListItem>
  </div>
</template>

<script>
import NavListItem from './NavListItem.vue'
export default {
  components: { NavListItem },
    props:['NavLists']
}
</script>
