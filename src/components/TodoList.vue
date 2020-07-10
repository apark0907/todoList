<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
    <v-container style="max-width: 500px">
        
        <h2 class="display-1 success--text pl-4">
            Tasks:&nbsp;
            <v-fade-transition leave-absolute="leave-absolute">
                <span>
                    {{ propsdata.length }}
                </span>
            </v-fade-transition>
        </h2>
        <v-divider class="mt-4"></v-divider>
        
        <v-row class="my-1" align="center">
            <strong class="mx-4 info--text text--darken-2">
                Remaining:
                {{ remainingTasks }}
            </strong>
            <v-divider vertical="vertical"></v-divider>
            <strong class="mx-4 success--text text--darken-2">
                Completed:
                {{ completedTasks }}
            </strong>           
            <v-spacer></v-spacer>
            <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
        </v-row>        
        <v-card>            
            <v-list>
                <v-list-item-group
                    class="px-0"
                    v-for="(todoItem, index) in propsdata"
                    :key="index">
                    <!-- <v-card id="container"> -->
                        <!-- v-if='dueColor(index)' -->
                        <!-- <v-dialog v-model="dialog" persistent max-width="600px"> -->
                        <v-list-item :class="dueColor(index) <= 0 ? 'over-day' : 'meet-day'" v-bind="attrs" v-on="on">
                            <v-checkbox v-model="todoItem.done" class="mx-2"></v-checkbox>
                            <v-row no-gutters="no-gutters">
                                <v-col :cols="2">
                                    <v-list-item-content class="color_about_due">
                                        <v-list-item-title v-text="todoItem.todoItem"> </v-list-item-title>
                                        <v-list-item-subtitle >{{todoItem.description}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-col>
                                <v-col :cols="5" style="line-height: 40px">
                                    {{date(index)}}&nbsp;
                                </v-col>
                                <v-col :cols="2" >
                                    <h4 style="line-height: 40px" :class="todoItem.done && 'success--text' || 'red--text'">
                                        Due:
                                        {{due(index)}}
                                    </h4>
                                </v-col>
                                <v-col style="line-height: 30px" md="auto" id="suc_col" >
                                    <v-scroll-x-transition>
                                        <v-icon v-if="todoItem.done" color="success">
                                            check
                                        </v-icon>
                                    </v-scroll-x-transition>
                                </v-col>
                                <!-- <v-divider vertical="vertical"></v-divider> -->
                                <v-spacer></v-spacer>
                                <v-col md="auto">
                                    <span class="removeBtn" type="button" @mouseup="removelist(todoItem, index)">
                                        <i class="far fa-trash-alt" aria-hidden="true"></i>
                                    </span>
                                </v-col>
                            </v-row>
                        </v-list-item>
                        <!-- </v-dialog> -->
                    <!-- </v-card> -->
                </v-list-item-group>
            </v-list>
        </v-card>
        <!-- <transition-group name="list"> <li v-for="(todoItem, index) in propsdata"
        :key="todoItem"> <v-divider class="mb-4"></v-divider> <v-list-item
        class="v-list-item"> <v-list-item-content class="v_list_item_content">
        <v-list-item-title white-space:nowrap>{{todoItem.todoItem}}</v-list-item-title>
        <v-list-item-subtitle>{{todoItem.description}}</v-list-item-subtitle>
        </v-list-item-content> <span class="removeBtn" type="button"
        @click="removelist(todoItem, index)"> <i class="far fa-trash-alt"
        aria-hidden="true"></i> </span> </v-list-item> </li> </transition-group> -->
        <!-- <v-divider class="mb-4"></v-divider> -->
    </v-container>
    </template>
    <v-card>
        
        <v-card-title>
          <span class="headline">세부 정보</span>
        </v-card-title>
        <TodoInput v-on:addTodo="addTodo"></TodoInput>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <!-- <v-btn color="blue darken-1" text @click="addTodo">Save</v-btn> -->
        </v-card-actions>
        <v-card-text>
          <small>*indicates required field</small>
        </v-card-text>
        
      </v-card>
  </v-dialog>
</template>

<script>
    import updatePopup from './updatePopup.vue'
    import TodoInput from './TodoInput.vue'
    export default {
      data: () => ({
        dialog: false,
      }),
        components: {
            updatePopup: 'updatePopup',
            TodoInput: 'TodoInput'
        },
        props: ['propsdata'],
        methods: {
          addTodo(va, descrip, done,startDate,endDate) {
        console.log("detail-push");
        this.$emit('addTodo', va, descrip, done,startDate,endDate);
      },
            removelist(todoItem, index) {
                this.$emit('remove', todoItem, index);
                console.log("delete");
            },
            onListTileItemClick(todoClickItem, index) {
                console.log("click" + index);
                if (this.propsdata[index].done == false) 
                    this
                        .propsdata[index]
                        .done = true;
                else 
                    this
                        .propsdata[index]
                        .done = false;
                }
            ,
            date(index) {
                var a = "";
                a += this
                    .propsdata[index]
                    .startDate
                    .startYear + ":";
                a += this
                    .propsdata[index]
                    .startDate
                    .startMonth + ":";
                a += this
                    .propsdata[index]
                    .startDate
                    .startDay + "~";
                a += this
                    .propsdata[index]
                    .endDate
                    .endYear + ":";
                a += this
                    .propsdata[index]
                    .endDate
                    .endMonth + ":";
                a += this
                    .propsdata[index]
                    .endDate
                    .endDay;
                return a;
            },
            due(index) {
                var moment = require('moment');

                var date1 = moment([
                    this
                        .propsdata[index]
                        .startDate
                        .startYear,
                    this
                        .propsdata[index]
                        .startDate
                        .startMonth - 1,
                    this
                        .propsdata[index]
                        .startDate
                        .startDay
                ]);
                var date2 = moment([
                    this
                        .propsdata[index]
                        .endDate
                        .endYear,
                    this
                        .propsdata[index]
                        .endDate
                        .endMonth - 1,
                    this
                        .propsdata[index]
                        .endDate
                        .endDay
                ]);
                // console.log([this.startYear,this.startMonth,this.startday]);
                if (date2.diff(date1, 'days') < 0) {
                    //red  console.dir("<0" + document.getElementById("container"));
                } else if (date2.diff(date1, 'days') < 1) {} else if (date2.diff(date1, 'days') < 3) {}

                return date2.diff(date1, 'days');
            },
            dueColor(index) {
                if (this.due(index) < 0) {
                    return 0;
                }
                return 1;
            }
        },
        computed: {
            completedTasks() {
                return this
                    .propsdata
                    .filter(task => task.done === true)
                    .length
            },
            progress() {
                return this.completedTasks / this.propsdata.length * 100
            },
            remainingTasks() {
                return this.propsdata.length - this.completedTasks
            }
        }
    }
</script>

<style scoped="scoped">
    #list-v-divider {
        margin-right: 5px;
    }
    .v-list-item,
    .v_list_item_content {
        padding: 0;
        margin-top: 0;
        margin-bottom: 0;
    }
    li {
        list-style: none;
        height: wrap-content;
    }
    .bodylist {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
    }
    #suc_col {
        margin-right: 15px;
    }
    .over-day {
        background-color: palevioletred;
    }
    .meet-day {
        background-color: white;
    }
</style>