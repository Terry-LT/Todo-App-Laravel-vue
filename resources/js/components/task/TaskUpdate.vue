<template>
    <div class="mt-5 container">
        <div class="mt-3 mb-3">
           <Alert v-bind:closeAlert="closeAlert" v-bind:message="message" />
        </div>
        <div>
        <form>
            <legend>Update Task Form</legend>
            <div class="mb-3">
                <input v-model="task_name" class="form-control" type="text">
            </div>
            <div class="mb-3">
                <textarea  v-model="task_body" class="form-control" cols="30" rows="10"></textarea>
            </div>
            <div class="mb-3">
                <select v-model="task_priority" class="form-select">
                    <option  value="!">!</option>
                    <option value="!!">!!</option>
                    <option  value="!!!" >!!!</option>
                </select>
            </div>
            <div class="mb-3">
                <input v-model="task_done" v-if="task.done" class="form-check-input me-1" type="checkbox" checked>
                <input v-model="task_done" v-else class="form-check-input me-1" type="checkbox">
            </div>
            <div class="mb-3">
                <button @click="updateTask" class="btn btn-success" type="button">Update</button>
                <router-link class="btn btn-secondary text-decoration-none" :to="{ name: 'app'}">Cansel</router-link>
            </div>
        </form>
        </div>
    </div>
</template>
<script>
import Alert from "./Alert.vue"

export default {
    data:function(){
        return {
            task:null,
            message:{
                danger:false,
                info:false,
                success:false,
                text:"",
            },
            task_name:"",
            task_body:"",
            task_priority:"!",
            task_done:false,
            
        };
    },
    components:{
        Alert
    },
    mounted(){
        this.getTask();
        
    },
    methods:{
        showDangerAlert:function(text){
            this.message.danger = true;
            this.message.info = false;
            this.message.success = false;
            this.message.text = text;
        },
        closeAlert:function(){
            this.message.danger = false;
            this.message.info = false;
            this.message.success = false;
            this.message.text = "";
        },
        getTask:function(){
            
            //call api to get task by id
            axios.get(`/api/tasks/${this.$route.params.id}`)
            .then((response)=>{

                this.task = response.data;

                //to set default value for inputs
                this.task_name = this.task.name;
                this.task_body = this.task.body;
                this.task_priority = this.task.priority;
                this.task_done = this.task.done;
            })
            .catch(function(error){
                console.log(error);
            });
        },
        updateTask:function(){
            this.closeAlert();
            
            let showDangerAlert = this.showDangerAlert;
            
            let data = {
                'name':this.task_name,
                'priority':this.task_priority,
                'body':this.task_body,
                'done':this.task_done,
            };
            //call api to update task
            axios.put(`/api/tasks/${this.$route.params.id}`,data)
            .then((response)=>{
                //to redirect to another route
                this.$router.push({ name: "app"});
            })
            .catch(function(error){
                
                //if error happens ,show alert danger
                if (error.response.status == 422){
                    showDangerAlert(error.response.data.errors.name[0]);
                }
                console.log(error);
            });
           
           
        }
        
    }
}
</script>