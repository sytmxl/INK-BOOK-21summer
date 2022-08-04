<template>
  <div>
    <drawio-u-m-l :del = "true"/>
  </div>
</template>

<script>
import DrawioPrototype from "@/components/drawioPrototype";
import DrawioUML from "@/components/drawioUML";
export default {
  name: "testpage",
  components: {DrawioPrototype,DrawioUML}
}
</script>

<style scoped>

</style>