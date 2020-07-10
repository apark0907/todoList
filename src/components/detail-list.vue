<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          +
        </v-btn>
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
  </v-row>
  
</template>

<script>
import TodoInput from './TodoInput.vue'
  export default {
    data: () => ({
      dialog: false,
    }),
    components: {
    'TodoInput': TodoInput,
    },
    methods: {
      addTodo(va, descrip, done,startDate,endDate) {
        console.log("detail-push");
        this.$emit('addTodo', va, descrip, done,startDate,endDate);
      }
    }
  }
</script>