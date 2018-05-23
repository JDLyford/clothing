$(document).ready(function() {
    //Container to hold all pieces
    var clothingContainer = $(".clothing-container");
    var categorySelect = $("#category");

    $(document).on("click", "button.delete", clothingDelete);
    $(document).on("click", "button.edit", clothingEdit);
    categorySelect.on("change", categoryChange);
    var clothing;

    function getClothing(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/clothing" + categoryString, function(data) {
            console.log("Clothing", data);
            clothing = data;
            if (!clothing || !clothing.length) {
                displayNone();
            }
            else {
                initialize();
            }
        });
    }

    function deleteClothing(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/clothing/" + id
        })
            .then(function() {
                getClothing(categorySelect.val());
            });
    }

    getClothing();

    function initialize() {
        clothingContainer.empty();
        var clothingAdd = [];
        for (var i = 0; i < clothing.length; i++) {
            clothingAdd.push(newRow(clothing[i]));
        }
        clothingContainer.append(clothingAdd);
    }

    function newRow(clothing) {
        // Refer to blog.js and change to match html
        return newClothing;
    }

    function clothingDelete() {
        var thisClothing = $(this)
            .parent()
            .parent()
            .data("clothing");
        // Change cms to whatever the new js filename is
        window.location.href = "/cms?clothing_id" + thisClothing.id;
    }

    function displayNone() {
        clothingContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({
            "text-align": "center",
            "margin-top": "50px"
        });
        messageH2.html("No clothing for this category, navigate <a href='/cms'>here</a> to add a new piece.");
        clothingContainer.append(messageH2);
    }

    function categoryChange() {
        var newCategory = $(this).val();
        getClothing(newCategory);
    }

})