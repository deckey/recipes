$('#recipes')
.on('show.bs.collapse', function (obj) {
  const collapse = obj.target.attributes.id.value;
  $(this).find("[name='"+ collapse +"']").addClass('glyphicon-triangle-bottom');
})
.on('hide.bs.collapse', function (obj) {
  const collapse = obj.target.attributes.id.value;
  $(this).find("[name='"+ collapse +"']").removeClass('glyphicon-triangle-bottom');
});

function validateInput(form) {
  const fields = [
    form.find("input[name='name']"),
    form.find("textarea[name='ingredients']"),
    form.find("textarea[name='description']")
  ];
  for (var field of fields){
    if (field.val() === ''){
      return false;
    }
  }
  return true;
}

// ADD RECIPE
$('#addRecipeModalForm').submit(function (e) {
  e.preventDefault();
  if (!validateInput($(this))) {
    $.alert("Recipe name, ingredients and description must be entered!", "All fields are required!")
    return;
  }
  e.currentTarget.submit();
})

// submit updated data
$('#editRecipeModalForm').submit(function (e) {
  e.preventDefault();
  if (!validateInput($(this))) {
    $.alert("Recipe name, ingredients and description must be entered!", "All fields are required!")
    return;
  }
  e.currentTarget.submit();
})

// EDIT RECIPE
// load fields data
$('.edit-recipe').click(function(){
  $('#editFormId').val($(this).data('id'));
  $('#editFormName').val($(this).data('name'));
  $('#editFormIngredients').val($(this).data('ingredients'));
  $('#editFormDescription').val($(this).data('description'));
  return;
})
// DELETING RECIPES 
$('.delete-recipe').click(function () {
  const id = $(this).data('id');
  const url = '/delete/' + id;
  if (confirm('Delete Recipe?')) {
    $.ajax({
      type: 'DELETE',
      url: url,
      success: function (result) {
        window.location.href='/';
      },
      error: function (err) {
        console.log('There was an error removing item: ', err);
      }
    })
  }
});
