<template>
  <div class="container">
    <div class="header flex a-center j-between">
      <div class="header-left flex a-center">
        <span class="icon flex a-center j-center">
          <i class="el-icon-user"></i>
        </span>
        <div class="title">人员信息</div>
      </div>
      <div class="header-right flex a-center">
        <div class="btn" v-if="!show">
          <el-button type="primary" size="mini" @click="changeStatus">批量转正申请</el-button>
        </div>
        <div class="flex a-center" v-else>
          <div class="btn">
            <el-button type="primary" size="mini" @click="sure">确认</el-button>
          </div>
          <div class="btn">
            <el-button type="primary" size="mini" @click="show=!show">取消</el-button>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" size="mini">导出</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div class="c-btn flex a-center">
          <div class="c-btn flex a-center">
            <div
              class="tag"
              v-for="(item,index) in filterList"
              :key="index"
              @click="changeFilter(index)"
            >
              <span :class="{'active' : activeIdx===index}" class="flex a-center j-center">{{item}}</span>
            </div>
          </div>
        </div>
        <el-table
          :header-row-style="headerStyle"
          ref="multipleTable"
          :data="tableDatass"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="姓名" prop="name"></el-table-column>
          <el-table-column align="center" label="工号" prop="num" sortable></el-table-column>
          <el-table-column align="center" label="机构" prop="mechanism"></el-table-column>
          <el-table-column align="center" label="部门" prop="department"></el-table-column>
          <el-table-column align="center" label="试用期开始日期" prop="startTime" sortable></el-table-column>
          <el-table-column align="center" label="试用期结束日期" prop="endTime" sortable></el-table-column>
          <el-table-column align="center" prop="state" label="转正审批状态">
            <template slot-scope="scope">
              <span style="color: rgb(2, 133, 220);" v-if="scope.row.state">审核通过</span>
              <span style="color: rgb(2, 133, 220);" v-else>审核未通过</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="state" label="转正审批状态">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">编辑试用期</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page" style="marginTop:25px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const organizationModule = createNamespacedHelpers("organization");
const {
  mapActions: organizationAtions,
  mapState: organizationState
} = organizationModule;
export default {
  data() {
    return {
      show: false,
      headerStyle: {
        "font-weight": "550"
      },
      activeIdx: 0,
      tableData: [],
      tableData0: [],
      activeData: [],
      filterList: ["全部员工", "考核中员工", "已转正员工"],
      page: 1,
      size: 10,
      pageSize: 10
    };
  },
  components: {},
  props: {},
  methods: {
    ...organizationAtions(["getUserInfo"]),
    // 过滤数据
    filterData(index) {
      this.tableData = this.tableData0.filter(item => item.state === index);
    },
    changeStatus() {
      this.show = !this.show;
      this.filterData(0);
      this.activeData = [];
    },
    handleSelectionChange(val) {
      this.activeData = val;
    },
    sure() {
      if (this.activeData.length === 0) {
        this.$message({
          message: "暂未选择数据",
          type: "warning"
        });
      }
      this.activeData.map(item => {
        item.state = 1;
      });
      let arr = this.activeData.concat(this.tableData0);
      this.$message({
        message: "操作成功",
        type: "success"
      });
      const res = new Map();
      this.tableData0 = arr.filter(a => !res.has(a.id) && res.set(a.id, 1));
      this.tableData = this.tableData0;
      this.show = !this.show;
      // this.$refs.multipleTable.clearSelection();
      // console.log(this.activeData);
      // console.log(this.activeData);
      // this.tableData0 = this.$lodash(this.activeData, this.tableData0);
      // this.tableData = this.tableData0;
    },
    changeFilter(index) {
      if (this.activeIdx !== index) {
        this.activeIdx = index;
        if (index === 0) {
          this.tableData = this.tableData0;
        } else if (index === 1) {
          this.filterData(0);
        } else {
          this.filterData(1);
        }
      }
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    }
  },
  mounted() {},
  beforeMount() {
    this.getUserInfo();
  },
  watch: {
    user(val) {
      this.tableData = val;
      this.tableData0 = val;
    }
  },
  computed: {
    ...organizationState(["user"]),
    tableDatass() {
      return this.tableData.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
    },
    total() {
      return this.tableData.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.container {
  .header {
    .header-left {
      .icon {
        background: #38ba72;
        color: #fff;
        height: 24px;
        width: 16px;
        padding: 0 5px;
      }
      .title {
        font-weight: 700;
        margin-left: 8px;
      }
    }
    .header-right {
    }
  }
  .btn {
    margin-left: 5px;
  }
  .content {
    margin-top: 16px;
    overflow: hidden;
  }
  .tag {
    margin: 0 8px;
    span {
      border-radius: 20px;
      cursor: pointer;
      background-color: #ecf5ff;
      border-color: #d9ecff;
      display: inline-block;
      height: 32px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 12px;
      color: #409eff;
      border-width: 1px;
      border-style: solid;

      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .active {
      background: #1587d9 !important;
      color: #fff;
    }
  }
}
</style>