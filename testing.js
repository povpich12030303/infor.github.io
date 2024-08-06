$(document).ready(function () {
  updateRemaining();

  $("label").addClass("hidden");
  //keypress
  $("#new-task").on("keypress", function (event) {
    const key = event.key;
    if (!/^[a-zA-Z\s]*$/.test(key)) {
      event.preventDefault();
    }
  });

  $("#new-task").on("input", function () {
    this.value = this.value.replace(/\s{1,}/g, " ");
  });

  // Add a new task
  $("#add-task").click(function () {
    var taskText = $("#new-task").val().trim();
    if (!taskText) {
      Swal.fire({
        icon: "error",
        title: "Please Enter",
      });
      $("label").addClass("error");
      $("label").removeClass("hidden");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 900,
      });
      $("#task-list").append(
        "<li>" +
          '<input type="checkbox" class="task-checkbox">' +
          '<span class="task-text">' +
          taskText +
          "</span>" +
          '<input type="text" class="edit-input hidden">' +
          "<p>" +
          '<i class="edit-task fa-regular fa-pen-to-square"></i>' +
          '<i class="save-task hidden fa-solid fa-check"></i>' +
          '<i class="cancel fa-solid fa-xmark hidden"></i> ' +
          '<i class="delete-task fa-regular fa-trash-can"></i>' +
          "</p>" +
          "</li>"
      );
      $("label").addClass("hidden");

      $("#new-task").val("");
      updateRemaining();
    }
  });

  //input edit keypress
  $(document).on("keypress", ".edit-input", function (event) {
    const key = event.key;
    if (!/^[a-zA-Z\s]*$/.test(key)) {
      event.preventDefault();
    }
  });
  $(document).on("input", ".edit-input", function (event) {
    this.value = this.value.replace(/\s{1,}/g, " ");
  });

  //toggle
  $("#task-list").on("change", ".task-checkbox", function () {
    $(this).siblings(".task-text").toggleClass("completed");
    updateRemaining();
  });

  //Delete
  $("#task-list").on("click", ".delete-task", function () {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        $(this).closest("li").remove();
        updateRemaining();
      }
    });
  });

  //count number
  function updateRemaining() {
    var totalTasks = $("#task-list li").length;
    var completedTasks = $("#task-list .task-checkbox:checked").length;
    var remainingTasks = totalTasks - completedTasks;
    $("#remaining-todos span").text(remainingTasks);
  }

  ///Edit
  $(document).on("click", ".edit-task", function () {
    var listItem = $(this).closest("li");
    var taskText = listItem.find("#new-task").text();
    listItem.find("#new-task, .delete-task").addClass("hidden");
    listItem.find(".edit-input").val(taskText).removeClass("hidden").focus();
    $(this).addClass("hidden");
    listItem.find(".save-task, .cancel").removeClass("hidden");
  });

  // Save the edited task
  $(document).on("click", ".save-task", function () {
    var saved = $(".edit-input").val();
    if (!saved) {
      Swal.fire({
        icon: "error",
        title: "Please Enter New Value.",
      });
    } else {
      var listItem = $(this).closest("li");
      var newTaskText = listItem.find(".edit-input").val();
      listItem.find(".task-text").text(newTaskText).removeClass("hidden");
      listItem.find(".edit-input, .cancel").addClass("hidden");
      $(this).addClass("hidden");
      listItem.find(".edit-task, .delete-task").removeClass("hidden");
    }
    updateRemaining();
  });

  // Cancel edit
  $(document).on("click", ".cancel", function () {
    var listItem = $(this).closest("li");
    listItem.find(".edit-input, .save-task, .cancel").addClass("hidden");
    listItem.find(".edit-task, .delete-task, .task-text").removeClass("hidden");
  });
});
