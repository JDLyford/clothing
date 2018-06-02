var topImg = "https://image-billioncreation.netdna-ssl.com/wp-content/uploads/2017/04/AARONKAIPOCKETTEE-PARENT__2-100x100.jpg";

$(document).ready(function() {
  // blogContainer holds all of our posts
  var clothingContainer = $(".clothing-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;
  var bottoms;

  

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/top" + categoryString, function(data) {
      console.log("Tops", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
        console.log("initialized rows")
      }
    })
    $.get("/api/bottom" + categoryString, function (data) {
      console.log("Bottoms", data);
      bottoms = data;
      console.log(bottoms.link)
    })
    //
    //
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/top/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    clothingContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    clothingContainer.append(postsToAdd);
  }



  // This function constructs a post's HTML
  function createNewRow(outfit) {
    //Initial div
    var newOutfitCard = $("<div>");
    newOutfitCard.addClass("card");
    newOutfitCard.css({
      height: "auto",
    });
    //Initial div heading
    var newOutfitCardHeading = $("<div>");
    newOutfitCardHeading.addClass("card-header");
    //Delete Button
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-secondary");
    //Edit Button
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    //Post Layout Title/Date/Category
    var newOutfitTitle = $("<h2>");
    var newOutfitDate = $("<small>");
    var newOutfitCategory = $("<h5>");
    newOutfitCategory.text(outfit.category);
    newOutfitCategory.css({
      float: "right",
      "font-weight": "700",
    });
    //Post Layout Body
    var newTopCardBody = $("<div>");
    newTopCardBody.addClass("top-body");
    //Want to edit the src to the link in the table
    var newTopBody = $('<img id="topImg" src="#">');
    //
    newTopBody.attr('src', outfit.link);
    //
    newOutfitTitle.text(outfit.title + " ");
    newTopBody.text(outfit.body);
    //Bottom Img Body
    var newBottomCardBody = $("<div>");
    newBottomCardBody.addClass("bottom-body");
    var newBottomBody = $('<img src="https://image-billioncreation.netdna-ssl.com/wp-content/uploads/2017/04/AARONKAIPOCKETTEE-PARENT__2-100x100.jpg" class="card" width="100px">');
    //
    newBottomBody.attr('src', outfit.link2);
    newOutfitTitle.text(outfit.title + " ");
    newBottomBody.text(outfit.body);
    //Post Date setup variable and format
    //
    var formattedDate = new Date(outfit.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newOutfitDate.text(formattedDate);
    //Appending Information to Layouts
          //Not using Date atm
          /* newOutfitTitle.append(newOutfitDate); */
    newOutfitCardHeading.append(deleteBtn);
    newOutfitCardHeading.append(editBtn);
          //Do not need to display Part/Title nor Category due to being in dropdown
          /* newOutfitCardHeading.append(newOutfitTitle); */
          newOutfitCardHeading.append(newOutfitCategory);
    newTopCardBody.append(newTopBody);
    newOutfitCard.append(newOutfitCardHeading);
    newOutfitCard.append(newTopCardBody);
    //bottom append
    newBottomCardBody.append(newBottomBody);
    newOutfitCard.append(newBottomCardBody);
    newOutfitCard.data("outfit", outfit);
    //Returns the new card to page
    return newOutfitCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
      console.log($(this)+"deleted")
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("outfit");
      console.log($(this)+"--------------------------------------------------------------------------")
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    clothingContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
    clothingContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    console.log($(this).val());
    getPosts(newPostCategory);
  }

});

  /* function bottoms() {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/bottom" + categoryString, function (data) {
      console.log("Bottoms", data);
      var bottoms = data;
      console.log(bottoms + " Inside get");
      return bottoms;
    });
  }
  bottoms(); */