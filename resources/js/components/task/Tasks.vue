<template>
<div>
    
    <div class="container">
        <div class="mt-3 mb-3">
           <Alert v-bind:closeAlert="closeAlert" v-bind:message="message" />
        </div>
    </div>
    <div class="container">
        <section class="mt-5">
            <h2>Todo App</h2>
        </section>
        <section class="mb-5 mt-5">
            <!--Add task--->
            <TaskCreate v-bind:getTasks="getTasks" v-bind:showDangerAlert="showDangerAlert"
            v-bind:showSuccessAlert="showSuccessAlert"
            v-bind:closeAlert="closeAlert"
              v-bind:tasks="tasks" />
        </section>
        <section class="text-center" v-if="tasks_loading">
            <!--Task Loading-->
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </section>
        <section>           
            <!--List of Tasks--->
            <div v-for="task in tasks" class="list-group">
               
                <label v-bind:class="{'d-flex list-group-item mb-2 text-decoration-line-through':task.done,
                'd-flex list-group-item mb-2':!task.done}">

                    <input @click="doneTask(task,false)" v-if="task.done" class="form-check-input me-1" type="checkbox"  checked>
                    <input @click="doneTask(task,true)" v-else class="form-check-input me-1" type="checkbox" >

                    <span v-bind:class="classObject(task.priority)"> {{task.name}} </span>
                 
                    <TaskDelete v-bind:showSuccessAlert="showSuccessAlert"
                    v-bind:closeAlert="closeAlert"
                     v-bind:tasks="tasks" v-bind:taskId="task.id" />

                     <div class="ms-3">
                        <!--https://forum.vuejs.org/t/passing-props-through-router-link-solved/16868-->
                        <router-link :to="{ name: 'task.update', params: {'id': task.id ,'task':task } }"
                        >Update</router-link>
                     </div>

                </label>
                
            </div>
        </section>
    </div>
</div>
</template>
<script>

import Alert from "./Alert.vue"
import TaskDelete from "./TaskDelete.vue"
import TaskCreate from "./TaskCreate.vue"
export default {
    data:function(){
        return {
            tasks:[],
            tasks_loading:true,
         
            message:{
                danger:false,
                info:false,
                success:false,
                text:"",
            }
        };
    },
    components:{
   TaskCreate,TaskDelete,Alert
    },
    computed:{
        
    },
    mounted(){
        this.getTasks();
    },
    methods:{
        
        classObject: function (priority) {
            //https://vuejs.org/v2/guide/class-and-style.html
            if (priority == "!"){
                return {
                    'text-danger': false,
                    'text-warning': false
                };
            }
            else if(priority == "!!"){
                return {
                    'text-danger': false,
                    'text-warning': true
                };
            }
            else{
                return {
                    'text-danger': true,
                    'text-warning': false
                };
            }
        },
        showDangerAlert:function(text){
            this.message.danger = true;
            this.message.info = false;
            this.message.success = false;
            this.message.text = text;
        },
        showInfoAlert:function(text){
            this.message.danger = false;
            this.message.info = true;
            this.message.success = false;
            this.message.text = text;
        },
        showSuccessAlert:function(text){
            this.message.danger = false;
            this.message.info = false;
            this.message.success = true;
            this.message.text = text;
        },
        closeAlert:function(){
            this.message.danger = false;
            this.message.info = false;
            this.message.success = false;
            this.message.text = "";
        },
        getTasks:function(){
            //call api to get tasks from the database
            axios.get("/api/tasks")
            .then((response)=>{

                this.tasks = response.data.data;
                this.tasks_loading = false;
                
            })
            .catch(function(error){
                console.log(error);
            });
        },
        doneTask:function(task,done){
            let data = {
                'done':done,
            }
            //call api to make task done
            axios.patch(`/api/tasks/${task.id}`,data)
            .then((response)=>{
                if (done){
                    task.done = 1;
                }
                else{
                    task.done = 0;
                }
                
            })
            .catch(function(error){
                console.log(error);
            });
        },
    }
}
</script>