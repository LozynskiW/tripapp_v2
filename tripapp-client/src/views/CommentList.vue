<template>
  <div>
    <h3>Lista recenzji</h3>

    <div v-if="comments !== undefined && comments.length > 0">
      <div v-for="comment in comments" v-bind:key="comment.id">
        <div v-if="comment.proper === true">
          <Comment :comment="comment" :user="user"/>
        </div>
      </div>
    </div>

    <div v-else>
      <p> No comments </p>
    </div>

    <div v-if="user === null">
      <p>To add a comment You need to log in</p>
      <input type="submit" action="/account"/>
      
    </div>

    <div v-else>
      <CommentForm :user = "user" @add-comment="addComment"/>

    </div>

    <button @click="goBack">Powrot</button>

  </div>
</template>

<script>

import Comment from "@/components/Comment";
import placeService from "@/services/placeService";
import CommentForm from "@/components/CommentForm";
import userService from '../services/userService'
import commentService from '@/services/commentService'

export default {
  name: "CommentList",
  components: {Comment, CommentForm},
  props: {
    placeId: {type: String}
  },
  data() {
    return {
      comments: [],
      user: null
    }
  },
  async created() {
    this.getPlace(this.$route.params.placeId)
    this.user = await userService.getUserData();
    console.log(this.user)
  },
  methods: {

    async getPlace(id) {

      if (id) {

        const place = await placeService.getPlaceById(id)

        if (place) {

          this.comments = await commentService.getAllCommentsForPlace(id)
        }
      }
    },

    addComment(comment) {
      this.comments.push(comment)
      //console.log(this.$route.params.placeId, comment)
      commentService.addCommentForPlace(this.$route.params.placeId, comment)
    },

    goBack() {
      this.$router.push('/places/' + this.$route.params.placeId)
    }
  }
}
</script>

<style scoped>

</style>