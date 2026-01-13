// Example starter JavaScript for disabling form submissions if there are invalid fields
() => {
  "use strict";
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
};
//Gst Toggle
let toggle = document.getElementById("flexSwitchCheckDefault");
toggle.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

function listings_idx(data) {
  let listings = document.querySelector("[listing_div]");
  listings.innerHTML = "";
  for (e of data) {
    const div = document.createElement("div");
    div.innerHTML = `
        <a href="/listings/${e._id}" class="listing-link">
            <div class="card col listing-card">
                <img src=${
                  e.image.url
                } class="card-img-top" style="height: 18rem;" alt="listing_image">
                <div class="card-img-overlay"></div>
                <div class="card-body">
                    <p class="card-text mt-2">
                        <b>${e.title}</b> <br>
                        &#8377; ${e.price.toLocaleString("en-IN")} / night
                        <i class="tax-info">&nbsp; + &nbsp;${(
                          e.price * 0.18
                        ).toLocaleString("en-IN")} (18% GST)</i>
                    </p>
                </div>
            </div>
        </a>`;
    listings.appendChild(div);
  }
}
//Icon Sorting or searching
let icons = document.getElementsByClassName("filter");
for (let icon of icons) {
  icon.addEventListener("click", () => {
    const isActive = icon.classList.contains("active");
    // Remove active from all filters
    for (let i of icons) {
      i.classList.remove("active");
    }
    // Toggle logic
    if (!isActive) {
      icon.classList.add("active");
      // Add active to clicked filter;
      fetch(`/listings?category=${icon.innerText}`)
        .then((response) => response.json())
        .then((data) => listings_idx(data));
    } else {
      // toggle OFF → show all listings
      fetch(`/listings`)
        .then((res) => res.json())
        .then((data) => listings_idx(data));
    }
  });
}
//OTP Cooldown Timer
let expiryTime = Date.now() + 5 * 60 * 1000;

  // ⏱ Resend cooldown (60 seconds)
  let resendCooldown = 60;

  const timerEl = document.getElementById("otp-timer");
  const resendBtn = document.getElementById("resendBtn");

  // OTP expiry timer
  setInterval(() => {
    const diff = expiryTime - Date.now();
    if (diff <= 0) {
      timerEl.innerText = "OTP expired. Please resend OTP.";
      return;
    }
    const min = Math.floor(diff / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    timerEl.innerText = `OTP expires in ${min}:${sec.toString().padStart(2, "0")}`;
  }, 1000);

  // Resend cooldown timer
  let cooldownInterval = setInterval(() => {
    if (resendCooldown <= 0) {
      resendBtn.disabled = false;
      resendBtn.innerText = "Resend OTP";
      clearInterval(cooldownInterval);
      return;
    }
    resendBtn.innerText = `Resend OTP (${resendCooldown--}s)`;
  }, 1000);

  // Resend OTP click
  resendBtn.addEventListener("click", async () => {
    resendBtn.disabled = true;
    resendCooldown = 60;

    const res = await fetch("/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "<%= email %>" })
    });

    const data = await res.json();
    alert(data.success || data.error);

    cooldownInterval = setInterval(() => {
      if (resendCooldown <= 0) {
        resendBtn.disabled = false;
        resendBtn.innerText = "Resend OTP";
        clearInterval(cooldownInterval);
        return;
      }
      resendBtn.innerText = `Resend OTP (${resendCooldown--}s)`;
    }, 1000);
  });
  
//Text Searching
// let btn = document.querySelector("[search-btn]")
// let text = document.querySelector("[input-search]")
// btn.addEventListener("click", ()=>{
//     fetch(`/listings?search=${text.value}`).then((response) => response.json())
//                 .then((data) => {
//                     listings_idx(data)
//                 }).catch((error) => console.error("Error fetching listings:", error));
// })
