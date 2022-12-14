function flash_message(msg, color) {
    this.msg = msg;
    this.color = color;
    let dive = document.getElementById('flashMessage');
    dive.style.backgroundColor = this.color;
    dive.innerHTML = this.msg;
    dive.style.padding = "20px";
    setTimeout(() => {
        dive.style.backgroundColor = "transparent";
        dive.innerHTML = "";
        dive.style.padding = "0px";
    }, 5000);
}

const myFeedbackSubmitFunction = () => {
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    let feedbackInput = document.getElementById('message');
    const url = "https://feedbacks-backend.herokuapp.com/api/feedbacks/";
    let body = {
        "name": nameInput.value,
        "email": emailInput.value,
        "feedback": feedbackInput.value,
        "website_name": "firenetpk"
    }
    fetch(url, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json; charset=utf8'
        },
        body: JSON.stringify(body)
    }).then(response => { return response.json() }).then(data => {
        if (data['error']) {
            if (data['error'] == 'true') {
                flash_message("Unexpected error Occurred, See Console", "red");
                throw new Error("An Unexpected error occurred");
            }
            else {
                flash_message("Successfully sent your feedback", "#467fd0");
                console.log("Successfully sent your feedback");
            }
        }
    }).catch(error => { flash_message(error, "red"); throw new Error(error); })
    nameInput.value = "";
    emailInput.value = "";
    feedbackInput.value = "";
}


function fetching() {
    document.getElementById('teamSection').innerHTML = `<div class="col-lg-3 col-md-6 d-flex align-items-stretch">
<div class="member" data-aos="fade-up" data-aos-delay="100">
  <div class="member-img">
    <img src="" class="img-fluid" alt="">
    <div class="social">
      <a href=""><i class="bi bi-twitter"></i></a>
      <a href=""><i class="bi bi-facebook"></i></a>
      <a href=""><i class="bi bi-instagram"></i></a>
      <a href=""><i class="bi bi-linkedin"></i></a>
    </div>
  </div>
  <div class="member-info">
    <h4>Fetching..</h4>
    <span>Fetching</span>
  </div>
</div>
</div>`;
}


function put_employee_data(data) {
    document.getElementById('teamSection').innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let picture = "https://ars-hd.loca.lt" + data[i]["picture"];
        let name = data[i]["name"];
        let designation = data[i]["designation"];
        document.getElementById('teamSection').innerHTML += `
    <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member" data-aos="fade-up" data-aos-delay="100">
              <div class="member-img">
                <img src="${picture}" class="img-fluid" alt="">
                <div class="social">
                  <a href=""><i class="bi bi-twitter"></i></a>
                  <a href=""><i class="bi bi-facebook"></i></a>
                  <a href=""><i class="bi bi-instagram"></i></a>
                  <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h4>${name}</h4>
                <span>${designation}</span>
              </div>
            </div>
          </div>
    `;
    }
}

const myFetch = async (_url) => {
    fetching();
    const result = await fetch(_url).then(response => { return response.json() });
    put_employee_data(result);
}

myFetch("https://ars-hd.loca.lt/api/employees/");

