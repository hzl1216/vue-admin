<template>
  <div class="layout">
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}">
      <div class="logo-wrapper">
        logo
      </div>
      <el-menu
        background-color="#424f63"
        text-color="#fff"
        active-text-color="#65cea7"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path">
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                          :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i class="el-icon-adm-menu" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>
      <div class="title float-left">VUE-ADMIN 后台管理系统</div>
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            style="padding: 0 15px;">
            <div class="dropdown-content el-dropdown-link">
              <i class="icon el-icon-adm-usersetup"></i>
              <span class="text">{{user.name || user.username}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{user.username}}</el-dropdown-item>
              <el-dropdown-item command="b">{{user.type.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="menu-item">
          <i class="icon el-icon-adm-help"></i>
        </li>
        <li class="menu-item" @click="exit">
          <i class="icon iconfont el-icon-adm-exit"></i>
        </li>
      </ul>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';
  
  export default {
    created() {
      this.checkAuth();
    },
    data() {
      return {
        sider_menu_data: [
          {
            path: '/home',
            title: '首页',
            icon: 'el-icon-adm-home'
          },
          {
            path: '/individuals',
            title: '个体管理',
            icon: 'el-icon-adm-user',
            children: [
              {path: '/individuals/insert', title: '添加个体'},
              {path: '/individuals/update', title: '更新个体'},
              {path: '/individuals/delete', title: '删除个体'}
            ]
          },
          {
            path: '/clinicals',
            title: '临床管理',
            icon: 'el-icon-adm-form',
            children: [
              {path: '/clinicals/insert', title: '添加临床'},
              {path: '/clinicals/update', title: '更新临床'},
              {path: '/clinicals/delete', title: '删除临床'}
            ]
          },
          {
            path: '/tissues',
            title: '组织管理',
            icon: 'el-icon-adm-project',
            children: [
              {path: '/tissues/insert', title: '添加组织'},
              {path: '/tissues/update', title: '更新组织'},
              {path: '/tissues/delete', title: '删除组织'}
            ]
          },
          {
            path: '/data',
            title: '数据管理',
            icon: 'el-icon-adm-organization',
            children: [
              {path: '/data/insert', title: '添加数据'},
              // {path: '/data/update', title: '更新数据'},
              {path: '/data/delete', title: '删除数据'}
            ]
          },
          {
            path: '/drugs',
            title: '药物管理',
            icon: 'el-icon-adm-form',
            children: [
              {path: '/drugs/insert', title: '添加药物'},
              {path: '/drugs/update', title: '更新药物'},
              {path: '/drugs/delete', title: '删除药物'}
            ]
          },
          {
            path: '/models',
            title: '模型管理',
            icon: 'el-icon-adm-form',
            children: [
              {path: '/models/insert', title: '添加模型'},
              {path: '/models/update', title: '更新模型'},
              {path: '/models/delete', title: '删除模型'}
            ]
          },
          {
            path: '/tasks',
            title: '任务管理',
            icon: 'el-icon-adm-form',
            children: [
              {path: '/tasks/insert', title: '添加任务'},
              {path: '/tasks/delete', title: '管理任务'}
            ]
          },


          {
            path: '/access/index',
            title: '权限管理',
            icon: 'el-icon-adm-data'
          },
          {
            path: '/log/index',
            title: '操作日志',
            icon: 'el-icon-adm-log'
          },
          {
            path: '/test/index',
            title: '测试',
            icon: 'el-icon-adm-formsetup'
          }
        ],
        isCollapsed: false,
        adminMenuShow: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          this.$router.replace('/login');
        } else {
          this.getUser();
        }
      },
      getUser() {
        let User = {
          username: 'admin',
          type: {
            code: 0,
            name: '超级管理员'
          }
        };
        
        this.$store.commit('SET_USER', User);
      },
      handleCommand(command) {
        console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.instance.userLogout().then(res => {
            this.$store.commit('SET_TOKEN', '');
            this.$store.commit('SET_USER', null);
            this.$router.replace({path: '/login'});
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          return false;
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/variable';
  
  .siderbar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $siderbarWidth;
    z-index: 11;
    background-color: $siderbarBackgroundColor;
    transition: all 0.3s ease-in-out;
    
    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 16px 0;
      text-align: center;
      font-size: 24px;
      color: #FFFFFF;
      color: #65CEA7;
    }
    
    .menu-wrapper {
      position: absolute;
      top: 72px;
      bottom: 0;
      width: 100%;
      border-right: none;
      transition: all 0.3s ease-in-out;
      
      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }
      
      i {
        color: #FFFFFF;
      }
      
      .menu-item {
        
        &.is-active, &:hover {
          background-color: #353F4F !important;
          color: #65CEA7 !important;
          
          i {
            color: #65CEA7 !important;
          }
        }
        
      }
      
      .el-submenu__title:hover {
        color: #65CEA7 !important;
        
        i {
          color: #65CEA7 !important;
        }
      }
      
      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
  }
  
  .topbar-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 0;
    heihgt: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    background-color: $topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;
    
    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;
      
      i {
        transition: all 0.3s ease-in-out;
      }
    }
    
    .title {
      height: 100%;
      font-weight: bold;
    }
    
    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 0px;
        
        &:hover {
          cursor: pointer;
          background-color: #F5F5F5;
        }
        
        .icon {
          vertical-align: middle;
          font-size: 24px;
        }
        
        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }
  
  .content-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    
    .content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>
