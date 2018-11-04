<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 25px; margin-bottom: 25px">
        <el-row>
            <el-col :span="12">
                <el-input clearable placeholder="请输入内容" class="input-with-select" v-model="searchuser">
                    <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-button type="success" style="margin-left: 10px;" @click.prevent="addFormVisible=true">添加按钮</el-button>
            </el-col>
        </el-row>
    </div>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
                {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
            </template>
        </el-table-column>
        <el-table-column prop="address" label="用户状态" width="150">
            <!-- 开关 -->
            <template slot-scope="scope">
                <el-switch @change="Userstatus(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" active-icon-class="" inactive-color="#ff4949">
                </el-switch>
            </template>

        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
            <template slot-scope="scope">
                <!-- 编辑按钮 删除按钮 修改人员 -->
                <el-row>
                    <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="showeditdia(scope.row)"></el-button>
                    <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="showcheckdia(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click.prevent="deleuser(scope.row.id)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
        <el-form :model="addForm">
            <el-form-item label="用户" :label-width="addformLabelWidth">
                <el-input v-model="addForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="addformLabelWidth">
                <el-input v-model="addForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="addformLabelWidth">
                <el-input v-model="addForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="addformLabelWidth">
                <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="编辑用户" :visible.sync="redactFormVisible">
        <el-form :model="redactForm">
            <el-form-item label="用户" :label-width="addformLabelWidth">
                <el-input :disabled="true" v-model="redactForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="addformLabelWidth">
                <el-input v-model="redactForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="addformLabelWidth">
                <el-input v-model="redactForm.mobile" autocomplete="off"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="redactuser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="allotFormVisible">
        <el-form>
            <el-form-item label="用户名" :label-width="addformLabelWidth">
                {{username}}
            </el-form-item>
            <el-form-item label="角色" :label-width="addformLabelWidth">
                <el-select v-model="currRoleId">
                    <el-option disabled label="请选择" :value="-1"></el-option>
                    <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id">
                    </el-option>

                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotuser(getRoleByUserId)">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
export default {
    mounted() {
        this.getlist();
    },
    data() {
        return {
            // 获取表单
            tableData: [],
            // 加载
            loading: true,
            //   分页
            pagenum: 1,
            pagesize: 2,
            total: 5,
            //  搜索用户
            searchuser: "",
            // 用户添加
            addForm: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            addformLabelWidth: "120px",
            addFormVisible: false,
            // 编辑用户
            redactForm: {
                username: "",
                email: "",
                mobile: "",
                id: ""
            },
            redactFormVisible: false,
            // 角色分配
            allotFormVisible: false,
            username: '',
            // 当前角色id
            currRoleId: -1,
            // []测试角色
            roles: [],
            getRoleByUserId: -1,
        };
    },

    methods: {
        // 角色分配2 -修改角色
        async allotuser() {
            this.allotFormVisible = false
            const res = await this.$http.put(`users/${this.getRoleByUserId}/role`, {
                rid: this.currRoleId
            })
            console.log(res);

            const {
                meta
            } = res.data;
            if (meta.status === 200) {
                this.$message.success(meta.msg);
            }

        },
        // 角色分配
        async showcheckdia(message) {
            this.allotFormVisible = true
            this.getRoleByUserId = message.id
            this.username = message.username
            const res = await this.$http.get('roles')
            this.roles = res.data.data
            // 显示当前用户的角色
            const res1 = await this.$http.get(`users/${message.id}`)
            this.currRoleId = res1.data.data.rid
        },

        // 编辑用户
        showeditdia(message) {
            this.redactFormVisible = true;
            this.redactForm = message;
        },
        // 编辑用户2
        async redactuser() {
            console.log(this.redactForm.id);

            const res = await this.$http.put(`users/${this.redactForm.id}`, {
                email: this.redactForm.email,
                mobile: this.redactForm.mobile
            });
            const {
                meta
            } = res.data;
            if (meta.status === 200) {
                this.$message.success(meta.msg);
                this.getlist();
            } else {
                this.$message.error(meta.msg);
            }
        },
        // 删除用户
        async deleuser(ID) {
            this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                })
                .then(async () => {
                    const res = await this.$http.delete(`users/${ID}`);
                    const {
                        meta
                    } = res.data;
                    if (meta.status === 200) {
                        this.$message({
                            type: "success",
                            message: meta.msg
                        });
                        this.pagenum = 1;
                        this.getlist();
                    } else {
                        this.$message({
                            type: "warning",
                            message: meta.msg
                        });
                    }
                })
                .catch(() => {
                    this.$message.error("取消删除");
                });
        },
        // 添加用户
        async addUser() {
            this.addFormVisible = false;
            const res = await this.$http.post("users", this.addForm);
            // console.log(res);

            const {
                meta,
                data
            } = res.data;
            if (meta.status === 201) {
                this.$message.success(meta.msg);
                for (const k in this.addForm) {
                    // console.log(this.addForm[k]);
                    this.addForm[k] = "";
                    //  this.k=''
                }
            } else {
                this.$message.error(meta.msg);
            }
        },

        //   设置用户的状态
        // 首先查看 element文档  和接口文档
        // 因为 slot-scope 的值会直接绑定上元素或组件上的数据
        // 然后返回给slot-scope的值  ,值得名不固定  row是固定的
        // 通过数据发送  put请求  进行修改
        async Userstatus(status) {
            const res = await this.$http.put(
                `users/${status.id}/state/${status.mg_state}`
            );
            // console.log(res);
            const {
                meta
            } = res.data;
            if (meta.status === 200) {
                this.$message.success(meta.msg);
            } else {
                this.$message.success(meta.msg);
            }
        },

        //    搜索用户
        searchUser() {
            //   点击搜索
            // 1.因为在获取用户列表时里有带的查询参数所以直接写在获取列表时就可以  点击搜索按钮直接调用就行
            this.getlist();
        },
        //    分页
        handleSizeChange(val) {
            //   console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getlist();
        },
        handleCurrentChange(val) {
            //   console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getlist();
        },

        // 获取列表
        async getlist() {
            //  加载前赋值且true
            this.loading = true;
            // 获取列表
            // 获取的session
            const AUTH_TOKEN = sessionStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${
          this.searchuser
        }`
            );
            // console.log(res);
            const {
                data,
                meta
            } = res.data;
            if (meta.status === 200) {
                // 加载完成为false
                this.loading = false;
                // 获取到的总页数赋值给total
                this.total = data.total;
                this.tableData = data.users;
            } else {
                this.$message.error(meta.msg);
            }
        }
    }
};
</script>

<style>
</style>
