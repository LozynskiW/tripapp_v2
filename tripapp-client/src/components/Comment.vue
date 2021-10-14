<template>

  <q-card class="my-card">
    <div class="row">
      <div class="col-10">
        <div class="comment" :class="{'good': comment.rate > 3}" :style="{background: backgroundColor()}">
          <p><strong>Tytuł: </strong>{{comment.title}}</p>
          <p><strong>Komentarz: </strong>{{comment.content}}</p>
          <p><strong>Nick: </strong>{{comment.nick}}</p>
          <p><strong>Ocena: </strong>{{comment.rate}}</p>
        </div>
      </div>

      <div class='col' v-if="user.role === 'admin'">

        <q-form>
          <q-btn :size="LG" color="red-14" align="center" @click="updateIsProper(isProper)">Mark as not proper</q-btn>
        </q-form>
        
      </div>
    </div>
  </q-card>

</template>

<script>

import commentService from '@/services/commentService'

export default {
  name: "Comment",
  props: {
    comment: {type: Object, required: true},
    user: {type: Object, required: true}
  },
  data() {
    return {
      isProper: true,
      //user: null
    }
  },
  methods: {
    backgroundColor() {
      switch(this.comment.rate) {
        case 5:
        case 4:
          return 'green'
        case 3:
          return 'yellow'
        case 2:
        case 1:
          return 'red'
      }
    },

    updateIsProper() {
      commentService.markCommentNotProper(this.comment._id)
      this.$router.go(0);
    }


  }
}
</script>

<style scoped>
.comment {
  border: 1px solid black;
}
.good {
  background: green;
}
.neutral {
  background: yellow;
}
.bad{
  background: red;
}

.my-card {
  width: 50%
}
</style>