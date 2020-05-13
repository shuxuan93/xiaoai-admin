<template>
  <div class="container">
    <div class="header flex a-center j-between">
      <div class="header-left flex a-center">
        <span class="icon flex a-center j-center">
          <i class="el-icon-price-tag"></i>
        </span>
        <div class="title">薪酬管理</div>
      </div>
    </div>
    <div class="top">
      <div class="h-con flex a-center j-between">
        <div class="h-title">{{time}} 薪酬预算</div>
        <div class="h-time">
          <el-date-picker
            v-model="datePicker"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <div class="h-desc">如果有更多的渠道请自行添加, 所有添加的渠道会显示在CRM系统中</div>
    </div>
    <div class="content">
      <el-card class="box-card">
        <div>
          <div class="c-title">薪资结构</div>
          <el-table
            :header-row-style="headerStyle"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column align="center" label="薪资构成" prop="name">
              <template slot-scope="scope">
                <div>
                  <span
                    class="edit"
                    v-if="!scope.row.name||columnIds===`${scope.$index}${scope.column.id}`"
                  >
                    <el-input v-model="scope.row.name" size="mini" @blur="onBlur" />
                  </span>
                  <span v-else>{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="计划支出(元)" prop="planMoney">
              <template slot-scope="scope">
                <div @click="clickCell(scope.$index, scope.column.id,scope.row)">
                  <span
                    class="edit"
                    v-if="!scope.row.planMoney||columnIds===`${scope.$index}${scope.column.id}`"
                  >
                    <el-input v-model="scope.row.planMoney" size="mini" @blur="onBlur" />
                  </span>
                  <span v-else>{{scope.row.planMoney}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="实际支出(元)" prop="actualMoney">
              <template slot-scope="scope">
                <div @click="clickCell(scope.$index, scope.column.id,scope.row)">
                  <span
                    class="edit"
                    v-if="!scope.row.actualMoney||columnIds===`${scope.$index}${scope.column.id}`"
                  >
                    <el-input v-model="scope.row.actualMoney" size="mini" @blur="onBlur" />
                  </span>
                  <span v-else>{{scope.row.actualMoney}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"></el-table-column>
            <el-table-column align="center"></el-table-column>
            <el-table-column align="center"></el-table-column>
            <el-table-column align="center" label="上月计划(元)" prop="lastMonth"></el-table-column>
            <el-table-column align="center" label="上月实际(元)" prop="thisMonth"></el-table-column>
          </el-table>
          <div class="more flex a-center">
            <div class="btn">
              <el-button type="primary" @click="addMore">添加更多</el-button>
            </div>
            <div class="btn">
              <el-button type="primary" @click="cancal" v-if="showMore">取消</el-button>
            </div>
          </div>

          <div class="all flex a-center">
            <div class="all-item">总计</div>
            <div class="all-item">{{reduceNumber('planMoney')}}</div>
            <div class="all-item">{{reduceNumber('actualMoney')}}</div>
            <div class="all-item"></div>
            <div class="all-item"></div>
            <div class="all-item"></div>
            <div class="all-item">{{reduceNumber('lastMonth')}}</div>
            <div class="all-item">{{reduceNumber('thisMonth')}}</div>
          </div>
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
      time: "",
      datePicker: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      headerStyle: {
        "font-weight": "550"
      },
      tableData: [],
      showMore: false,
      columnIds: ""
    };
  },
  components: {},
  props: {},
  methods: {
    ...organizationAtions(["getPay"]),
    addMore() {
      this.showMore = true;
      let a = {
        name: null,
        planMoney: null,
        actualMoney: null,
        lastMonth: 0,
        thisMonth: 0
      };
      this.tableData.push(a);
    },
    cancal() {
      this.showMore = false;
      this.tableData.pop();
    },
    reduceNumber(prop) {
      let result = this.tableData.reduce((a, b) => {
        a = a + b[prop];
        return a;
      }, 0);
      return result;
    },
    clickCell(index, id, item) {
      this.columnIds = `${index}${id}`;
    },
    onBlur(e) {
      this.columnIds = "";
      if (e.target.value.length > 0) {
        this.$message({
          message: "恭喜你，修改成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "输入为空",
          type: "warning"
        });
      }
    }
  },
  mounted() {},
  beforeMount() {
    this.getPay();
    this.time = this.$dayjs(new Date()).format("YYYY年MM日");
  },
  watch: {
    pay(val) {
      this.tableData = val;
    }
  },
  computed: {
    ...organizationState(["pay"])
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
  .top {
    margin-top: 24px;
    background: #fff;
    .h-con {
      .h-title {
        font-size: 24px;
        font-weight: 700;
        padding-left: 15px;
        height: 80px;
        line-height: 80px;
      }
      .h-time {
        margin-right: 30px;
      }
    }
    .h-desc {
      background: #e5f2e1;
      height: 50px;
      line-height: 50px;
      padding-left: 15px;
      font-size: 14px;
    }
  }
  .content {
    .c-title {
      font-size: 24px;
      font-weight: 700;
    }
    .more {
      position: relative;
      left: 3.5%;
      margin-top: 20px;
    }
    .all {
      margin-top: 20px;
      color: #0285dc;
      .all-item {
        flex: 1;
        text-align: center;
      }
    }
  }
  .btn {
    margin-left: 5px;
  }
}
</style>