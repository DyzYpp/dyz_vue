<!--suppress ALL -->
<template>
    <div style="position: relative; top: 200px;"   >
        <el-row>
            <el-col :offset="10" :span="5">
                <el-input class="loginStyle" type="text" placeholder="账号"  v-model="loginForm.userName"></el-input>
                <el-input type="password" placeholder="密码" v-model="loginForm.passWord"></el-input>
            </el-col>
        </el-row>
        <el-row style="position: relative; top: 30px;">
            <el-col :offset="10" :span="5">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                loginForm: {
                    userName: '',
                    passWord: '',
                }
            }
        },
        methods:{
            // 用户登录
            login(){

            },
            // 重置表单
            reset(){
                this.loginForm.userName = "";
                this.loginForm.passWord = ""
            },
        },
    }
</script>
<style scoped>
    .loginStyle{
        margin-bottom: 20px;
    }
</style>
