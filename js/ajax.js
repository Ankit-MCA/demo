
// validation add
jQuery(document).ready(function () {
  $('#user_form').validate({ // initialize the plugin
      rules: {
          name: {
              required: true,
          },
          designation: {
            required: true,
          },
          email: {
              required: true,
          },
          salary: {
              required: true,
          },
          date: {
              required: true,
          },
          
      },
      messages: {
          name: {
              required: "name is required ",
          },
          designation: {
              required: "designation field is required",
          },
          email: {
              required: "email field is required",
          },
          salary: {
              required: "salary field is required",
          },
          date:{
            required: "date field is required",
          }      
      },
      submitHandler: function(form) {
          form.submit();
        }
  });
$(document).on('click','#btn-add',function(e) {
  e.preventDefault();
  var data = $("#user_form").serialize();
  $.ajax({
    data: data,
    type: "post",
    url: "backend/save.php",
    success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode==200){
          $('#addEmployeeModal').modal('hide');
          swal({
            title: "success",
            text: "Data Add successfully",
            icon: "success",
            buttons: true,
            timer: 2000,
        }) 
          location.reload();						
        }
        else if(dataResult.statusCode==201){
           swal(dataResult);
        }
    }
  });
});
});
// validation edit
jQuery(document).ready(function () {
  $('#update_form').validate({ // initialize the plugin
      rules: {
          name: {
              required: true,
          },
          designation: {
            required: true,
          },
          email: {
              required: true,
          },
          salary: {
              required: true,
          },
          date: {
              required: true,
          },
          
      },
      messages: {
          name: {
              required: "name is required ",
          },
          designation: {
              required: "designation field is required",
          },
          email: {
              required: "email field is required",
          },
          salary: {
              required: "salary field is required",
          },
          date:{
            required: "date field is required",
          }      
      },
      submitHandler: function(form) {
          form.submit();
        }
  });
$(document).on('click','.update',function(e) {
  e.preventDefault();
  var id=$(this).attr("data-id");
  var name=$(this).attr("data-name");
  var email=$(this).attr("data-email");
  var designation=$(this).attr("data-designation");
  var salary=$(this).attr("data-salary");
  var date=$(this).attr("data-date");
  $('#id_u').val(id);
  $('#name_u').val(name);
  $('#email_u').val(email);
  $('#designation_u').val(designation);
  $('#salary_u').val(salary);
  $('#date_u').val(date);
});

$(document).on('click','#update',function(e) {
  var data = $("#update_form").serialize();
  $.ajax({
    data: data,
    type: "post",
    url: "backend/save.php",
    success: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        swal({
          title: "success",
          text: "Data updated successfully",
          icon: "success",
          buttons: true,
          timer: 3000,
      })
        if(dataResult.statusCode==200){
          $('#editEmployeeModal').modal('hide');
          location.reload();						
      }
        else if(dataResult.statusCode==201){
           swal(dataResult);
        }
    }
  });
});
});
$(document).on("click", ".delete", function() { 
  var id=$(this).attr("data-id");
  $('#id_d').val(id);
  
});
$(document).on("click", "#delete", function() { 
  $.ajax({
    url: "backend/save.php",
    type: "POST",
    cache: false,
    data:{
      type:3,
      id: $("#id_d").val()
    },
    success: function(dataResult){
        $('#deleteEmployeeModal').modal('hide');
        $("#"+dataResult).remove();
    
    }
  });
});
$(document).on("click", "#delete_multiple", function() {
  var user = [];
  $(".user_checkbox:checked").each(function() {
    user.push($(this).data('user-id'));
  });
  if(user.length <=0) {
    swal({
      icon: 'error',
      title: 'Oops...',
      text: 'Please select records!',
      timer: 2000,
    }) 
  } 
  else { 
    WRN_PROFILE_DELETE = "Are you sure you want to delete "+(user.length>1?"these":"this")+" row?";
    var checked = confirm(WRN_PROFILE_DELETE);
    if(checked == true) {
      var selected_values = user.join(",");
      console.log(selected_values);
      $.ajax({
        type: "POST",
        url: "backend/save.php",
        cache:false,
        data:{
          type: 4,						
          id : selected_values
        },
        success: function(response) {
          swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'error',
            timer: 1000,
          })
          var ids = response.split(",");
          for (var i=0; i < ids.length; i++ ) {	
            $("#"+ids[i]).remove(); 
          }	
        } 
      }); 
    }  
  } 
});
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function(){
    if(this.checked){
      checkbox.each(function(){
        this.checked = true;                        
      });
    } else{
      checkbox.each(function(){
        this.checked = false;                        
      });
    } 
  });
  checkbox.click(function(){
    if(!this.checked){
      $("#selectAll").prop("checked", false);
    }
  });
});