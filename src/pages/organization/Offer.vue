<template>
  <div class="container">
    <div class="header flex a-center j-between">
      <div class="header-left flex a-center">
        <span class="icon flex a-center j-center">
          <i class="el-icon-folder-opened"></i>
        </span>
        <div class="title">offer管理</div>
      </div>
      <div class="header-right flex a-center">
        <div class="btn">
          <el-button type="primary" size="mini">新建offer</el-button>
        </div>
        <div class="btn">
          <el-button type="primary" size="mini">转移状态</el-button>
        </div>
        <div class="btn">
          <el-button type="primary" size="mini">导出</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div class="c-btn flex a-center">
          <div class="btn">
            <el-button
              type="primary"
              size="mini"
              v-for="(item,index) in statusList"
              :key="index"
            >{{item}}offer ({{getStatusNum(index)}})</el-button>
          </div>
        </div>
        <el-table
          :show-overflow-tooltip="false"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :row-style="rowStyle"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <template v-for="(item,index) in filterProps">
            {{item.label}}
            <el-table-column
              align="center"
              :label="item.label"
              :prop="item.prop"
              v-if="item.isProp"
            ></el-table-column>
            <el-table-column align="center" :label="item.label" :prop="item.prop" v-else>
              <template slot-scope="scope">
                <!-- {{ scope.row[item.prop] }} -->
                <span v-if="item.prop==='education'">{{educationList[scope.row[item.prop]] }}</span>
                <span v-else-if="item.prop==='marriage'">{{getMarriage(scope.row[item.prop]) }}</span>
                <span v-else-if="item.prop==='status'">{{statusList[scope.row[item.prop]] }}</span>
                <span v-else-if="item.prop==='gender'">{{genderList[scope.row[item.prop]] }}</span>
                <span
                  v-else-if="item.prop==='nativePlace'"
                >{{getNativePlace(scope.row[item.prop]) }}</span>
              </template>
            </el-table-column>
          </template>
          <el-table-column align="center" width="55">
            <template slot="header" slot-scope="scope">
              <div>
                <el-popover v-model="visible0" placement="bottom" width="200" trigger="click">
                  <div class="popoverss">
                    <div class="top flex a-center j-between">
                      <el-popover v-model="visible1" placement="right" width="176" trigger="click">
                        <div class="field">
                          <div class="field-item">
                            <el-checkbox-group v-model="addField">
                              <el-checkbox
                                v-for="(item,index) in getAddField(false)"
                                :label="item.label"
                                :key="index"
                              >{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                          </div>
                          <div class="btn flex j-end">
                            <el-button
                              type="primary"
                              size="mini"
                              v-popover:popover1
                              @click="sureAdd(true)"
                            >确定</el-button>
                          </div>
                        </div>
                        <div slot="reference">添加显示字段</div>
                      </el-popover>
                      <el-popover v-model="visible2" placement="right" width="176" trigger="click">
                        <div class="field">
                          <div class="field-item">
                            <el-checkbox-group v-model="delField">
                              <el-checkbox
                                v-for="(item,index) in getAddField(true)"
                                :label="item.label"
                                :key="index"
                              >{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                          </div>
                          <div class="btn flex j-end">
                            <el-button type="primary" size="mini" @click="sureAdd(false)">确定</el-button>
                          </div>
                        </div>
                        <span slot="reference" v-popover:popover2>删除显示字段</span>
                      </el-popover>
                    </div>
                    <div class="content">
                      <div class="title">选择间距类型</div>
                      <div class="flex a-center j-around">
                        <span
                          :class="{'space-active':spaceActive===index}"
                          v-for="(item,index) in spaceList"
                          :key="index"
                          @click="changeSpace(index)"
                        >{{item}}</span>
                      </div>
                    </div>
                  </div>
                  <span slot="reference" class="el-icon-setting"></span>
                </el-popover>
              </div>
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
      tableProps: [
        { label: "民族", prop: "nation", isShow: true, isProp: true },
        { label: "电话", prop: "phone", isShow: true, isProp: true },
        { label: "学历", prop: "education", isShow: true, isProp: false },
        { label: "手机", prop: "tel", isShow: true, isProp: true },
        { label: "qq", prop: "qq", isShow: true, isProp: true },
        { label: "入职时间", prop: "createTime", isShow: true, isProp: true },
        { label: "工作地点", prop: "workAddress", isShow: true, isProp: true },
        { label: "部门", prop: "department", isShow: true, isProp: true },
        { label: "婚姻状态", prop: "marriage", isShow: true, isProp: false },
        { label: "姓名", prop: "name", isShow: false, isProp: true },
        { label: "个人邮箱", prop: "email", isShow: false, isProp: true },
        {
          label: "证件类型",
          prop: "certificates",
          isShow: false,
          isProp: true
        },
        {
          label: "证件号码",
          prop: "certificatesNum",
          isShow: false,
          isProp: true
        },
        { label: "性别", prop: "gender", isShow: false, isProp: false },
        { label: "职位", prop: "position", isShow: false, isProp: true },
        { label: "offer状态", prop: "status", isShow: false, isProp: false },
        { label: "出生日期", prop: "birthday", isShow: false, isProp: true },
        { label: "籍贯", prop: "nativePlace", isShow: false, isProp: false }
      ],
      page: 1,
      size: 10,
      pageSize: 10,
      educationList: [
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士",
        "博士以上"
      ],
      spaceList: ["紧凑", "适中", "宽松"],
      spaceActive: 1,
      rowStyle: { height: "60px" },
      addField: [],
      delField: [],
      visible0: false,
      visible1: false,
      visible2: false,
      filterProps: [],
      statusList: ["待发", "已发", "已接受", "已拒绝", "已入职"],
      genderList: ["男", "女"]
    };
  },
  components: {},
  props: {},
  methods: {
    ...organizationAtions(["getOffer"]),
    // 每页条数切换的配置
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    // 获取婚姻状况
    getMarriage(index) {
      if (index) {
        return "已婚";
      } else {
        return "未婚";
      }
    },
    // 切换间距
    changeSpace(index) {
      if (this.spaceActive !== index) {
        this.spaceActive = index;
        if (index === 0) {
          this.rowStyle.height = "20px";
        } else if (index === 1) {
          this.rowStyle.height = "60px";
        } else {
          this.rowStyle.height = "100px";
        }
      }
    },
    // 处理籍贯
    getNativePlace(item) {
      return item.replace(/\"/g, "");
    },
    // 获取可添加字段
    getAddField(flage) {
      return this.tableProps.filter(item => item.isShow === flage);
    },
    // 确认添加
    sureAdd(flage) {
      let arr = this.addField;
      if (!flage) {
        arr = this.delField;
        this.visible2 = false;
      } else {
        this.visible1 = false;
      }
      if (!this.visible1 && !this.visible2) {
        this.visible0 = false;
      }
      arr.map(item => {
        this.tableProps.map(items => {
          if (items.label === item) {
            items.isShow = flage;
          }
          return;
        });
      });
      localStorage.setItem("tableProps", JSON.stringify(this.tableProps));
      this.getFilterProps();
      this.addField = [];
      this.delField = [];
    },
    getFilterProps() {
      this.filterProps = this.tableProps.filter(item => item.isShow);
    },
    getStatusNum(index) {
      return this.offer.filter(item => item.status === index).length;
    }
  },
  mounted() {},
  beforeMount() {
    this.getOffer();
    if (localStorage.getItem("tableProps")) {
      this.tableProps = JSON.parse(localStorage.getItem("tableProps"));
    }
    this.getFilterProps();
  },
  watch: {},
  computed: {
    ...organizationState(["offer"]),
    tableData() {
      return this.offer.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
    },
    total() {
      return this.offer.length;
    }
  }
};
</script>

<style scoped lang='scss'>
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
  ::v-deep .el-table .cell {
    white-space: nowrap;
    min-width: 50px !important;
  }
  ::v-deep .el-table__body-wrapper {
    position: relative;
  }
}
.popoverss {
  .top {
    font-size: 12px;
    cursor: pointer;
    border-bottom: 1px solid rgb(238, 238, 238);
    padding-bottom: 6px;
    span {
      color: rgb(0, 79, 158);
    }
  }
  .content {
    margin-top: 8px;
    cursor: pointer;
    .title {
      margin: 4px 0px;
    }
    .space-active {
      color: #0285dc !important;
    }
  }
}
.field {
  .field-item {
    margin-left: 10px;
    ::v-deep .el-checkbox {
      display: block !important;
      margin-bottom: 5px;
    }
  }
}
</style>