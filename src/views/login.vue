<template>
<div class="login-wrap">
    <el-form label-position="top" label-width="80px" class="login-form">
        <h2>用户登录</h2>
        <el-form-item  label="用户">
            <el-input v-model="fromdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="fromdata.password" ></el-input>
        </el-form-item>
        <el-button class="login-button" type="primary" @click.prevent="login()">登录</el-button>
    </el-form>
</div>
</template>

   

<script>
export default {
  data() {
    return {
      fromdata: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    //   代码优化
    
   async login() {
     
   
   const res = await this.$http.post("login", this.fromdata)
   console.log(res);
   
   const { meta,data } = res.data;
          if (meta.status === 200) {
            const token = data.token
              sessionStorage.setItem('token',token)
              this.$router.push({name: 'user'})
          } else {
            this.$message.error(meta.msg);
          }
    }













    // login() {
    //   console.log(this.fromdata);
    //   this.$http
    //     .post("login", this.fromdata)

    //     .then(res => {
    //       const { meta } = res.data;
    //       if (meta.status === 200) {
    //           this.$router.push({name: 'user'})
    //       } else {
            
    //         this.$message.error(meta.msg);
    //       }
    //     });
    // }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
