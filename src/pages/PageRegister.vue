<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input @blur="$v.form.username.$touch()" 
                        v-model = "form.username"
                        class="input is-large"
                         type="text"
                         placeholder="Username">
                </div>
                <div v-if="$v.form.username.$error" class="form-error">
                  <span v-if="!$v.form.username.required" class="help is-danger">Username cannot be empty.</span>
                  <span v-if="!$v.form.username.minlength" class="help is-danger">Username cannot less than 6 characters.</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input @blur="$v.form.name.$touch()" 
                        v-model = "form.name"
                        class="input is-large"
                         type="text"
                         placeholder="Name">
                </div>
                <div v-if="$v.form.name.$error" class="form-error">
                  <span v-if="!$v.form.name.required" class="help is-danger">Name cannot be empty.</span>
                  <span v-if="!$v.form.name.minlength" class="help is-danger">Name cannot be less than 6 characters.</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input @blur="$v.form.email.$touch()"
                        v-model = "form.email"
                        class="input is-large"
                         type="email"
                         placeholder="Your Email">
                </div>
                <div v-if="$v.form.email.$error" class="form-error">
                  <span v-if="!$v.form.email.required" class="help is-danger">Email cannot be empty.</span>
                  <span v-if="!$v.form.email.email" class="help is-danger">Email email address is invalid.</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model = "form.avatar"
                        class="input is-large"
                         type="text"
                         placeholder="Avatar"
                         autocomplete="">
                </div>
                <div v-if="$v.form.avatar.$error" class="form-error">
                  <span v-if="!$v.form.avatar.url" class="help is-danger">Avatar must be a url.</span>
                  <span v-if="!$v.form.avatar.allowedFileType">Please use GIF, JPG, JPEG or PNG</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model = "form.password"
                        class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password">
                </div>
                <div v-if="$v.form.password.$error" class="form-error">
                  <span v-if="!$v.form.password.required" class="help is-danger">Password cannot be empty.</span>
                  <span v-if="!$v.form.password.minlength" class="help is-danger">Password must be min. 8 characters.</span>
                  <span v-if="!$v.form.password.maxlength" class="help is-danger">Password must be max. 8 characters.</span>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model = "form.passwordConfirmation"
                        class="input is-large"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off">
                </div>
                <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                  <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger">Please confirm your password.</span>
                  <span v-if="!$v.form.passwordConfirmation.samePassword" class="help is-danger">Your password does not match</span>
                </div>
              </div>
              <button @click.prevent="register" type="submit" class="button is-block is-info is-large is-fullwidth">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Login</a> &nbsp;·&nbsp;
            <a>Sign Up With Google</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import { required, email, sameAs, url, minLength, maxLength} from 'vuelidate/lib/validators'
    import allowedFileType from '@/helpers/validators'
    export default{
        data(){
            return{
                form:{
                    username: null,
                    name: null,
                    email: null,
                    avatar: null,
                    password: null,
                    passwordConfirmation: null
                }
            }
        },
        validations:{
          form:{
            username: {
              required,
              minlength: minLength(6)
            },
            name: {
              required,
              minlength: minLength(6)
            },
            email: {
              required,
              email
            },
            avatar: {
              url,
              allowedFileType
            },
            password: {
              required,
              minlength: minLength(8),
              maxlength: maxLength(12)
            },
            passwordConfirmation: {
              required,
              samePassword: sameAs('password')
            }
          } 
        },
        computed:{
          fromIsvalid(){
            return this.$v.form.$invalid
          }
        },
        methods:{
          register(){
              console.log(this.$v)
              this.$v.form.$touch()
              this.$store.dispatch('auth/registerUser', this.form)
              .then(()=>{
                this.$router.push('/login')
              }).catch((err) => {
                console.log(err)
              })
          }
        }
    }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>