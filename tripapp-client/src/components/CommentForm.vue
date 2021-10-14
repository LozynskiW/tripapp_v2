<template>

  <q-form class="comment-form" @submit.prevent="onSubmit">
      <h3>Zostaw recenzję</h3>
      <div class="q-pa-md row items-start q-gutter-md">
        
        <q-card class="my-card bg-secondary text-white col-6">

          <q-card-section>
            <div class="text-h6">
              <q-input v-model="title" label="Title"></q-input>
            </div>

            <div class="text-subtitle2">
              {{user.username}}
            </div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="content" label="Content"></q-input>
          </q-card-section>

          <q-separator dark />

          <q-card-actions>
            <q-radio v-model.number="rate" val="5" label="5" color="green" />
            <q-radio v-model.number="rate" val="4" label="4" color="cyan" />
            <q-radio v-model.number="rate" val="3" label="3" color="amber-14" />
            <q-radio v-model.number="rate" val="2" label="2" color="orange" />
            <q-radio v-model.number="rate" val="1" label="1" color="red-14" />

            <q-btn flat align="right"><input class="button" type="submit" value="Dodaj komentarz"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
  </q-form>

</template>

<script>

export default {

  name: "CommentForm",

  emits: ['add-comment'],

  props: {
    user: {type: Object, required: true}
  },

  created() {
    //console.log(user)
  },

  data() {
    return {
      nick: null,
      title: null,
      content: null,
      rate: null
    }
  },

  methods: {

    onSubmit() {
      this.nick = this.user.username
      if(!this.nick || !this.title || !this.content || !this.rate) {
        alert("Wszystkie pola powinny być uzupełnione")
      } else {
        console.log(this.nick, this.title, this.content, this.rate)
        // dodawanie komentarzy

        this.$emit('addComment', {
          nick: this.nick,
          title: this.title,
          content: this.content,
          rate: this.rate
        })

        this.clearForm()
      }
    },

    onRateChange(rate) {
      switch (rate) {
        case 1:
          return 
      }
    },

    clearForm() {
      this.nick = null
      this.title  = null
      this.content  = null
      this.rate = null
    }

  }

}

</script>

<style scoped>
.comment-form {
  text-align: left;
}
.comment-form div {
  margin: 10px;
}
</style>