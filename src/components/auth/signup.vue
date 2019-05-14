<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="form-group col-sm-6 offset-sm-3" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <input
                  type="email"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email"
                  class="form-control">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.required">This field must not be empty.</p>
        </div>
        <div class="form-group col-sm-6 offset-sm-3" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  @blur="$v.password.$touch()"
                  v-model="password"
                  class="form-control">
        </div>
        <div class="form-group col-sm-6 offset-sm-3" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword"
                  class="form-control">
        </div>
        <div class="submit col-sm-6 offset-sm-3">
          <button class="col-sm-5 btn btn-info" type="submit" :disabled="$v.$invalid">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
       sameAs: sameAs('password')
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>
  .form-group.invalid label {
    color: red;
  }

  .form-group.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }
</style>