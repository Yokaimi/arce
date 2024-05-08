function saveData() {
  var name = document.getElementById("nameInput").value;
  var number = document.getElementById("numberInput").value;

  if (name.trim() === "" || number.trim() === "") {
    alert("Silakan isi semua field!");
    return;
  }

  var data = {
    id: parseInt(number),
    name: name
  };

  var existingData = localStorage.getItem("category");
  var dataArray = existingData ? JSON.parse(existingData) : [];

  dataArray.push(data);

  localStorage.setItem("category", JSON.stringify(dataArray));
  
  alert("Data berhasil disimpan!");
}
