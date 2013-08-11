$(document).ready(function() {

  function addItemRow(item) {
    var $new_row = $('.item').first().clone();
    $new_row.find('td').eq(0).text(item.id);
    $new_row.find('td').eq(1).text(item.name);
    $new_row.find('td').eq(2).text(item.position);
    $new_row.attr('id', 'id_' + item.id);
    $('.sortable-list').append($new_row);
  }

  function updateList(self) {
    var sorted = $(self).sortable( "serialize");

    var jqxhr = $.ajax({
      type: "PUT",
      url: "/update_all",
      dataType: "json",
      data: sorted });

    jqxhr.done(function(data) {
      console.log(data);
      refreshTable(data);
    });

    jqxhr.error(function(data) {
      console.log('error');
    });
  }

  function refreshTable(data) {
    $('.sortable-list').children().remove();
    // debugger;
    for(var i=0; i < data.length; i++) {
      addItemRow(data[i].item);
    }
  }

  $('#add-item').click(function(event) {
    event.preventDefault();
    var $entry_form = $('#item-template form').clone();
    $entry_form.show();
    $('#table-list').after($entry_form);
  });

  $('.container').on('submit', 'form', function(event) {
    event.preventDefault();
    var item = $(this).serialize();
    var jqxhr = $.ajax({
      type: "POST",
      url: "/",
      dataType: "json",
      data: item });

    jqxhr.done(function(data) {
      console.log("success");
      addItemRow(data.item);
    });

    jqxhr.error(function(data) {
      console.log('error');
    });

    debugger;
    $(this).remove();

  }).on('click', '.cancel', function(event) {
    event.preventDefault();
    $(this).parent().hide('fast');
  });

  $('.sortable-list').on('sortstop', function ( event, ui ) {
    updateList(this);
  });

  function initialize() {
    $( ".sortable-list" ).sortable({ axis: "y", stop: function( event, ui ) {} });
  }

  initialize();

});