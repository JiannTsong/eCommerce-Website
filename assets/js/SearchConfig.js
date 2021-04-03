var search, results, allProduct = [];

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}
var searchInput =getQueryString("q");


//initialize the js-search config
function InitializeSearchConfig () {
  search = new JsSearch.Search('id');
  search.indexStrategy =  new JsSearch.AllSubstringsIndexStrategy();
  search.sanitizer =  new JsSearch.LowerCaseSanitizer();
  search.searchIndex = new JsSearch.UnorderedSearchIndex();

    //search target field
    search.addIndex('name');
    search.addIndex('brand');
    search.addIndex('type');

  search.addDocuments(allProduct);//add search document
};

//output whatever things pass from search function
function updateResult (products) {
  $("#result").html('');//reload the result content to empty before add new search result

  if(!(searchInput == null || searchInput == "")){
    var tokens = search.tokenizer.tokenize(searchInput);
  }

  for (let i = 0; i < products.length; i++) {

    $("#result").append('<div class="card product" style="height:30rem;">' +
                '<img src="' + products[i].img[0] + '" alt="' + products[i].name + '">' +
                '<div class="card-body">' +
                '<h6><b>' + products[i].name.substring(0, 35) + '</b></h6>' + ' RM ' + products[i].price +
                '<p class="card-text">' + products[i].desc.substring(0, 100) + '...' + '</p>' +
                '<a href="' + './product.html?id=' + products[i].id + '" class="btn btn-info" target="_blank">View More</a>' +
                '</div></div>');
  }
};

//execute the search and update result.
function searchExecute () {
  results = search.search(searchInput);//execute search

  if (results.length > 0) {
    updateResult(results);
  } else if(!results.length > 0){
    $("#result").html("<h2>No result found.</h2>");
  } else {
    updateResult(allProduct);
  }
};

/*
//get json file
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var json = JSON.parse(xmlhttp.responseText);
    allProduct = json.product;
    InitializeSearchConfig();
    updateResult(allProduct);

    if(!(searchInput == null || searchInput == "")){
      $("#search").val(searchInput);
      searchExecute();
    }
    
  }
}
xmlhttp.open('GET', './assets/json/product.json', true);
xmlhttp.send();
*/

    allProduct = product;
    InitializeSearchConfig();
    updateResult(allProduct);

    if(!(searchInput == null || searchInput == "")){
      $("#search").val(searchInput.replace("+", " "));
      searchExecute();
}