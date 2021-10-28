<template>
  <div class="gitfork">
    <el-container>
      <el-aside
        width="280px"
        style="padding:10px; text-align:left; background-color:rgb(238, 241, 246)"
      >
        <h1 style="margin:0; font-size:24px; color:#F56C6C;">Git Fork:</h1>
        <div>
          <p
            :class="{ 'step-actived': selectedProject }"
            class="gitfork_step step-1"
            title="点击重新选择项目"
            @click="reSelectPro"
          >*1. 选择项目: {{ selectedProject && curProject.projectName }}</p>
          <p
            class="gitfork_step step-2"
            :class="{ ' step-actived': checkGit }"
          >2. 确认Git仓库：{{ checkGit }} </p>
          <p
            class="gitfork_step step-3"
            :class="{ ' step-actived': checkTarget }"
          >3. 添加目标仓库: {{ checkTarget }} </p>
          <p
            class="gitfork_step step-4"
            :class="{ ' step-actived': checkFetch }"
          >4. Fetch目标仓库: {{ checkFetch }} </p>
          <p
            class="gitfork_step step-5"
            :class="{ ' step-actived': checkBranches }"
          >5. 获取目标的branch：{{ checkBranches }} </p>
          <p
            :class="{ 'step-actived': checkFork }"
            class="gitfork_step step-6"
          >6. 选择目标branch：{{ checkFork }} </p>
          <p
            :class="{ 'step-actived': checkFork }"
            class="gitfork_step step-7"
          >7. 命名本地开发branch：{{ checkFork }} </p>
          <p
            class="gitfork_step step-8"
            :class="{ ' step-actived': checkFork }"
          >8. Forking: {{ checkFork }} </p>
          <p
            class="gitfork_step step-9"
            :class="{ ' step-actived': checkTrack }"
          >9. Tracking {{ checkTrack }} </p>
        </div>
      </el-aside>
      <el-main style="padding-top:0; background-color: #e3e3e3">
        <div style="text-align:left;">
          <el-button @click="onOpenVSCode">open with vscode</el-button>
          <el-button @click="onOpenFolder">open with folder</el-button>
        </div>
        <div
          v-if="curProject"
          style="text-align:left; font-size:14px;"
        >
          <p>
            <span style="color:red;">LocalPath: </span> {{ curProject.localPath }} <br>
            <span style="color:red;">TargetRepo: </span> {{ curProject.targetRepo }} <br>
          </p>
        </div>
        <div
          v-show="!checkGit"
          style="text-align:left;"
        >
          <el-select
            v-model="selectedProject"
            placeholder="请选择项目"
          >
            <el-option
              v-for="item in projects"
              :key="item.localPath"
              :label="item.projectName"
              :value="item.localPath"
            />
          </el-select>
          <el-button @click="checkGitRepo">手动 确认Git仓库信息</el-button>
        </div>
        <!-- 下拉选择目标分支 -->
        <div
          v-show="checkBranches && !checkFork && !checkTrack"
          style="text-align:left;"
        >
          <el-select
            v-model="selectedTargetBranch"
            filterable
            placeholder="选择目标仓库branch"
            style="width:100%;"
          >
            <el-option
              v-for="item in branches"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <br>
          <br>
          <el-input v-model="inputedLocalBranch" placeholder="填写本地开发Branch" />
          <br>
          <br>
          <el-button @click="onForking">forking</el-button>
        </div>
        <div
          v-if="checkFork"
          style="text-align:left;"
        >
          <span style="color:red;">Target branch: </span> {{ selectedTargetBranch }} <br>
          <span style="color:red;">Dev branch: </span> {{ inputedLocalBranch }} <br>
        </div>
        <div
          v-if="checkTrack"
          style="margin:30px; font-size:30px;"
        >
          😀😃😄😁😆🙂😉😊🥰😍
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { toRaw } from 'vue';
// eslint-disable-next-line
import wsInstance from '@/services/WSS.ts';
import * as MsgType from '@ronan-try/cli-const/es/wsMessageType';

const { stringify: toJSONString, parse: toJSONParse } = JSON;
export default {
  name: 'GitFork',
  data() {
    return {
      mustInfos: [],
      projects: [],
      branches: [],
      selectedProject: null,
      selectedTargetBranch: null,
      inputedLocalBranch: null,
      checkGit: false,
      checkTarget: false,
      checkFetch: false,
      checkBranches: false,
      checkFork: false,
      checkTrack: false,
    };
  },
  computed: {
    curProject() {
      if (!this.selectedProject) return null;

      const finded = this.projects.find((i) => i.localPath === this.selectedProject);
      console.log(finded);
      console.log(finded.projectName);
      return finded;
    },
  },
  mounted() {
    const handler = () => {
      wsInstance.send(toJSONString({ type: MsgType.CACHE_PROJECTS }));
      wsInstance.onmessage = (event) => {
        const objMsg = toJSONParse(event.data);

        if (objMsg.type === MsgType.CACHE_PROJECTS) {
          this.projects = objMsg.data;
        } else if (objMsg.type === MsgType.ADD_TARGET_UPSTREAM) {
          if (objMsg.data.success) {
            this.checkTarget = true;
            wsInstance.send(toJSONString({
              type: MsgType.FETCH_ROCLI_UPSTREAM,
              data: toRaw(this.curProject),
            }));
          } else {
            // eslint-disable-next-line
            alert('呀001，出乎意料了，自行解决Terminal错误后，重新刷新一下页面');
          }
        } else if (objMsg.type === MsgType.FETCH_ROCLI_UPSTREAM) {
          if (objMsg.data.success) {
            this.checkFetch = true;
            wsInstance.send(toJSONString({
              type: MsgType.GIT_BRANCH_R,
              data: toRaw(this.curProject),
            }));
          } else {
            // eslint-disable-next-line
            alert('呀002，出乎意料了，自行解决Terminal错误后，重新刷新一下页面');
          }
        } else if (objMsg.type === MsgType.GIT_BRANCH_R) {
          if (objMsg.data.success) {
            this.checkBranches = true;
            this.branches = objMsg.data.branches;
          } else {
            // eslint-disable-next-line
            alert('呀003，出乎意料了，自行解决Terminal错误后，重新刷新一下页面');
          }
        } else if (objMsg.type === MsgType.GIT_FORK) {
          if (objMsg.data.success) {
            this.checkFork = true;

            wsInstance.send(toJSONString({
              type: MsgType.GIT_TRACK,
              data: {
                project: toRaw(this.curProject),
                localBranch: this.inputedLocalBranch,
              },
            }));
          } else {
            // eslint-disable-next-line
            alert('呀004，出乎意料了，自行解决Terminal错误后，重新fork一下');
          }
        } else if (objMsg.type === MsgType.GIT_TRACK) {
          if (objMsg.data.success) {
            this.checkTrack = true;
            this.onOpenVSCode();
          }
        }
      };
    };
    console.log(wsInstance.readyState);
    if (wsInstance.readyState === 1) {
      handler();
    } else {
      wsInstance.onopen = handler;
    }
  },
  methods: {
    checkGitRepo() {
      this.checkGit = true;
      console.log(toRaw(this.curProject));

      wsInstance.send(toJSONString({
        type: MsgType.ADD_TARGET_UPSTREAM,
        data: toRaw(this.curProject),
      }));
    },
    onForking() {
      wsInstance.send(toJSONString({
        type: MsgType.GIT_FORK,
        data: {
          project: toRaw(this.curProject),
          localBranch: this.inputedLocalBranch,
          targetBranch: this.selectedTargetBranch,
        },
      }));
    },
    onOpenVSCode() {
      wsInstance.send(toJSONString({
        type: MsgType.OPEN_WITH_VSCODE,
        data: toRaw(this.curProject),
      }));
    },
    onOpenFolder() {
      wsInstance.send(toJSONString({
        type: MsgType.OPEN_WITH_FOLDER,
        data: toRaw(this.curProject),
      }));
    },
    reSelectPro() {
      this.checkGit = false;
      this.checkGit = false;
      this.checkTarget = false;
      this.checkFetch = false;
      this.checkBranches = false;
      this.checkFork = false;
      this.checkTrack = false;
    },
    reCheckFork() {
      this.checkFork = false;
      this.checkTrack = false;
    },
  },
};
</script>

<style>
.gitfork_step {
  opacity: .3;
}
.gitfork_step.step-1,
.gitfork_step.step-6,
.gitfork_step.step-7 {
  cursor: pointer;
}
.gitfork_step.step-actived {
  opacity: 1;
  color: #409EFF;
}
</style>
