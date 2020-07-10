<template>
    <v-app id="app">
      <updatePopup ></updatePopup>
      <TodoHeader></TodoHeader>
      <!-- <TodoInput v-on:addTodo="addTodo" @click='click'></TodoInput> -->
      <TodoList v-bind:propsdata='todoItems' @remove="removeTodo" v-on:addTodo="addTodo"></TodoList>  
      <detailList v-on:addTodo="addTodo"></detailList>
      <!-- <Calender></Calender> -->
      
      <!-- <TodoFooter></TodoFooter> -->
      
    </v-app>
</template> 

<script>
import updatePopup from './components/updatePopup.vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import list from './components/list.vue'
import detailList from './components/detail-list.vue'


export default {
    data(){
      return{
        todoItems:[],
        // description:[]
      }
    },
    methods: {
      addTodo(todoItem,description,done,startDate,endDate) {
        console.log("??");
        var object = {todoItem: todoItem ,description: description ,done:done, startDate: startDate, endDate: endDate};
        localStorage.setItem(todoItem,JSON.stringify(object));
        this.todoItems.push({todoItem: todoItem ,description: description ,done:done, startDate: startDate, endDate: endDate});
      },
      removeTodo(todoItem,index) {
        localStorage.removeItem(todoItem.todoItem);
        this.todoItems.splice(index,1);
        console.log(todoItem);
      },
      removeTodo(todoItem,index) {
        localStorage.removeItem(todoItem.todoItem);
        this.todoItems.splice(index,1);
        console.log(todoItem);
      },
      click(){
      
      }
    },
    created() {
      var currentTime = new Date();
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          if(localStorage.key(i)=="loglevel:webpack-dev-server")continue;
          var x=localStorage.key(i);
          var y=JSON.parse(localStorage.getItem(x));
          console.log("y=",y);
          // var startDate=JSON.parse(y.startDate);
          // var endDate=JSON.parse(y.endDate);
          
          this.todoItems.push(y);
        }
      }
    },
    components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
    'list': list,
    'detailList': detailList,
    'updatePopup': updatePopup,
  }
}
</script>

<style scoped>
  body{
      text-align: center;
      background-color: powderblue;
  }
  input{
    border-style: groove;
    width: 200px;
  }
  button{
    border-style: groove;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
  }
</style>