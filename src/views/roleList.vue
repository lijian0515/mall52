<template>
<div>
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-button class="sx">默认按钮</el-button>
    <el-table style="width: 100%" :data="list">
        <el-table-column type="expand">
            <template slot-scope="scope">
                <el-row v-for="(item1,index) in scope.row.children" :key="index">
                    <el-col :span="4">
                        <el-tag @close="delepower(scope.row,item1.id)" closable type="">
                            {{item1.authName}}
                        </el-tag>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="(item2,index) in item1.children" :key="index">
                            <el-col :span="4">
                                <el-tag @close="delepower(scope.row,item2.id)" closable type="success">
                                    {{item2.authName}}
                                </el-tag>
                            </el-col>
                            <el-col :span="20">
                                <el-tag @close="delepower(scope.row,item3.id)" closable type="warning" v-for="(item3,index) in item2.children" :key="index">
                                    {{item3.authName}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="scope.row.children.length===0">
                    <span>该角色未分配权限</span>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column label="ID" type="index" width="80">
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName" width="180">
        </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" width="180">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle size="mini" plain @click="showeditdia(scope.row)"></el-button>
                <el-button type="success" icon="el-icon-check" circle size="mini" plain @click="showcheckdia(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" plain @click.prevent="deleuser(scope.row.id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="35%">
        <template solt-scope='scope'>
            <el-tree ref="tree" :data="treelist" show-checkbox node-key="id" :default-expanded-keys="expandedArr" :default-checked-keys="checkArr" :props="defaultProps">
            </el-tree>

        </template>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRight()">确 定</el-button>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            list: [],

            dialogVisible: false,
            // 树形结构要用的
            treelist: [],
            expandedArr: [],
            checkArr: [],
            defaultProps: {
                children: "children",
                label: "authName"
            },
            currRoleId:-1,
        };
    },

    created() {
        this.showroleList();
    },
    methods: {
        async setRight() {
      this.dialogVisible = false
      // roles/:roleId/rights
      // roleId 当前角色的id
      // post -> {rids: 权限 ID 列表	}

      // 获取选中的label的id值 getCheckedKeys
      // 获取半选的label的id值 getHalfCheckedKeys
      // this.$refs.tree.getCheckedKeys()
      const arr1 = this.$refs.tree.getCheckedKeys()
      // console.log(arr1)
      const arr2 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(arr2)
      // arr1.comcat
      // ES6 ...操作符 展开数组所有元素
      const arr = [...arr1, ...arr2]
      console.log(arr)
      // rids的值是以,分隔的字符串
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(',')
      })
      console.log(res)
      // 更新视图
      this.showroleList()

    },

        // 显示树形结构框
        async showcheckdia(rel) {
            this.dialogVisible = true;
              this.currRoleId = rel.id
            const res = await this.$http.get('rights/tree')
            console.log(res);
            this.treelist = res.data.data
            const arr = res.data.data
            const arrEmpty = []
            arr.forEach(item1 => {
                arrEmpty.push(item1.id)
                item1.children.forEach(item2 => {
                    arrEmpty.push(item2.id)
                    item2.children.forEach(item3 => {
                        arrEmpty.push(item3.id)

                    })

                })
            })
            // 让所有的标签展开/
            this.expandedArr = arrEmpty
            // / 获取当前用户的角色role里面所有权限的id
            // this.checkArr = [ids]
            
            const arrCheck = []
            rel.children.forEach(item1 => {
                // arrCheck.push(item1.id)
                item1.children.forEach(item2 => {
                    // arrCheck.push(item2.id)
                    item2.children.forEach(item3 => {
                        // 只需要添加最里层的节点id
                        arrCheck.push(item3.id)

                    })

                })
            })
            this.checkArr=arrCheck
        },
        // 点击删除权限
        async delepower(roleId, powerId) {
            // console.log(roleId.id,powerId);
            const res = await this.$http.delete(
                `roles/${roleId.id}/rights/${powerId}`
            );
            console.log(res);

            const {
                meta
            } = res.data;

            if (meta.status === 200) {
                this.$message.success(meta.msg);
                this.showroleList();
            }
        },
        async showroleList() {
            const res = await this.$http.get("roles");
            console.log(res);
            this.list = res.data.data;
        }
    }
};
</script>

<style>
.sx {
    margin: 30px 0;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.w {
    width: 50px;
}

.top {
    margin-top: 30px;
}
</style>
