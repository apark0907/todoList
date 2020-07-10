<template>

    <v-container style="max-width: 500px" class="inputBox shadow">
        
        <br>
        {{init}}
        <v-row>
            
            <h5 style="line-height: 40px" class="display- success--text pl-4">
                Start:&nbsp;
            </h5>
            <v-col md="auto">
            <!-- <div class="text-center"> -->
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on"  class="px-0">
                            {{getStartYear}}년
                        </v-btn>
                    </template>
                    <v-list  class="Year_list">
                        <v-list-item v-for="(item, index) in 90" :key="index" @mousedown="clickStartYear(cur_year+item)">
                            <v-list-item-title>{{cur_year+item}}년</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            <!-- </div> -->
            </v-col>
            <v-col md="auto">
            <!-- <div > -->
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on"  >
                            {{getStartMonth}}월
                        </v-btn>
                    </template>
                    <v-list  class="Year_list">
                        <v-list-item v-for="(item, index) in 12" :key="index" @mousedown="clickStartMonth(item)">
                            <v-list-item-title>{{item}}월</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                
            <!-- </div> -->
            </v-col>
            <v-col md="auto">
            <!-- <div class="text-center"> -->
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                            {{getStartDay}}일
                        </v-btn>
                    </template>
                    <v-list class="Year_list">        
                        <span v-bind:month=tw></span>
                        <v-list-item v-for="(item, index) in cal_day" :key="index" @mousedown="clickStartDay(item)">
                            <v-list-item-title>{{item}}일</v-list-item-title>
                        </v-list-item>         
                    </v-list>
                </v-menu>
            <!-- </div> -->
            </v-col>
            
            <v-spacer></v-spacer>
            <h5 style="line-height: 40px" class="display- error--text">
                Due:&nbsp;
                
            </h5>
            <v-col md="auto">
            <div class="text-center">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" class="px-0">
                            {{getEndYear}}년
                        </v-btn>
                    </template>
                    <v-list  class="Year_list">
                        <v-list-item v-for="(item, index) in 90" :key="index" @mousedown="clickEndYear(cur_year+item)">
                            <v-list-item-title>{{cur_year+item}}년</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            </v-col>
            <v-col md="auto">
            <div class="text-center">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                            {{getEndMonth}}월
                        </v-btn>
                    </template>
                    <v-list  class="Year_list">
                        <v-list-item-content v-for="(item, index) in 12" :key="index" @mousedown="clickEndMonth(item)">
                            <v-list-item-title>{{item}}월</v-list-item-title>
                        </v-list-item-content>
                    </v-list>
                </v-menu>
            </div>
            </v-col>
            <v-col md="auto">
            <div class="text-center">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on">
                            {{getEndDay}}일
                        </v-btn>
                    </template>
                    <v-list class="Year_list">        
                        <span v-bind:month=tw></span>
                        <v-list-item v-for="(item, index) in cal_day_end" :key="index" @mousedown="clickEndDay(item)">
                            <v-list-item-title>{{item}}일</v-list-item-title>
                        </v-list-item>         
                    </v-list>
                </v-menu>
            </div>
            </v-col>
         
        <v-col sm="12">
         <v-text-field
          required="required"
          label="할일을 입력하세요*"
          v-model="newTodoItem"
          hide-details="auto"
          v-on:keyup.enter="addlist_title"></v-text-field>
        </v-col>
        <v-col sm="12">
         <v-text-field
            label="부연 설명을 입력하세요"
            v-model="description"
            hide-details="auto"
            v-on:keyup.enter="addlist_title">
          </v-text-field>
        </v-col>
      </v-row>
      
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
        <v-card-text>
          <small>*indicates required field</small>
        </v-card-text> -->
    </v-container>    
</template>

<script>
    export default {
        name: 'TodoInput',
        
        data() {
            return {
              dialog: false,
                newTodoItem: '', description: '',dayOfMonth:[0,31,28,31,30,31,30,31,31,30,31,30,31], tw:12,
                startYear: 0,startMonth: 0,startDay: 0,endYear: 0,endMonth: 0,endDay: 0
            }
                
        },
        computed: {
            
            cur_year() {
                var currentTime = new Date();
                var curYear = 1900+currentTime.getYear()
                // this.startYear=curYear
                // this.endYear=curYear
                return curYear
            }, 
            cur_mon() {
                var currentTime = new Date();
                var curMonth = currentTime.getMonth()+1
                // this.startMonth=curMonth
                // this.endMonth=curMonth
                return currentTime.getMonth()+1
            },
            cur_day() {
                var currentTime = new Date();
                var curDay = currentTime.getDate()
                // this.startDay=curDay
                // this.endDay=curDay
                return currentTime.getDate()
            },
            cal_day(){
                return this.dayOfMonth[this.getStartMonth]
            },
            cal_day_end(){
                return this.dayOfMonth[this.getEndMonth]
            },
            getStartYear(){
                return this.startYear;
            },
            getStartMonth(){
                return this.startMonth;
            },
            getStartDay(){
                return this.startDay;
            },
            getEndYear(){
                return this.endYear;
            },
            getEndMonth(){
                return this.endMonth;
            },
            getEndDay(){
                return this.endDay;
            },
            init(){
                var currentTime = new Date();
                var curYear = 1900+currentTime.getYear()
                var curMonth = currentTime.getMonth()+1
                var curDay = currentTime.getDate()
                this.startYear=curYear
                this.endYear=curYear
                this.startMonth=curMonth
                this.endMonth=curMonth
                this.startDay=curDay
                this.endDay=curDay
            },
            
        },

        methods: {
            
            addlist_title() {
             //   init();
                if (this.newTodoItem !== "") {
                    var va = this.newTodoItem && this
                        .newTodoItem
                        .trim();
                    var descrip = this.description && this
                        .description
                        .trim();
                    var startDate={startYear :this.startYear ,startMonth :this.startMonth ,startDay :this.startDay};
                    var endDate={endYear :this.endYear ,endMonth :this.endMonth ,endDay :this.endDay};
                    var done = false;
                    this.$emit('addTodo', va, descrip, done,startDate,endDate);
                    this.newTodoItem = "";
                    this.description = "";
                } else {
                    alert("할 일을 입력하세요.");
                }
            },
            clickStartYear(selectedStartYear){
                this.startYear=selectedStartYear;
            },
            clickStartMonth(month){
                this.startMonth=month;
                if(this.startMonth==4||this.startMonth==6||this.startMonth==9||this.startMonth==11){
                    if(this.startDay==31)this.startDay=30;    
                }
                else if(this.startMonth==2 && this.startDay>=29){
                    this.startDay=28;
                }
            },
            clickStartDay(day){
                this.startDay=day;
            },
            clickEndYear(selectedStartYear){
                this.endYear=selectedStartYear;
            },
            clickEndMonth(month){
                this.endMonth=month;
                if(this.endMonth==4||this.endMonth==6||this.endMonth==9||this.endMonth==11){
                    if(this.endDay==31)this.endDay=30;    
                }
                else if(this.endMonth==2 && this.endDay>=29){
                    this.endDay=28;
                }
            },
            clickEndDay(day){
                this.endDay=day;
            },

        }
        
    }
    
</script>

<style scoped="scoped">
    * {
        text-align: center;
    }
    .inputBox {
        margin-left: auto;
        margin-right: auto;

    }
    .Year_list{
        height: 200px;
        overflow:hidden; overflow-y:scroll;
    }
    .col{
        padding: 1px;
    }
    .btn{
        padding: 1px;
        
    }
    h5{
        vertical-align: middle;
    }
</style>