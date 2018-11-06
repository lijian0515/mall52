<template>
<div>
    <!-- 面包屑 -->
     <my-bread level1="权限管理" level2="权限列表"></my-bread>
     <el-table
    :data="list"
    border
    style="width: 100%"
    class="top"
    height="500"
    >
    <el-table-column
      type='index'
      label="#"
      width="80">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限列表"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>

      </template>
    </el-table-column>
  </el-table>
</div>
    
</template>

<script>
export default {
  
  data() {
    return {
         list:[]
    }
  },
  created () {
      
      this.showPower()
  },
  methods: {
    async showPower() {
      const res = await this.$http.get(`rights/list`);
      console.log(res);
        this.list = res.data.data
    }
  }
};
</script>

<style>
.top{
    margin-top:30px; 
}
</style>
