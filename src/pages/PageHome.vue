<template>
  <div>
    <AppHero />
    <div class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <button class="button is-primary is-pulled-right m-r-sm">Create Meetups</button>
        <button class="button is-primary is-pulled-right m-r-sm">All</button>
      </div>
      <div class="row columns is-multiline">
        <!-- used for meetup item -->
        <MeetupItem v-for="meetup in meetups" 
                    :meetItem = "meetup"
                    :key = "meetup._id" />
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
              <div class="columns cover is-multiline is-mobile">
              <!-- used for activity item -->
              <CategoryItem v-for="category in categories" 
                            :catItem = "category" 
                            :key = "category._id" />
              </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import CategoryItem from '@/components/CategoryItem.vue'
  import MeetupItem from '@/components/MeetupItem.vue'
  import {mapActions , mapState} from 'vuex'
  export default{
    components:{
      CategoryItem,
      MeetupItem
    },
    computed:{
      ...mapState({
        meetups: state => state.meetups.items,
        categories: state => state.categories.items
      })
    },
    created(){
      this.fetchMeetups()
      this.fetchCategories()
    },
    methods:{
      ...mapActions('meetups',['fetchMeetups']),
      ...mapActions('categories',['fetchCategories'])
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
