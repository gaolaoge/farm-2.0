<template>
  <div class="infoTable-wrapper">
    <section class="f">
        <!--头像模块-->
      <div class="avatarBase">
        <!--头像编辑-->
        <div class="avatarEdit" @click="avatarEditFun">
          <span>{{ editAvatar }}</span>
        </div>
        <!--头像-->
        <img src="@/assets/avaterImg.png" alt="" class="avatarImg">
      </div>
      <!--账号-->
      <div class="form-item">
        <span class="label">{{ info.accountLabel }}：</span>
        <span class="val">{{ info.accountVal }}</span>
      </div>
      <!--昵称-->
      <div class="form-item">
        <span class="label">{{ info.nameLabel }}：</span>
        <span class="val">{{ info.nameVal }}</span>
        <span class="editBtn" @click="editNameMoudle = true">{{ editBtn }}</span>
      </div>
      <!--密码-->
      <div class="form-item">
        <span class="label">{{ info.passwordLabel }}：</span>
        <span class="val">{{ info.passwordVal }}</span>
        <span class="editBtn" @click="editPasswordMoudle = true">{{ editBtn }}</span>
      </div>
      <!--手机-->
      <div class="form-item">
        <span class="label">{{ info.phoneNumLabel }}：</span>
        <span class="val">{{ info.phoneNumVal }}</span>
        <span class="editBtn" @click="editPhoneMoudle = true">{{ editBtn }}</span>
      </div>
      <!--性别-->
      <div class="form-item">
        <span class="label">{{ info.sexLabel }}：</span>
        <el-radio-group v-model="info.sexVal">
          <el-radio label="男" value="男"></el-radio>
          <el-radio label="女" value="女"></el-radio>
        </el-radio-group>
        <span class="remarks">{{ info.sexRemarks }}</span>
      </div>
      <!--生日-->
      <div class="form-item">
        <span class="label">{{ info.birthdayLabel }}：</span>
        <modelCalendar style="display: inline-block" />
        <span class="remarks">{{ info.birthdayRemarks }}</span>
      </div>
      <!--邮箱-->
      <div class="form-item">
        <span class="label">{{ info.emailLabel }}：</span>
        <span class="val">{{ info.emailVal }}</span>
        <span class="editBtn" @click="editEmailMoudle = true">{{ editBtn }}</span>
        <span class="remarks">{{ info.emailRemarks }}</span>
      </div>
    </section>
    <!--修改头像-->
    <avatar-cutter v-show="showCutter"
                   @cancel="showCutter = false"
                   return-type="url"
                   @enter="uploadAvatar"
                   ref="avatarEdit"/>
    <edit-email v-show="editEmailMoudle" @cancel="editEmailMoudle = false"/>
    <edit-password v-show="editPasswordMoudle" @cancel="editPasswordMoudle = false"/>
    <edit-phone v-show="editPhoneMoudle" @cancel="editPhoneMoudle = false"/>
    <edit-name v-show="editNameMoudle" @cancel="editNameMoudle = false"/>
  </div>
</template>

<script>
  import modelCalendar from '@/components/farm-model/farm-calendar-single'
  import AvatarCutter from '@/components/farm-model/farm-avatarCutter'
  import editEmail from '@/components/Pinfo/editInfo/editEmail'
  import editPassword from '@/components/Pinfo/editInfo/editPassword'
  import editPhone from '@/components/Pinfo/editInfo/editPhone'
  import editName from '@/components/Pinfo/editInfo/editName'
  export default {
    name: 'infoTable',
    data(){
      return {
        editBtn: '修改',
        editAvatar: '修改头像',
        info: {
          accountLabel: '账号',
          accountVal: 'Admin',
          nameLabel: '昵称',
          nameVal: 'User name',
          passwordLabel: '密码',
          passwordVal: '**************',
          phoneNumLabel: '手机',
          phoneNumVal: '185****7163',
          sexLabel: '性别',
          sexVal: '男',
          birthdayLabel: '生日',
          birthdayVal: 'Admin',
          emailLabel: '邮箱',
          emailVal: '183412808@163.com',
          sexRemarks: '（*填写赠送5金币）',
          birthdayRemarks: '（*填写赠送5金币）',
          emailRemarks: '（用于更换手机～还有5金币赠送）'
        },
        showCutter: false, // 是否显示头像裁剪组件
        userInfo: {},
        editEmailMoudle: false,
        editPasswordMoudle: false,
        editPhoneMoudle: false,
        editNameMoudle: false,
      }
    },
    methods: {
      // 上传裁剪好的头像
      uploadAvatar(src) {
        this.imgSrc = src
        this.showCutter = false
      },
      // 编辑头像
      avatarEditFun(){
        let input = document.createElement('INPUT')
        input.type = 'file'
        input.accept='.jpg,.jpeg,.png'
        input.addEventListener('change',event => {
          this.showCutter = true
          this.$refs.avatarEdit.fileChange(event)
        })
        input.click()
      }
    },
    components: {
      AvatarCutter,
      modelCalendar,
      editEmail,
      editPassword,
      editPhone,
      editName
    }
  }
</script>

<style lang="less" scoped>
  .infoTable-wrapper {
    display: flex;
    background-color: #161d25;
    border-radius: 0px 0px 8px 8px;
    padding: 50px;
    box-sizing: border-box;
    height: calc(100vh - 160px);
    .f {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatarBase {
        position: relative;
        width: 120px;
        height: 120px;
        overflow: hidden;
        margin-bottom: 50px;
        .avatarEdit {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0);
          text-align: center;
          span {
            font-size: 14px;
            line-height: 120px;
            color: rgba(255, 255, 255, 0);
          }
        }
        .avatarImg {
          width: 120px;
        }
        &:hover .avatarEdit {
          background-color: rgba(0, 0, 0, 0.7);
          span {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .form-item {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        width: 480px;
        margin-bottom: 20px;
        .label {
          color: rgba(255, 255, 255, 0.59);
        }
        .val {
          color:rgba(255, 255, 255, 1);
        }
        .editBtn {
          margin-left: 20px;
          font-size: 14px;
          color: rgba(39, 95, 239, 1);
          line-height: 20px;
          cursor: pointer;
          opacity: 0.68;
          &:hover {
            opacity: 0.9;
          }
        }
        .remarks {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 17px;
          margin-left: 20px;
        }
        /deep/.el-radio__input {
          transform: scale(0.7);
        }
        /deep/.el-radio__label {
          padding-left: 4px;
        }
        /deep/.is-checked > .el-radio__label {
            color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
</style>
