<template lang="">
  <el-aside class="myside" :style="contentStyle">
    <el-menu :collapse="isCollapse" router text-color="#FFF"  default-active="1"
      class="elMenuVertical" :style="contentStyle" background-color="rgba(22, 131, 122,0)">
      <!-- 递归渲染 menuList -->
      <template v-for="(menuitem,index) of menuList">

        <template v-if="menuitem.children.length>0">
          <el-submenu :index="menuitem.path" :key="menuitem.name+index">
            <template slot="title">
              <i :class="menuitem.icon"></i>
              <span>{{menuitem.title}}</span>
            </template>
            <el-menu-item-group>
              <template v-for="menuchild in menuitem.children">
                <el-menu-item :index="menuitem.path+'/'+menuchild.path" :key="menuchild.name+index">
                  <i :class="menuchild.icon"></i>
                  <span>{{menuchild.title}}</span>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="menuitem.path" :key="menuitem+index">
            <i :class="menuitem.icon"></i>
            <span slot="title">{{menuitem.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
  import router from '@/router';
  import { mapGetters } from 'vuex';
  export default {
    name: 'CourseSider',
    props: ['isCollapse'],//父传子,控制折叠
    data() {
      return {
        //动态加载路由
        menuList: [],
      };
    },
    methods: {
      //自带
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //开关
      handle() {
        this.isCollapse = !this.isCollapse;
      },
      //封装获取的路由信息
      getMenuList(routes) {
        const menuList = [];
        routes.forEach(route => {
          if (route.path && route.name) {
            const menu = {//获取目录项
              title: route.meta.title ? route.meta.title : '',
              name: route.name,
              path: route.path,
              icon: route.meta.icon ? route.meta.icon : '',
              children: []
            };
            if (route.children) {
              menu.children = this.getMenuList(route.children).flat();//flat合并为单层数组
            }
            //根据route设置的角色和登录的角色信息对比,如果角色匹配则只生成角色相关的路由
            if(route.meta.role==this.getLoginType || route.meta.role=='all')
              menuList.push(menu);
          }
        });
        return menuList;
      },
    },
    computed: {
      //用来转换折叠和非折叠状态的样式
      contentStyle() {
        return this.isCollapse ? { width: '60px' } : { width: '200px' };
      },
      //获取vuex中的getters
      ...mapGetters({getLoginType:'getLoginType'})
    },
    mounted() {
      // console.log( router.options.routes);
      this.menuList = this.getMenuList(router.options.routes[2].children);
      console.log(router.options.routes[2].children);
      // console.log('---------------------------\n');
      // console.log(this.menuList);
      // console.log(JSON.stringify(this.menuList))
    },
  }
</script>
<style scoped>
  /* 非折叠样式 */
  .elMenuVertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    /* background-color: transparent; */
  }

  /* 设置折叠展开动画 */
  .myside {
    transition: width .5s linear;
    font-size: 10px;
    color: white;
    background-image: linear-gradient(to bottom, #424f63, #454263);
    width: 200px;
    overflow-x: hidden;
    /* border-right: 1px solid lightgray; */
  }

  .el-menu {
    border: none;
    transition: width .3s linear;
  }

  /* 菜单样式更改 */
  .el-menu .el-menu-item:hover {
    outline: 0 !important;
    color: white !important;
    background: #4b5a70 !important;
  }

  .el-menu .el-menu-item.is-active {
    color: white !important;
    background: #4b5a70 !important;
  }

  .el-submenu /deep/.el-submenu__title:hover {
    color: white !important;
    background-color: #4b5a70 !important;
  }

  .el-menu--vertical .el-menu-item-group{
    animation-play-state: paused; /*  取消动画 */
    background-color:   rgba(66, 79, 99,.8);
    backdrop-filter: blur(10px);/* 模糊半径为10像素 */
   
  }

</style>