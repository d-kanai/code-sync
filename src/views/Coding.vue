<template>
  <div class='content'>
    <div>
      <div class="focus-panel columns is-mobile">
        <div 
          @keydown.space="(e) => onFocusChange(e, 'test')"
          v-bind:class="{current: this.focus === 'test'}"
          class="focus-item focus-test column" tabindex="1">
          <div>Test</div>
        </div>
        <div 
          @keydown.space="(e) => onFocusChange(e, 'code')" 
          v-bind:class="{current: this.focus === 'code'}"
          class="focus-item focus-code column" tabindex="2">
          Code
        </div>
        <div 
          @keydown.space="(e) => onFocusChange(e, 'refactoring')" 
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
        <div class="focus-tool-item" v-if="this.focus === 'refactoring'" >
          <div class="zen refactoirng">
            <p>Make It Clean. Save Knowdlege to Code.</p>
          </div>
          <div class="issue">
            <input @keydown.enter="onSelectIssue" type="text" name="yourarea" autocomplete="on" list="tokyo" class="issueSearch" placeholder="Code Issue" />
            <datalist id="tokyo">
              <option v-for="issue in issues" :key="issue" :value="issue.name"/>
            </datalist>
            <br/>
            <br/>
            <div class="pabel-block">
              <h1>{{this.selectedIssue.name}}</h1>
              <p v-for="description in selectedIssue.descriptions" :key="description" class="description">{{description}}</p>
            </div>
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
    onFocusChange(event:any, focus:string) {
      this.focus = focus
    },
    onSelectIssue(event:any) {
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
        {name: 'Duplicate Code'    , descriptions: ['メソッドを切り出して解決できないか？', 'クラスを切り出して解決できないか？']},
        {name: 'Temp Variable', descriptions: ['不要な変数ではないか？']},
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
  margin: 10px;
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
  font-size: 30px;
  font-weight: bold;
  height: 200px;
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
    outline-style: solid;
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
  color: grey;
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
.issue {
  text-align: center;
}
.issueSearch {
  font-size: 30px;

}
.description {
  font-size: 25px;

}
</style>