<template>
  <div
   class='contents' 
   v-bind:class="[
    {test : this.focus === 'test'},
    {code: this.focus === 'code'},
    {refactoring: this.focus === 'refactoring'}
   ]"
   @keydown="onFocusChange">
    <div>
      <div class="focus-panel columns is-mobile">
        <div 
          v-bind:class="{current: this.focus === 'test'}"
          class="focus-item focus-test column" tabindex="1" autofocus ref="focusTest" >
          <div>
              <span class="icon">
                <i class="far fa-edit"></i>
              </span>
              <p>Test</p>
          </div>
        </div>
        <div 
          v-bind:class="{current: this.focus === 'code'}"
          class="focus-item focus-code column" tabindex="2">
          <div>
              <span class="icon">
                <i class="far fa-check-circle"></i>
              </span>
              <p>Code</p>
          </div>
        </div>
        <div 
          v-bind:class="{current: this.focus === 'refactoring'}"
          class="focus-item focus-refactoring column">
          <div>
              <span class="icon">
                <i class="fas fa-seedling"></i>
              </span>
              <p>Clean</p>
          </div>
        </div>
      </div>
      <div class="focus-tool">
        <div class="focus-tool-item" v-if="this.focus === 'test'">
          <div class="zen">
            <p>Define Clear Specification.</p>
            <span class="icon">
              <i class="far fa-edit"></i>
            </span>
          </div>
        </div>
        <div class="focus-tool-item" v-if="this.focus === 'code'" >
          <div class="zen">
            <p>Just Make It Pass.</p>
            <span class="icon">
              <i class="far fa-check-circle"></i>
            </span>
          </div>
        </div>
        <div class="focus-tool-item" v-if="this.focus === 'refactoring'" >
          <div class="zen">
            <p>Save Knowledge to Code.</p>
            <span class="icon">
              <i class="fas fa-seedling"></i>
            </span>
            <input v-model="issueSearchWord" @input="onInputSearchWord" ref="issueSearchWord" class="border-less-input" tabindex="3" placeholder="Code Issue">
          </div>
          <div class="issueArea">
            <span v-for="issue in filteredIssues" :key="issue"
              v-bind:class="{doing: this.isDoingIssue}"
              class="issue tag is-info is-large">{{issue.name}}
              <span 
                class="code-issue-fix-count"
                v-bind:class="{doing: this.isDoingIssue}"
                >{{issue.fixCount}}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Issue {
    name:string
    fixCount:number
    descriptions:string[]
}

export default defineComponent({
  methods: {
    onInputSearchWord(event:any) {
      if(this.isDoingIssue) {
        this.selectedIssue = this.filteredIssues[0]
      } else {
        this.selectedIssue = {} as Issue
      }
    },
    onFocusChange(event:any) {
      console.log(event)
      if(event.key === 'Control') {
        if(this.focus === '') {
          this.focus = 'test'
        } else if(this.focus === 'test') {
          this.focus = 'code'
        } else if(this.focus === 'code') {
          this.focus = 'refactoring';
          this.$nextTick(() => (this.$refs.issueSearchWord as any).focus());
          this.issueSearchWord = ''
        } else if(this.focus === 'refactoring') {
          this.focus = 'test';
          this.$nextTick(() => (this.$refs.focusTest as any).focus());
        }
      }
      if(event.key === 'Enter') {
        if(this.selectedIssue.name != '') {
          this.selectedIssue.fixCount++;
        }
      }
    },
  },
  computed: {
    filteredIssues():Issue[] {
      return this.issues.filter(issue => issue.name.toLowerCase().replace(/\s/g, '').includes(this.issueSearchWord.replace(/\s/g, '').toLowerCase()))
    },
    isDoingIssue():boolean {
      return this.filteredIssues.length === 1
    }
  },
  data() {
    return {
      focus: '',
      issueSearchWord: '',
      selectedIssue: {} as Issue,
      issues: [
        {fixCount: 0, name: 'Long Method'  , descriptions: ['1つの仕事をするメソッドに分割できないか？', '分割前に別のIssueを解決したか？', '同じ抽象度を話しているか？']},
        {fixCount: 0, name: 'Long Scope Var'  , descriptions: ['1つの仕事をするメソッドに分割できないか？', '分割前に別のIssueを解決したか？', '同じ抽象度を話しているか？']},
        {fixCount: 0, name: 'Big Class'    , descriptions: ['1つの仕事をするクラスに分割できないか？', '']},
        {fixCount: 0, name: 'Duplicate Code' , descriptions: ['メソッドを切り出して解決できないか？', 'クラスを切り出して解決できないか？']},
        {fixCount: 0, name: 'Temp Variable', descriptions: ['']},
        {fixCount: 0, name: 'Long Parameters', descriptions: ['']},
        {fixCount: 0, name: 'Naming', descriptions: ['']},
        {fixCount: 0, name: 'Dead Code', descriptions: ['']},
        {fixCount: 0, name: 'Arrow', descriptions: ['']},
        {fixCount: 0, name: 'Feature Envy', descriptions: ['']},
        {fixCount: 0, name: 'Primitive Obsession', descriptions: ['']},
        {fixCount: 0, name: 'Data Clump', descriptions: ['']},
        {fixCount: 0, name: 'Violate SLAP', descriptions: ['']},
        {fixCount: 0, name: 'For', descriptions: ['']},
        {fixCount: 0, name: 'Mutable', descriptions: ['']},
        {fixCount: 0, name: 'Switch', descriptions: ['']},
        {fixCount: 0, name: 'Magic Number', descriptions: ['']},
        {fixCount: 0, name: 'Incidental Details', descriptions: ['']},
        {fixCount: 0, name: 'Setup Sermon', descriptions: ['']},
      ],
    };
  },
});
</script>

<style lang="scss">
.columns {
  padding: 0px;
  margin: 0px
}
.contents {
  margin-bottom: 0px;;
  padding: 10px 0px 10px 10px;
  height: 100vh;
  &.test{
    background-color:#ffb0b0;
  }
  &.code {
    background-color: #d6ffd6;
  }
  &.refactoring {
    background-color: #c6e3ff;
  }
  transition: 0.2s ease-out 0.1s;
}
.focus-panel {
  margin: 20px;
}
.focus-tool-item {
  opacity: 1;
  &.current { //not work when add v-if
    transition: all 10s;
    opacity: 1;
  }
}
.focus-item {
  border-radius: 10px;
  color: white;
  margin: 4px;
  font-size: 50px;
  font-weight: bold;
  height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 60px;
  }
  &.current {
    color: white;
  }
  &:focus {
    outline: 2px;
    outline-style: none;
  }
  transition: 0.2s ease-out 0.1s;
}
.focus-test {
  background: rgb(255, 200, 200);
  &.current {
    background: #e74c3c;
  }
  &:focus {
    outline-color: #e74c3c;
  }
}
.focus-code {
  background: rgb(200, 255, 200);
  &.current {
    background: #16a085;
  }
  &:focus {
    outline-color: #16a085;
  }
}
.focus-refactoring {
  background: rgb(216, 216, 255);
  &.current {
    background: #2980b9;
  }
  &:focus {
    outline-color: #2980b9;
  }
}
.zen {
  margin-top: 60px;
  font-weight: bold;
  font-size: 51px;
  color: balck;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    margin-top: 40px;
    font-size: 80px;
  }
}
.issueArea {
  text-align: center;
}
.issue {
  font-size: 38px;
  margin: 5px;
}
.tag:not(body).is-large {
  font-size: 30px;
  transition: 0.1s ease 0.1s;
  &.doing {
    height: 200px;
    background: white;
    color: #2980b9;
    animation: blinkAnimation 1s ease infinite alternate;
    transition: 0.1s ease 0.1s;
    font-size: 46px;
    font-weight: bold;
  }
}
@keyframes blinkAnimation {
  0% {
    border: 25px solid #c6e3ff;
  }
  100% {
    border: 25px solid #2980b9;
  }
}
.border-less-input {
  text-align: center;
  color: grey;
  padding: 16px;
  margin: 50px;
  font-size: 30px;
  border: none;
  border-bottom: 1px solid grey;
  background: none;
  &:focus {
    outline-style: none;
  }
}
.code-issue-fix-count {
  height: 38px;
  width: 38px;
  font-size: 20px;
  border-radius: 50%;
  text-align: center;
  border: solid;
  border-width: 3px;
  margin-left: 5px;
  font-weight: bold;
  background: #8fbde4;
  border: none;
  padding-top: 3px;
  transition: 0.1s ease 0.1s;
  &.doing {
    transition: 0.1s ease 0.1s;
    height: 50px;
    width: 50px;
    font-size: 28px;
    border-radius: 50%;
    text-align: center;
    border: solid;
    border-width: 3px;
    margin-left: 9px;
    font-weight: bold;
    background: #2a80b9;
    border: none;
    color: white;
    padding-top: 3px;
  }
}

</style>