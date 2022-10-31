<template>
  <div class="page-container newtab-container">
    <!-- <video src="../../assets/images/newtab/02.mp4" autoplay loop muted /> -->
    <div id="search-container">
      <el-space direction="vertical" :size="2">
        <span class="time">{{ datetimeInfo.time }}</span>
        <el-space :size="20">
          <span>{{ datetimeInfo.date }}</span>
          <span>{{ datetimeInfo.week }}</span>
        </el-space>
        <el-space class="search" :size="0">
          <el-dropdown class="search-mode" @command="(value:string) => (searchParams.mode = value)">
            <span class="el-dropdown-link">
              {{ searchModes.find((item) => item.value === searchParams.mode)?.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in searchModes" :key="item.value" :command="item.value">
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="vertical-line">&nbsp;|&nbsp;</span>
          <el-input v-model="searchParams.content" placeholder="输入并搜索" class="input-with-select"></el-input>
          <span class="vertical-line">&nbsp;|&nbsp;</span>
          <el-button class="search-btn" link type="">搜索一下</el-button>
        </el-space>
      </el-space>
    </div>
  </div>
</template>
《
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { dayjs } from 'element-plus';

const searchModes = reactive([
  { value: '1', name: '百度' },
  { value: '2', name: 'Github' },
  { value: '3', name: '华为社区' },
  { value: '4', name: 'CSDN' },
]);

const searchParams = reactive({ mode: '1', content: '' });

const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const getDatetimeInfo = () => {
  const day = dayjs();
  return { time: day.format('HH:mm'), date: day.format('YYYY-MM-DD'), week: weekList[day.day()] };
};
const datetimeInfo = ref(getDatetimeInfo());

setInterval(() => {
  datetimeInfo.value = getDatetimeInfo();
}, 60 * 1000);
</script>

<style lang="scss" scoped>
.newtab-container {
  background: url(../../assets/images/newtab/newtab_bg_09.jpg) no-repeat center;
}

video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -99;
  object-fit: cover;
}

#search-container {
  text-align: center;
  color: white;
  width: 800px;
  margin: 0 auto;
  padding-top: 180px;

  .time {
    font-size: 80px;
    font-weight: 700;
  }

  .search {
    margin-top: 32px;
    height: 48px;
    // border: red 1px solid;
    border-radius: 24px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.6);

    .search-mode {
      width: 100px;

      span {
        display: inline-block;
        width: 100%;
        color: #333;
      }
    }
    .el-input {
      width: 500px;
    }

    .search-btn {
      display: inline-block;
      width: 100px;
      color: #333;
    }
  }

  .search:hover {
    background-color: rgba(255, 255, 255, 1);
    .vertical-line {
      color: #333;
    }
    .el-input {
      --el-input-placeholder-color: #999;
    }
  }
}
.el-input {
  --el-input-border-color: transparent;
  --el-input-hover-border-color: transparent;
  --el-input-focus-border-color: transparent;
  --el-input-bg-color: transparent;
  --el-input-placeholder-color: #eee;
  --el-input-text-color: #333;
}
</style>
