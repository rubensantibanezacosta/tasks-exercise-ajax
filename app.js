$(function () {
    let edit = false;
    let idEdit = 0;
    console.log("jQuery esta funcionando");
    fecthTasks();
//BUSCAR ELEMENTOS EN LA TABLA
    $("#search").keyup(function () {
        if ($("#search").val()) {
            let search = $("#search").val();
            $.ajax({
                url: "task-search.php",
                type: "POST",
                data: {search},
                success: function (response) {
                    let tareas = JSON.parse(response);
                    template = "";

                    tareas.forEach(tarea => {
                        template += `<tr class="${tarea.id}">
                                        <td>${tarea.id}</td>
                                        <td><a href"#" class="task-item">${tarea.name}</a></td>
                                        <td>${tarea.description}</td>
                                        <td><button class="task-delete btn btn-danger"><span class="material-icons-outlined">delete</span></button></td>
                                    </tr>`;
                    });
                    $("#tasks").html(template);
                    $("#tasks").show();
                }
            });

        } else {
            fecthTasks();
        }
    });
//INSERTAR NUEVO REGISTRO
    $("#task-form").submit(function (e) {
        const postData = {
            name: $("#name").val(),
            description: $("#description").val(),
            id: $("#taskId").val()

        };
        url = "";
        if (edit === false) {
            url = "task-add.php";
        } else {
            url = "task-edit.php";
        }
        $.post(url, postData, function (response) {

            console.log(response);
            fecthTasks();
            edit = false;

            $("#task-form").trigger("reset");
        });
        e.preventDefault();
    });
    //CARGAR TODOS LOS ELEMENTOS DE LA TABLA
    function fecthTasks() {
        $.ajax({
            url: "task-list.php",
            type: "GET",
            success: function (response) {
                let tareas = JSON.parse(response);
                template = "";

                tareas.forEach(tarea => {
                    template += `<tr class="${tarea.id}">
                                    <td>${tarea.id}</td>
                                    <td><a href"#" class="task-item">${tarea.name}</a></td>
                                    <td>${tarea.description}</td>
                                    <td><button class="task-delete btn btn-danger"><span class="material-icons-outlined">delete</span></button></td>
                                </tr>`;
                });
                $("#tasks").html(template);
                $("#tasks").show();
            }
        });
    }


    //BORRAR OBJETOS DE LA TABLA
    $(document).on("click", ".task-delete", function () {
        if (confirm("Are you sure that you want to delete it?")) {
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr("class");
            $.post("task-delete.php", {id}, function (response) {
                console.log(response);
                fecthTasks();
            });
        }


    });
    //EDITAR OBJETOS DE LA TABLA
    $(document).on("click", ".task-item", function () {
        console.log("editando");
        idEdit = 0;
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr("class");
        $.post("task-single.php", {id}, function (response) {
            const tarea = JSON.parse(response);
            $("#name").val(tarea.name);
            $("#description").val(tarea.description);
            $("#taskId").val(tarea.id);
            edit = true;
            fecthTasks();
        });


    });
});