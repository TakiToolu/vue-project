<template>
    <div>
        计数器：<button @click="minus">-</button>
      <br>
      当前:{{$store.state.count}}}
      计数器：<button @click="add">+</button>
      {{$store.getters.val}}
    </div>
</template>

<script>
  export default {
    name: 'Counter',
    methods:{
      add(){

      },
      minus(){

      }
    }
  }
</script>

<style scoped>

</style>
