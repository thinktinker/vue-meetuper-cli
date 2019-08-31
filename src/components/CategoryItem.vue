<template>
    <div class="column is-one-quarter" :style="{'min-height': '160px'}">
        <a href="#">
            <span class="is-primary is-top is-medium tooltip">
            <figure class="image is-4by3 imageFade">
            <img class="is-rounded" :src="catItem.image" alt="">
            </figure>
            <div class="subtitle m-t-xs bold">{{catItem.name | capitalize}}</div>
            </span>
        </a>
    </div>
</template>

<script>
    export default{
        props:{
            catItem:{
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>