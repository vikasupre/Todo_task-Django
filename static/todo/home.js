$(document).ready(function () {
    $(".taskdone").click(function () {
        let todoId = $(this).attr('data-id')
        url = 'mark-as-done/' + todoId,
            $.get(url, function (data, status) {
                let mydata = data.task
                if (status == 'success') {
                    $('#todo' + todoId).remove()

                    output = '<div class="card m-1" id="unmark' + mydata.id + '">' +
                        '<div class="card-body p-2">' + '<span class="h5">' + mydata.task + '</span>' +
                        '<span class="float-end">' +
                        '<button class="btn btn-sm btn-warning taskundone" data-id="' + mydata.id + '"><i class="bi bi-x"></i>Undone</button> ' +
                        '<button class="btn btn-sm btn-danger del" data-id="' + mydata.id + '"><i class="bi bi-trash-fill"></i></button>' +
                        '</span> </div></div>'
                    $('#task_complete').prepend(output)
                    console.log('output', $('#task_complete').html())
                }
            })
    })

    $('.taskundone').click(function () {
        let todoId = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: "mark-as-undone/" + todoId,
            success: function (data, status) {
                let mydata = data.task
                if (status == 'success') {
                    $('#unmark' + todoId).remove()
                    output = '<div class="card m-2 " id="todo' + mydata.id + '">' +
                        '<div class="card-body p-2">' + '<span class="h5">' + mydata.task + '</span>' +
                        '<span class="float-end">' +
                        '<button type="button" class="btn btn-sm btn-success taskdone" data-id="' + mydata.id + '"><i class="bi bi-check"></i>Done</button> ' +
                        '<a href="edit-task/' + mydata.id + '"class="btn btn-sm btn-primary" ><i class="bi bi-pencil-fill"></i></a> ' +
                        '<button type="button" class="btn btn-sm btn-danger" data-bs-target="#deletetask' + mydata.id + '" data-bs-toggle="modal">' +
                        '<i class="bi bi-trash-fill"></i></button>' +
                        '</span>' +
                        '</div></div>' +
                        // modal
                        '<div class="modal fade" id="deletetask' + mydata.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                        '<div div class="modal-dialog" >' +
                        '<div class="modal-content">' +
                        '<div class="modal-header">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
                        '<div class="modal-body">' +
                        '<b>Are you sure you want to delete this task ?</b></div>' +
                        '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                        '<a href="delete-task/' + mydata.id + '" class="btn btn-danger" > Delete</a > ' +
                        '</div></div ></div></div >'
                    $(".todotask").prepend(output)
                    console.log($(".todotask").html())
                }
            }
        })
    })

    $('#myform').submit(function (event) {
        event.preventDefault()
        let newtask = $("#newtask").val()
        let csrf = $("input[name=csrfmiddlewaretoken]").val()
        let data = { 'task': newtask, csrfmiddlewaretoken: csrf }
        $.ajax({
            type: 'POST',
            url: 'addtask/',
            data: data,
            success: function (data, status) {
                console.log('new task aded')
                let mydata = data.task
                $('#myform')[0].reset()
                output = '<div class="card m-2 " id="todo' + mydata.id +
                    '"><div class="card-body p-2">' + '<span class="h5">' + mydata.task + '</span>' +
                    '<span class="float-end">' +
                    '<button type="button" class="btn btn-sm btn-success taskdone" data-id="' + mydata.id +
                    '"><i class="bi bi-check"></i>Done</button> ' +
                    '<a href="edit-task/' + mydata.id + '"class="btn btn-sm btn-primary" >' +
                    '<i class="bi bi-pencil-fill"></i></a> ' +
                    '<button type="button" class="btn btn-sm btn-danger" data-bs-target="#deletetask' + mydata.id + '" data-bs-toggle="modal">' +
                    '<i class="bi bi-trash-fill"></i></button> </span>' + '</div> </div>' +
                    // modal
                    '<div class="modal fade" id="deletetask' + mydata.id + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                    '<div div class="modal-dialog" >' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
                    '<div class="modal-body">' +
                    '<b>Are you sure you want to delete this task ?</b></div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
                    '<a href="delete-task/' + mydata.id + '" class="btn btn-danger" > Delete</a > ' +
                    '</div></div ></div></div >'
                $(".todotask").prepend(output)
                return false;  // Prevent the default form submission behavior
            }
        })
    })

    $(".del").click(function () {
        let todoId = $(this).attr('data-id')
        url = 'delete-complated-task/' + todoId
        $.get(url, function (data, status) {
            if (status = 'success') { $('#unmark' + todoId).remove() }

        })
    })
})
