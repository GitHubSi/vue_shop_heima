<template>
  <div>
    <el-container class="home-container">
      <!-- 头部区 -->
      <el-header>
        <div>
          <img src="@/assets/素材头像.jpg" alt="" />
          <span>基层教育组织系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主题区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse?'64px':'200px'">
          <!-- 侧边栏菜单区域 -->
          <!-- 点击高亮、只能打开一个隐藏栏、关闭折叠动画 、开启侧边栏路由、动态高亮-->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"

            :router="true"
            :default-active="activePath"

          >
          <!-- 菜单折叠和展开按钮条 -->

          <div class="toggle-button" @click="toggleCollapse">|||</div>
            <!-- 一级菜单 -->
            <!-- 循环渲染data中菜单数组的数据 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
              
            >
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>


              <!-- 二级菜单 -->
              <!-- 配置侧边栏路由跳转路径 -->
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <!-- 二级菜单的模板区域 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-star-on"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容区域 -->
        <el-main>
          <!-- 放置一个路由占位符，显示欢迎页面子组件 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      // 一级菜单自定义图标
      iconsObj: {
        '125': "el-icon-user",
        '103': "el-icon-unlock",
        '101': "el-icon-goods",
        '102': "el-icon-s-order",
        '145': "el-icon-data-analysis",
      },
      // 是否折叠，在点击按钮的方法中取反
      isCollapse:false,

      // 被激活的链接地址
      activePath:''
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出方法
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取菜单方法
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log(res);
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg);
      this.menuList = res.data;
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse

    },
    // 保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath

    }
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100vh;
}
.el-header {
  background-color: #272d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  // 隐藏菜单对不齐
  .el-menu{
    border-right: none;
  }
  
}
.el-main {
  background-color: #eaedf1;
}
// 折叠按钮样式
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
</style>
