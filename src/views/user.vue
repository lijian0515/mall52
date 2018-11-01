<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 25px;">

        <el-row>
            <el-col :span="12">
                <el-input placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-button type="success" round style="margin-left: 10px;">成功按钮</el-button>
            </el-col>
        </el-row>
    </div>
    <template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="#" width="80">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期">
            </el-table-column>
            <el-table-column prop="address"  label="用户状态">
                <el-switch v-model="value2" active-color="#13ce66" active-icon-class="" inactive-color="#ff4949">
                </el-switch>
            </el-table-column>
            <el-table-column prop="address" label="操作">
            </el-table-column>
        </el-table>
    </template>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            value1: true,
            value2: true

        }
    },
    async mounted() {

        const AUTH_TOKEN = sessionStorage.getItem('token')
        console.log(AUTH_TOKEN);

        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const res = await this.$http.get('users?pagenum=1&pagesize=5')
        console.log(res);
        const {
            data,
            meta
        } = res.data
        if (meta.status === 200) {
            this.tableData = data.users
        } else {
            this.$message.error(meta.msg);
        }

    },

}
</script>

<style>

</style>
