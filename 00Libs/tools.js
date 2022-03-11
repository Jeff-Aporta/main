function id(id) {
  return document.getElementById(id);
}

function style(id) {
  return id(id).style;
}

function html(_id, value) {
  if (value == undefined) {
    return id(_id).innerHTML;
  }
  id(_id).innerHTML = value;
}