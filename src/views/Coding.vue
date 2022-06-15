<template>
  <div
   class='content' 
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
          class="focus-item focus-test column" tabindex="1">
          <div>Test</div>
        </div>
        <div 
          v-bind:class="{current: this.focus === 'code'}"
          class="focus-item focus-code column" tabindex="2">
          Code
        </div>
        <div 
          v-bind:class="{current: this.focus === 'refactoring'}"
          class="focus-item focus-refactoring column" tabindex="3">
          Clean
        </div>
      </div>
      <div class="focus-tool">
        <div class="focus-tool-item" v-if="this.focus === 'test'">
          <div class="zen">
            <p>Focus Specification.</p>
          </div>
        </div>
        <div class="focus-tool-item" v-if="this.focus === 'code'" >
          <div class="zen">
            <p>Just Make It Pass.</p>
          </div>
        </div>
        <div class="focus-tool-item" v-show="this.focus === 'refactoring'" >
          <div class="zen refactoirng">
            <p>Save Knowdlege to Code.</p>
          </div>
          <div class="issueArea">
            <span v-for="issue in issues" :key="issue" class="issue tag is-info is-large">{{issue.name}}</span>
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
    descriptions:string[]
}

export default defineComponent({
  methods: {
    onFocusChange(event:any) {
      if(event.key === 'Control') {
        if(this.focus === '') {
          this.focus = 'test'
        } else if(this.focus === 'test') {
          this.focus = 'code'
        } else if(this.focus === 'code') {
          this.focus = 'refactoring'
        } else if(this.focus === 'refactoring') {
          this.focus = 'test'
        }
      } else {
        console.log("ho")

      }
    },
    onSelectIssue(event:any) {
      if(event.key === 'Control') {
        this.focus = 'test'
      }
      this.selectedIssue = this.issues.find(issue => issue.name === event.target.value)!
    },
  },
  data() {
    return {
      focus: '',
      selectedIssue: {} as Issue,
      issues: [
        {name: 'Long Method'  , descriptions: ['1つの仕事をするメソッドに分割できないか？', '分割前に別のIssueを解決したか？', '同じ抽象度を話しているか？']},
        {name: 'Big Class'    , descriptions: ['1つの仕事をするクラスに分割できないか？', '']},
        {name: 'Duplicate Code' , descriptions: ['メソッドを切り出して解決できないか？', 'クラスを切り出して解決できないか？']},
        {name: 'Temp Variable', descriptions: ['']},
        {name: 'Long Parmeters', descriptions: ['']},
        {name: 'Naming', descriptions: ['']},
        {name: 'Dead Code', descriptions: ['']},
        {name: 'Arrow', descriptions: ['']},
        {name: 'Feature Envy', descriptions: ['']},
        {name: 'Primitive Obsession', descriptions: ['']},
        {name: 'Data Clump', descriptions: ['']},
        {name: 'Violate SLAP', descriptions: ['']},
      ],
      searchWord: "",
    };
  },
});
</script>

<style lang="scss">
.columns {
  padding: 0px;
  margin: 0px
}
.content {
  padding: 10px;
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
.focus-tool-item {
  opacity: 1;
  &.current { //not work when add v-if
    transition: all 10s;
    opacity: 1;
  }
}
.focus-item {
  color: white;
  margin: 1px;
  font-size: 40px;
  font-weight: bold;
  height: 250px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 300px;
  font-weight: bold;
  font-family: serif;
  font-size: 50px;
  color: balck;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.zen.refactoring {
  height: 100%;
  font-weight: bold;
  font-family: serif;
  font-size: 20px;
  color: grey;
}
.issueArea {
  text-align: center;
}
.issue {
  font-size: 38px;
  margin: 5px;
}
</style>