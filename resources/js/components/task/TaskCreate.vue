<template>
    <div>
        <div>
            <div class="d-flex">
            <input v-model="task_name" type="text" class="form-control">
            <div>
                <select v-model="task_priority" class="form-select">
                <option value="!">!</option>
                <option value="!!">!!!</option>
                <option value="!!!">!!!</option>
                </select>
            </div>
            <button @click="createTask" type="button" class="btn btn-outline-success">Add</button>
            <button @click="clearData" type="button" class="btn btn-outline-danger">Clear</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
           task_name:"",
           task_priority:"!",
         
        };
    },
    props:{
        tasks:Array,
        showDangerAlert:Function,
        showSuccessAlert:Function,
        closeAlert:Function,
        getTasks:Function,
    },
    methods:{
        
        clearData:function(){
            this.task_name = "";
            this.task_priority = "!";
        },
        createTask:function(){
            this.closeAlert();

            let showDangerAlert = this.showDangerAlert;
            let showSuccessAlert = this.showSuccessAlert;
            
            let data = {
                'name':this.task_name,
                'priority':this.task_priority,
            };
            //call api to create task
            axios.post("/api/tasks",data)
            .then((response)=>{
                //to update array of tasks
                this.getTasks();
                //this.tasks.unshift(response.data);
                showSuccessAlert("The task wad added");
                
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