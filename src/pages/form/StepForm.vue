<template>
  <div class="container">
    <div class="top flex f-column">
      <div style="margin-bottom: 10px;">请填写您的转账信息</div>
      <div class="t-item">请务必是你本人操作,确认转账金额及收款人信息</div>
      <div class="content">
        <el-card>
          <div class="desc">
            <div class="step flex a-center">
              <div class="step-item flex a-center" v-for="(item,index) in stepList" :key="index">
                <div class="flex a-center">
                  <div
                    class="circle flex a-center j-center"
                    :class="[{'c-back' :active<=index},{'c-next':active>index}]"
                  >
                    <span v-if="active>index" class="el-icon-check"></span>
                    <span v-else>{{index+1}}</span>
                  </div>
                  <div class="c-info">{{item}}</div>
                </div>
                <div class="line" v-if="index+1<stepList.length"></div>
              </div>
            </div>
            <div class="c-desc flex a-center j-center f-column" v-if="active===0">
              <el-form
                :model="ruleForm"
                label-width="100px"
                label-position="left"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="account" label="付款账户：" required>
                  <el-input clearable v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="收款账户:" required>
                  <div class="account flex a-center">
                    <div class="type">
                      <el-form-item prop="accountType">
                        <el-select v-model="ruleForm.accountType" placeholder="请选择">
                          <el-option
                            v-for="item in accountOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item prop="accountNumber">
                        <el-input
                          :disabled="ruleForm.accountType==''"
                          clearable
                          v-model="ruleForm.accountNumber"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="name" label="付款人姓名:" required>
                  <el-input clearable v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="收款金额:" required>
                  <el-input clearable type="number" v-model="ruleForm.price">
                    <span slot="prefix">￥</span>
                  </el-input>
                </el-form-item>
              </el-form>
              <div class="flex a-center">
                <el-button type="primary" @click="next('ruleForm')">下一步</el-button>
              </div>
            </div>
            <div class="flex j-center" v-if="active===1">
              <div class="sure">
                <div class="alert">
                  <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon></el-alert>
                </div>
                <div>
                  <div class="s-item flex a-center">付款账户 : {{ruleForm.account}}</div>
                  <div class="s-item flex a-center">收款账户 : {{ruleForm.accountNumber}}</div>
                  <div class="s-item flex a-center">收款人姓名 : {{ruleForm.name}}</div>
                  <div class="s-item flex a-center">收款金额 : {{ruleForm.account}}元</div>
                </div>
                <el-divider></el-divider>
                <div class="pwd">
                  <el-form
                    :model="passForm"
                    label-width="100px"
                    label-position="left"
                    :rules="passRules"
                    ref="passForm"
                    class="demo-ruleForm"
                  >
                    <el-form-item prop="password" show-password label="支付密码:" required>
                      <el-input clearable v-model="passForm.password"></el-input>
                    </el-form-item>
                    <div class="flex a-center j-center">
                      <el-button type="primary" @click="next('passForm')">提交</el-button>
                      <el-button @click="active--">上一步</el-button>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="flex j-center" v-if="active===2">
              <div class="sure msg flex a-center j-center f-column">
                <div class="m-icon flex a-center j-center">
                  <i class="el-icon-check"></i>
                </div>
                <div style="margin-top: 25px;">操作成功</div>
                <div class="m-info">预计两小时到账</div>
                <div class="m-desc flex f-column">
                  <div class="m-item flex a-center">付款账户 : {{ruleForm.account}}</div>
                  <div class="m-item flex a-center">收款账户 : {{ruleForm.accountNumber}}</div>
                  <div class="m-item flex a-center">收款人姓名 : {{ruleForm.name}}</div>
                  <div class="m-item flex a-center">
                    收款金额 :
                    <span style="font-size: 22px;">{{ruleForm.price}}</span>元
                  </div>
                </div>
                <div class="m-btn flex a-center j-center">
                  <el-button type="primary" @click="active=0">再转一笔</el-button>
                  <el-button @click="look">查看账单</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepList: ["填写转账信息", "确认转账信息", "完成"],
      ruleForm: {
        account: "",
        accountType: "",
        accountNumber: "",
        name: "",
        price: ""
      },
      rules: {
        account: [
          { required: true, message: "付款账户不能为空", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "收款账号类型不能为空", trigger: "blur" }
        ],
        accountNumber: [
          { required: true, message: "收款账号不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "付款人不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "收款金额不能为空", trigger: "blur" }
        ]
      },
      passForm: {
        password: ""
      },
      passRules: {
        password: [
          { required: true, message: "支付密码不能为空", trigger: "blur" }
        ]
      },
      accountOption: [
        { label: "支付宝", value: "支付宝" },
        { label: "银行卡", value: "银行卡" }
      ],
      active: 0
    };
  },
  components: {},
  props: {},
  methods: {
    next(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.active++;
        } else {
          this.$message({
            message: "请完成表单验证",
            type: "warning"
          });
        }
      });
    },
    look() {
      // 账单
      localStorage.setItem("order", JSON.stringify(this.ruleForm));
      // this.$router.push("/form/checkForm");
      window.open("/form/checkForm");
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.container {
  margin-top: 20px;
  .top {
    background: #fff;
    height: 60px;
    padding-left: 10px;
    .t-item {
      color: #ccc;
      font-size: 14px;
    }
  }
  .content {
    margin-top: 30px;
    .desc {
      .step {
        .step-item {
          flex: 1;
          margin: 0 20px;
          .circle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 6px;
            border: 1px solid #ccc;
          }
          .c-back {
            background: #1890ff;
            color: #fff !important;
          }
          .line {
            flex: 1;
            height: 1px;
            background: #ccc;
            margin-left: 15px;
          }
        }
        .step-item:first-child {
          padding-left: 10%;
        }
      }
      .c-desc {
        margin-top: 60px;
        .account {
          .type {
            width: 120px;
            margin-right: 10px;
          }
        }
      }
    }
    .sure {
      margin-top: 30px;
      width: 40%;
      .alert {
      }
    }
    .s-item {
      margin: 15px 0;
      color: #272727;
      font-size: 14px;
    }
    .msg {
      .m-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #52c41a;
        font-size: 32px;
        color: #fff;
      }
      .m-info {
        margin: 5px 0;
        color: #ccc;
        font-size: 14px;
      }
      .m-desc {
        background: #fafafa;
        width: 400px;
        height: 200px;
        .m-item {
          margin: 10px;
          flex: 1;
        }
      }
      .m-btn {
        margin-top: 25px;
      }
    }
  }
}
.c-next {
  border: 1px solid #45b984 !important;
  color: #45b984 !important;
}
</style>