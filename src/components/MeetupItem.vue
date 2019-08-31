<template>
    <div class="column is-one-third">
        <router-link :to="{name:'PageMeetupDetail', params:{id:meetItem._id}}" class="card large">
        <div class="card-image">
            <figure class="image is-4by3">
            <img :src="meetItem.image" alt="">
            </figure>
        </div>
        <div class="card-content">
            <div class="level m-b-md">
            <div class="media-left">
                <div class="level-item has-text-centered">
                <div>
                    <p class="title">{{meetItem.startDate | formatDate("MMM")}}</p>
                    <p class="title">{{meetItem.startDate | formatDate("D")}}</p>
                </div>
                </div>
            </div>
            <div class="media-content">
                <p class="title is-4 no-padding is-marginless">{{meetItem.title}}</p>
                <!-- <p><span class="title is-6"><a href="http://twitter.com/#">@twitterid</a></span></p> -->
                <span class="tag is-success">Music</span>
                <p class="subtitle is-7">{{meetItem.timeFrom}} · {{meetItem.location}}</p>
            </div>
            </div>
            <div class="content">
                {{meetItem.description}}
                <div class="background-icon"><span class="icon-barcode"></span></div>
            </div>
        </div>
        </router-link>
    </div>
</template>

<script>
    export default{
        props:{
            meetItem: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
</style>