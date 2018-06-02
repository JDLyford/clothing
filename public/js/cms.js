$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var clothingId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    clothingId = url.split("=")[1];
    clothingData(clothingId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var categorySelect = $("#category");
  // Giving the postCategorySelect a default value
  categorySelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newClothing = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      category: categorySelect.val()
    };

    console.log(newClothing);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newClothing.id = clothingId;
      updateClothing(newClothing);
    }
    else {
      submitClothing(newClothing);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitClothing(Clothing) {
    $.post("/api/top/", Clothing, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for a post if we're editing
  function clothingData(id) {
    $.get("/api/top/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        categorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateClothing(clothing) {
    $.ajax({
      method: "PUT",
      url: "/api/top",
      data: clothing
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
